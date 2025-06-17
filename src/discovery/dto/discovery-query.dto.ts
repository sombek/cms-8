import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class DiscoveryQueryDto {
  @ApiProperty({
    description: 'Filter by category',
    required: false,
    example: 'Podcast',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Filter by language',
    required: false,
    example: 'ar',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Page number (starts from 1)',
    required: false,
    example: 1,
    minimum: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @ApiProperty({
    description: 'Number of items per page',
    required: false,
    example: 10,
    minimum: 1,
    maximum: 50,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @Max(50)
  limit?: number = 10;
}

export class SearchContentQueryDto {
  @ApiProperty({
    description: 'حلقات بودكاست',
    required: true,
    example: 'حلقات فنجان',
  })
  @IsString()
  query: string;
}
