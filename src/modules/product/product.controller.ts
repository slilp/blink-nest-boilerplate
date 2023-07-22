import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { SearchProductDto } from './dto/search-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UuidParamDto } from 'src/common/dto/uuidParam.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param() params: UuidParamDto,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(params.id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param() params: UuidParamDto) {
    return this.productService.remove(params.id);
  }
}
