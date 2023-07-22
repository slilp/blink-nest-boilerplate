import { IsEnum, IsOptional } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from 'src/models/order.entity';

export class UpdateOrderDto extends CreateOrderDto {}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
