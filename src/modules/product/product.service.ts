import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/models/product.entity';
import { Like, Repository } from 'typeorm';
import { SearchProductDto } from './dto/search-product.dto';
import { PaginationResponseDto } from 'src/common/dto/pagination.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  public async findAll(
    searchQuery: SearchProductDto,
  ): Promise<PaginationResponseDto<ProductEntity>> {
    const { limit, offset, search } = searchQuery;
    const [list, count] = await Promise.all([
      this.productRepository.find({
        where: search
          ? {
              name: Like(`%${search}%`),
            }
          : {},
        skip: offset,
        take: limit,
      }),
      this.productRepository.count({
        where: search
          ? {
              name: Like(`%${search}%`),
            }
          : {},
      }),
    ]);
    return { data: list, totalRecord: count };
  }

  public async findOne(id: string): Promise<ProductEntity> {
    const productInfo = await this.productRepository.findOne({
      where: { id },
    });
    if (!productInfo) {
      throw new NotFoundException(`product ${id} not found`);
    }
    return productInfo;
  }

  public async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    try {
      return await this.productRepository.save({
        ...createProductDto,
        isAvailable: true,
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductEntity> {
    const updateResult = await this.productRepository.update(
      { id },
      updateProductDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`product ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string) {
    return await this.productRepository.delete(id);
  }
}
