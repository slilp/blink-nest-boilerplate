import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserDto {
  @MaxLength(150)
  @IsNotEmpty()
  username: string;

  @MaxLength(150)
  @IsNotEmpty()
  password: string;
}
