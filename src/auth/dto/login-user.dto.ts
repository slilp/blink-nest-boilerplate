import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: 'admin@email.com',
  })
  @MaxLength(150)
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'admin1234',
  })
  @MaxLength(150)
  @IsNotEmpty()
  password: string;
}
