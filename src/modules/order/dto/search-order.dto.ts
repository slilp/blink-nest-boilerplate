import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class SearchOrderDto {
  @ApiProperty({
    required: false,
  })
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
