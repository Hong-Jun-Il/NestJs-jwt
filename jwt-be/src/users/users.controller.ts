import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SignUpUserDto } from './dto/signUp-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UsePipes(ValidationPipe)
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
}
