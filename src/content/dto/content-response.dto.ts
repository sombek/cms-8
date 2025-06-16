import { ApiProperty } from '@nestjs/swagger';
import { Content } from '../content.entity';

export class ContentResponseDto {
  @ApiProperty({ description: 'Content ID', example: 'content-123' })
  id: string;

  @ApiProperty({ description: 'Content title', example: 'Welcome to our CMS' })
  title: string;

  @ApiProperty({
    description: 'Content description',
    example: 'A brief description of the content',
  })
  description: string;

  @ApiProperty({
    description: 'Content body',
    example: 'The main content body goes here...',
  })
  body: string;

  @ApiProperty({ description: 'Content category', example: 'news' })
  category: string;

  @ApiProperty({ description: 'Content language', example: 'en' })
  language: string;

  @ApiProperty({
    description: 'Published date',
    example: '2024-01-15T10:00:00Z',
  })
  published_at: Date;

  @ApiProperty({ description: 'Created date', example: '2024-01-15T10:00:00Z' })
  created_at: Date;

  @ApiProperty({ description: 'Updated date', example: '2024-01-15T10:00:00Z' })
  updated_at: Date;

  @ApiProperty({
    description: 'Content status',
    enum: ['draft', 'published', 'archived'],
    example: 'published',
  })
  status: 'draft' | 'published' | 'archived';

  @ApiProperty({ description: 'Author ID', example: 'user123' })
  author_id: string;

  @ApiProperty({
    description: 'Additional metadata',
    required: false,
    example: { tags: ['cms', 'content'] },
  })
  meta_data?: Record<string, any>;
}

export class PaginatedContentResponseDto {
  @ApiProperty({
    type: [ContentResponseDto],
    description: 'Array of content items',
  })
  data: ContentResponseDto[];

  @ApiProperty({ description: 'Total number of items', example: 100 })
  total: number;

  @ApiProperty({ description: 'Current page number', example: 1 })
  page: number;

  @ApiProperty({ description: 'Number of items per page', example: 10 })
  limit: number;

  @ApiProperty({ description: 'Total number of pages', example: 10 })
  totalPages: number;
}

export class DeleteContentResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Content deleted successfully',
  })
  message: string;

  @ApiProperty({ description: 'Deleted content ID', example: 'content-123' })
  id: string;
}
