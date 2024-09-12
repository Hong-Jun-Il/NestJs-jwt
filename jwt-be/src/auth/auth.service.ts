import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

type FakeUserType = {
  id: number;
  username: string;
  password: string;
};

const fakeUsers: FakeUserType[] = [
  {
    id: 1,
    username: 'user1',
    password: 'user1',
  },
  {
    id: 2,
    username: 'user2',
    password: 'user2',
  },
  {
    id: 3,
    username: 'user3',
    password: 'user3',
  },
];

@Injectable()
export class AuthService {
  validateUser({ username, password }: AuthPayloadDto) {}
}
