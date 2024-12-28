import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import * as bycrpt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpUserDto: Prisma.UsersCreateInput) {
    const hashedPassword = await bycrpt.hash(signUpUserDto.password, 10);
    try {
      return this.databaseService.users.create({
        data: {
          id: signUpUserDto.id,
          password: hashedPassword,
          age: Number(signUpUserDto.age),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('회원가입 처리 에러');
    }
  }

  async login(loginUserDto: LoginUserDto) {
    try {
      const user = await this.databaseService.users.findUnique({
        where: {
          id: loginUserDto.id,
        },
      });

      const { id, password, age } = user;

      if (user && (await bycrpt.compare(loginUserDto.password, password))) {
        const access_token = this.jwtService.sign(
          {
            id,
            age,
          },
          {
            expiresIn: '5m',
          },
        );
        console.log(access_token);
      }
      return {
        message: '테스트',
      };
    } catch (error) {
      console.error(error);
      throw new Error('로그인 에러');
    }
  }
}
