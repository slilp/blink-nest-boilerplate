import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { UuidParamDto } from 'src/common/dto/uuidParam.dto';
import { Auth } from 'src/auth/guards/auth';
import { RoleType } from 'src/common/constants';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Auth([RoleType.ADMIN])
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll(@Query() searchQuery: SearchProductDto) {
    return this.productService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.findOne(id + '');
  }

  @Auth([RoleType.ADMIN])
  @Put(':id')
  update(
    @Param() params: UuidParamDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(params.id, updateProductDto);
  }

  @Auth([RoleType.ADMIN])
  @Delete(':id')
  remove(@Param() params: UuidParamDto) {
    return this.productService.remove(params.id);
  }
}
