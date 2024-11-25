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

export class SignUpUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/, {
    message: '아이디는 영, 숫자 3~15글자이어야 합니다',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(18)
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
    {
      message: '비밀번호는 대소문자 영문자 및 숫자 포함 8~18글자이어야 합니다',
    },
  )
  password: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  age: number;
}
