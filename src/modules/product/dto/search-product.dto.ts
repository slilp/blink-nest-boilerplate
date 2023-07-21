import { IsInt, IsOptional, IsPositive, IsString, Min } from 'class-validator';

export class SearchProductDto {
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
