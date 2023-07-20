import { IsNotEmpty, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { RoleType } from 'src/common/constants';

export class RegisterUserDto {
  @MaxLength(150)
  @IsNotEmpty()
  username: string;

  @MaxLength(150)
  @IsNotEmpty()
  password: string;

  @MaxLength(150)
  @IsNotEmpty()
  firstName: string;

  @MaxLength(150)
  @IsNotEmpty()
  lastName: string;

  @IsEnum(RoleType)
  role?: RoleType;

  @IsOptional()
  email?: string;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  phone?: string;
}
