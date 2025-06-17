import { ApiProperty } from '@nestjs/swagger';

export class DiscoveryContentDto {
  @ApiProperty({ description: 'Content ID', example: 'content-123' })
  id: string;

  @ApiProperty({ description: 'Content title', example: 'Trending Article' })
  title: string;

  @ApiProperty({
    description: 'Content description',
    example: 'A trending article about technology',
  })
  description: string;

  @ApiProperty({ description: 'Content category', example: 'technology' })
  category: string;

  @ApiProperty({ description: 'Content language', example: 'en' })
  language: string;

  @ApiProperty({
    description: 'Published date',
    example: '2024-01-15T10:00:00Z',
  })
  published_at: Date;

  @ApiProperty({ description: 'Author ID', example: 'user123' })
  author_id: string;

  @ApiProperty({
    description: 'Discovery-specific metadata',
    example: {
      viewCount: 1250,
      likeCount: 85,
      shareCount: 23,
      trending_score: 0.95,
      popularity_rank: 1,
    },
  })
  discovery_meta: {
    viewCount?: number;
    likeCount?: number;
    shareCount?: number;
    trending_score?: number;
    popularity_rank?: number;
    recommendation_score?: number;
    similarity_score?: number;
  };
}

export class TrendingContentResponseDto {
  @ApiProperty({
    type: [DiscoveryContentDto],
    description: 'Array of trending content items',
  })
  trending_content: DiscoveryContentDto[];

  @ApiProperty({ description: 'Total trending items', example: 25 })
  total: number;

  @ApiProperty({ description: 'Current page', example: 1 })
  page: number;

  @ApiProperty({ description: 'Items per page', example: 10 })
  limit: number;

  @ApiProperty({
    description: 'Last updated timestamp',
    example: '2024-01-15T10:00:00Z',
  })
  updated_at: Date;
}

export class SearchContentResponseDto {
  @ApiProperty({
    type: [DiscoveryContentDto],
    description: 'Array of recommended content items',
  })
  recommended_content: DiscoveryContentDto[];

  @ApiProperty({ description: 'Total recommended items', example: 15 })
  total: number;

  @ApiProperty({ description: 'Current page', example: 1 })
  page: number;

  @ApiProperty({ description: 'Items per page', example: 10 })
  limit: number;

  @ApiProperty({
    description: 'Recommendation algorithm used',
    example: 'content_based',
  })
  algorithm: string;
}
