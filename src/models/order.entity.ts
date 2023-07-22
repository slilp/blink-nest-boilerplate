import { AbstractDto } from '../common/dto/abstract.dto';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ProductEntity } from './product.entity';

export enum OrderStatus {
  DRAFTED = 'DRAFTED',
  PROCESSING = 'PROCESSING',
  DELIVERING = 'DELIVERING',
  REJECTED = 'REJECTED',
  COMPLETED = 'COMPLETED',
}

@Entity({ name: 'order' })
export class OrderEntity extends AbstractDto {
  @Column({ type: 'decimal', default: 99999999 })
  total: number;

  @Column({ type: 'enum', nullable: true, enum: OrderStatus })
  status: OrderStatus;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.orders)
  @JoinTable({
    name: 'order_products',
    joinColumn: {
      name: 'orderId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'productId',
      referencedColumnName: 'id',
    },
  })
  products: ProductEntity[];
}
