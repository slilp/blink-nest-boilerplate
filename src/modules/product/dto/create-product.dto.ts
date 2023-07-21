import { IsNotEmpty, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class CreateProductDto {
  @MaxLength(150)
  @IsNotEmpty()
  sku: string;

  @MaxLength(150)
  @IsNotEmpty()
  name: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  pic?: string;

  @IsNumber()
  price: number;
}
