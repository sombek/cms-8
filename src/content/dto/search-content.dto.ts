import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Status } from 'src/generated/prisma';

export class SearchContentDto {
  @ApiProperty({
    description: 'Search query for title and description',
    example: 'cms content management',
  })
  @IsString()
  @IsNotEmpty()
  query: string;

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
    description: 'Filter by status',
    required: false,
    enum: Status,
    example: Status.PUBLISHED,
  })
  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @ApiProperty({
    description: 'Field to sort by',
    required: false,
    example: 'created_at',
    default: 'created_at',
  })
  @IsOptional()
  @IsString()
  sort_by?: string = 'created_at';

  @ApiProperty({
    description: 'Sort order',
    required: false,
    enum: ['asc', 'desc'],
    example: 'desc',
    default: 'desc',
  })
  @IsOptional()
  @IsString()
  sort_order?: 'asc' | 'desc' = 'desc';

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
