import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class SearchProductDto {
  @ApiProperty({
    required: false,
  })
  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  limit: number = 25;

  @IsOptional()
  @IsInt()
  @Min(0)
  offset: number = 0;
}
