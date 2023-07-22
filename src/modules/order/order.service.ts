import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderEntity, OrderStatus } from 'src/models/order.entity';
import { Repository } from 'typeorm';
import { SearchOrderDto } from './dto/search-order.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { UserEntity } from 'src/models/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductEntity } from 'src/models/product.entity';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  public async findAll(
    searchQuery: SearchOrderDto,
  ): Promise<PaginationResponseDto<OrderEntity>> {
    const { limit, offset, orderId } = searchQuery;
    const [list, count] = await Promise.all([
      this.orderRepository.find({
        where: orderId
          ? {
              id: orderId,
            }
          : {},
        skip: offset,
        take: limit,
        relations: ['products'],
      }),
      this.orderRepository.count({
        where: orderId
          ? {
              id: orderId,
            }
          : {},
      }),
    ]);
    return { data: list, totalRecord: count };
  }

  public async findOne(id: string): Promise<OrderEntity> {
    const orderInfo = await this.orderRepository.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!orderInfo) {
      throw new NotFoundException(`product ${id} not found`);
    }
    return orderInfo;
  }

  public async findByUser(userId: string): Promise<OrderEntity[]> {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['products'],
    });
    return orders;
  }

  public async create(
    user: UserEntity,
    createOrderDto: CreateOrderDto,
  ): Promise<OrderEntity> {
    const existingDrafted = await this.orderRepository.count({
      where: { user: { id: user.id }, status: OrderStatus.DRAFTED },
    });
    if (existingDrafted > 0)
      throw new BadRequestException('duplicate drafted order');
    try {
      const result = await this.orderRepository.save({
        toal: createOrderDto.products.reduce(
          (accumulator: number, currentValue: ProductEntity) =>
            accumulator + currentValue.price,
          0,
        ),
        products: createOrderDto.products,
        user,
        status: OrderStatus.DRAFTED,
      });
      return await this.orderRepository.findOne({ where: { id: result.id } });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  public async updateOrderProducts(
    id: string,
    updateOrderDto: ProductEntity[],
  ): Promise<OrderEntity> {
    const updateObject = await this.orderRepository.findOne({
      where: { id: id },
      relations: ['products'],
    });
    updateObject.products = updateOrderDto;
    const updateResult = await this.orderRepository.save(updateObject);
    return await this.orderRepository.findOne({
      where: { id: updateResult.id },
    });
  }

  public async updateStatus(
    id: string,
    status: OrderStatus,
  ): Promise<OrderEntity> {
    const updateResult = await this.orderRepository.update({ id }, { status });
    if (updateResult.affected === 0) {
      throw new NotFoundException(`order ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string) {
    return await this.orderRepository.delete(id);
  }
}
