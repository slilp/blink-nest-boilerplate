import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['sku'] as const),
) {
  @IsOptional()
  @IsBoolean()
  isAvailable: boolean;
}
