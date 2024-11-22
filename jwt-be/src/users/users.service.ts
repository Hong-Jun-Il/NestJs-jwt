import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [{ id: 'user1', password: 'user1@user1', age: 24 }];
  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return {
      message: 'create user 성공',
      user: createUserDto,
    };
  }

  getAllUsers() {
    return this.users;
  }
}
