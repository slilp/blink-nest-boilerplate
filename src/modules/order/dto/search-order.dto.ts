import { IsInt, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class SearchOrderDto {
  @IsOptional()
  @IsUUID()
  orderId: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  limit: number = 25;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number = 0;
}
