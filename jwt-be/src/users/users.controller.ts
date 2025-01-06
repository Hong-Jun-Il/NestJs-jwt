import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/signUp-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';

@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    const result = await this.usersService.signUp(signUpUserDto);
    const user = {
      id: result.id,
      age: result.age,
    };

    return {
      message: '회원가입에 성공하였습니다',
      user,
    };
  }

  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token } =
      await this.usersService.login(loginUserDto);

    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: false,
      maxAge: 5 * 60 * 1000,
      // maxAge: 3 * 1000,
    });

    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
      // maxAge: 10 * 1000,
    });

    return {
      message: '로그인 성공',
    };
  }

  @Post('verify-token')
  async verifyToken(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const accessToken = req.cookies['access_token'];
    const refreshToken = req.cookies['refresh_token'];

    const verifyToken = await this.usersService.jwtVerify(
      refreshToken,
      accessToken,
    );

    console.log(verifyToken.access_token);
    if (verifyToken.access_token) {
      console.log(verifyToken.access_token);
      res.cookie('access_token', verifyToken.access_token, {
        httpOnly: true,
        secure: false,
        maxAge: 5 * 60 * 1000,
        // maxAge: 3 * 1000,
      });
    }

    console.log('실행됨');
    return {
      message: verifyToken.message,
    };
  }
}
