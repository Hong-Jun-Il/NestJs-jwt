import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])$/, {
    message: '아이디는 영, 숫자 5~15글자이어야 합니다',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(18)
  @Matches(/^(?=.*[a-zA-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+-=])$/)
  password: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  age: number;
}
