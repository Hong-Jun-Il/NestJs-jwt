import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(15)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9]).+$/, {
    message: '아이디는 영문자 및 숫자 포함 3~15',
  })
  id: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(18)
  @Matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&'()*+,-./:;<=>?@[\]^_`{|}~]).+$/,
    {
      message: '비밀번호는 영문자 및 특수문자 포함 8~18글자',
    },
  )
  password: string;
}
