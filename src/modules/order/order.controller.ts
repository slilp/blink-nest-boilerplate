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
import { Auth } from 'src/auth/guards/auth';
import { RoleType } from 'src/common/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@UseGuards(JwtAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Auth([RoleType.USER])
  @Post()
  create(@Request() req, @Body() createProductDto: CreateOrderDto) {
    return this.orderService.create(req.user, createProductDto);
  }

  @Auth([RoleType.ADMIN])
  @Get()
  findAll(@Query() searchQuery: SearchOrderDto) {
    return this.orderService.findAll(searchQuery);
  }

  @Auth([RoleType.USER])
  @Get('orders-user')
  findByUser(@Request() req) {
    return this.orderService.findByUser(req.user.id);
  }

  @Auth([RoleType.ADMIN])
  @Get(':id')
  findOne(@Param() params: UuidParamDto) {
    return this.orderService.findOne(params.id);
  }

  @Auth([RoleType.ADMIN])
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

  @Auth([RoleType.USER])
  @Patch(':id')
  update(
    @Request() req,
    @Param() params: UuidParamDto,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.updateOrderProducts(
      req.user.id,
      params.id,
      updateOrderDto.products,
    );
  }

  @Auth([RoleType.USER])
  @Delete(':id')
  remove(@Param() params: UuidParamDto) {
    return this.orderService.remove(params.id);
  }
}
