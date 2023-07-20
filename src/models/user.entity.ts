import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { AbstractDto } from '../common/dto/abstract.dto';
import { RoleType } from '../common/constants';
import { Entity, Column, OneToMany } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'users' })
export class UserEntity extends AbstractDto {
  @Column({ nullable: true })
  firstName?: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', nullable: true, enum: RoleType })
  role: RoleType;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  isActive?: boolean;

  @OneToMany(() => OrderEntity, (order) => order.user, { cascade: true })
  orders: OrderEntity[];
}
