import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';

export class UpdateContentDto {
  @ApiProperty({
    description: 'Content title',
    example: 'Updated title',
    required: false,
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    description: 'Content description',
    example: 'Updated description',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Content body',
    example: 'Updated content body...',
    required: false,
  })
  @IsOptional()
  @IsString()
  body?: string;

  @ApiProperty({
    description: 'Content category',
    example: 'updated-category',
    required: false,
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty({
    description: 'Content language',
    example: 'es',
    required: false,
  })
  @IsOptional()
  @IsString()
  language?: string;

  @ApiProperty({
    description: 'Content status',
    enum: ['draft', 'published', 'archived'],
    example: 'published',
    required: false,
  })
  @IsOptional()
  @IsEnum(['draft', 'published', 'archived'])
  status?: 'draft' | 'published' | 'archived';

  @ApiProperty({
    description: 'Additional metadata',
    required: false,
    example: { tags: ['updated', 'cms'] },
  })
  @IsOptional()
  @IsObject()
  meta_data?: Record<string, any>;
}
