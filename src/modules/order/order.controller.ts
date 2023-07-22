import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { SearchOrderDto } from './dto/search-order.dto';
import { UuidParamDto } from 'src/common/dto/uuidParam.dto';
import { UpdateOrderDto, UpdateOrderStatusDto } from './dto/update-order.dto';

@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Request() req, @Body() createProductDto: CreateOrderDto) {
    return this.orderService.create(req.user, createProductDto);
  }

  @Get()
  findAll(@Query() searchQuery: SearchOrderDto) {
    return this.orderService.findAll(searchQuery);
  }

  @Get('orders-user')
  findByUser(@Request() req) {
    return this.orderService.findByUser(req.user.id);
  }

  @Get(':id')
  findOne(@Param() params: UuidParamDto) {
    return this.orderService.findOne(params.id);
  }

  @Patch('order-status/:id')
  updateStatus(
    @Param() params: UuidParamDto,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateStatus(
      params.id,
      updateOrderStatusDto.status,
    );
  }

  @Patch(':id')
  update(
    @Param() params: UuidParamDto,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderProducts(
      params.id,
      updateOrderDto.products,
    );
  }

  @Delete(':id')
  remove(@Param() params: UuidParamDto) {
    return this.orderService.remove(params.id);
  }
}
