import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly databaseService: DatabaseService) {}

  async signUp(signUpUserDto: Prisma.UsersCreateInput) {
    try {
      return this.databaseService.users.create({
        data: {
          id: signUpUserDto.id,
          password: signUpUserDto.password,
          age: Number(signUpUserDto.age),
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error('회원가입 처리 에러');
    }
  }
}
