import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/signUp-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@UsePipes(ValidationPipe)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signUp(@Body() signUpUserDto: SignUpUserDto) {
    const result = await this.usersService.signUp(signUpUserDto);
    console.log(result, 'sadsad');
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
  async login(@Body() loginUserDto: LoginUserDto) {
    const token = await this.usersService.login(loginUserDto);

    return {
      message: '성공',
    };
  }
}
