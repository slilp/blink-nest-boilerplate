import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  public async register(
    registerUserDto: RegisterUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const userInfo = await this.userRepository.findOne({
      where: { username: registerUserDto.username },
    });
    if (userInfo) {
      throw new BadRequestException(
        `user ${registerUserDto.username} is already exist`,
      );
    }
    const hash = await bcrypt.hash(registerUserDto.password, 10);
    registerUserDto.password = hash;

    const result = await this.userRepository.save({
      ...registerUserDto,
      isActive: true,
    });

    delete result.password;
    return result;
  }
}
