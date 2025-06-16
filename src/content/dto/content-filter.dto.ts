import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ContentFilterDto {
  @ApiProperty({
    description: 'Filter by category',
    required: false,
    example: 'news',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Filter by language',
    required: false,
    example: 'en',
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Filter by published date (from)',
    required: false,
    example: '2024-01-01T00:00:00Z',
  })
  @IsOptional()
  @IsDateString()
  published_from?: string;

  @ApiProperty({
    description: 'Filter by published date (to)',
    required: false,
    example: '2024-12-31T23:59:59Z',
  })
  @IsOptional()
  @IsDateString()
  published_to?: string;

  @ApiProperty({
    description: 'Page number (starts from 1)',
    required: false,
    example: 1,
    default: 1,
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
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;
}
