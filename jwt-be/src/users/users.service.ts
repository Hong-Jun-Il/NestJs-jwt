import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import * as bycrpt from 'bcrypt';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpUserDto: Prisma.UsersCreateInput) {
    const hashedPassword = await bycrpt.hash(signUpUserDto.password, 10);

    return this.databaseService.users.create({
      data: {
        id: signUpUserDto.id,
        password: hashedPassword,
        age: Number(signUpUserDto.age),
      },
    });
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.databaseService.users.findUnique({
      where: {
        id: loginUserDto.id,
      },
    });

    if (!user) {
      throw new HttpException('아이디를 찾을 수 없음', HttpStatus.NOT_FOUND);
    }

    const { id, password, age } = user;

    if (!(await bycrpt.compare(loginUserDto.password, password))) {
      throw new HttpException(
        '비밀번호가 일치하지 않습니다',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const access_token = this.jwtService.sign(
      {
        id,
        age,
      },
      {
        expiresIn: '20s',
      },
    );

    const refresh_token = this.jwtService.sign(
      {
        id,
        age,
      },
      {
        expiresIn: '5m',
      },
    );
    return {
      access_token,
      refresh_token,
    };
  }

  async jwtVerify(refreshToken: string, accessToken: string | undefined) {
    try {
      if (accessToken) {
        // 둘 다 있지만 액세스 토큰이 유효하지 않은 경우
        const isValidAccessToken = this.jwtService.verify(accessToken);
        if (!isValidAccessToken) {
          throw new HttpException(
            'Invalid Access Token',
            HttpStatus.UNAUTHORIZED,
          );
        }

        // 액세스 토큰이 유효하면 둘 다 유효하므로 성공
        return {
          message: 'Both Tokens are Valid',
        };
      }
    } catch (error) {
      try {
        // 액세스는 없지만 리프레쉬 토큰은 있는 경우
        const isValidRefreshToken = this.jwtService.verify(refreshToken);
        if (!isValidRefreshToken) {
          throw new HttpException(
            'Invalid Refresh Token',
            HttpStatus.UNAUTHORIZED,
          );
        }

        const { id, age } = isValidRefreshToken;
        const access_token = this.jwtService.sign(
          {
            id,
            age,
          },
          {
            expiresIn: '20s',
          },
        );

        // 리프레쉬 토큰으로 액세스 토큰 재발급
        return {
          access_token,
          message:
            'Invalid Access Token but Valid Refresh Token. Access token has been reissued ',
        };
      } catch (error) {
        // 둘 다 죽은 경우 전역 에러 필터로 에러 처리
        console.error(error);
        throw new HttpException(
          'Both Tokens are Invalid',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
  }
}
