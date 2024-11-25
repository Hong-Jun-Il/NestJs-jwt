import { PartialType } from '@nestjs/mapped-types';
import { SignUpUserDto } from './signUp-user.dto';

export class UpdateUserDto extends PartialType(SignUpUserDto) {}
