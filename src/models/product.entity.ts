import { AbstractDto } from '../common/dto/abstract.dto';
import { Entity, Column, ManyToMany } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity({ name: 'products' })
export class ProductEntity extends AbstractDto {
  @Column()
  sku: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  pic?: string;

  @Column({ type: 'decimal', default: 99999999 })
  price: number;

  @Column({ nullable: true })
  isAvailable?: boolean;

  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders: OrderEntity[];
}
