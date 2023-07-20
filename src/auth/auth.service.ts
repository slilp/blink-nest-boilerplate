import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto): Promise<{
    user: Omit<UserEntity, 'password'>;
    accessToken: string;
  }> {
    const userInfo = await this.userRepository.findOne({
      where: { username: loginUserDto.username },
    });
    if (!userInfo) {
      throw new NotFoundException(
        `user ${loginUserDto.username} not found or invalid password`,
      );
    }
    const isMatch = await bcrypt.compare(
      loginUserDto.password,
      userInfo.password,
    );
    if (!isMatch)
      throw new NotFoundException(
        `user ${loginUserDto.username} not found or invalid password`,
      );
    delete userInfo.password;
    const payload = { data: JSON.stringify(userInfo) };
    return {
      user: userInfo,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
