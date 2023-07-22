import { IsArray, ValidateNested } from 'class-validator';
import { ProductEntity } from 'src/models/product.entity';

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  products: ProductEntity[];
}
