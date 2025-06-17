import {
  Controller,
  Get,
  Query,
  HttpStatus,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import {
  DiscoveryQueryDto,
  SearchContentQueryDto,
} from './dto/discovery-query.dto';
import {
  TrendingContentResponseDto,
  SearchContentResponseDto,
} from './dto/discovery-response.dto';
import { DiscoveryService } from './discovery.service';

@ApiTags('Content Discovery')
@Controller('discovery')
export class DiscoveryController {
  constructor(
    private readonly logger: Logger,
    private readonly discoveryService: DiscoveryService,
  ) {}

  @Get('trending')
  @ApiOperation({
    summary: 'Get trending content',
    description:
      'Retrieves currently trending content based on view counts, engagement metrics, and recent activity.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (max 50)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Trending content retrieved successfully',
    type: TrendingContentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid query parameters',
  })
  async getTrendingContent(
    @Query() queryDto: DiscoveryQueryDto,
  ): Promise<TrendingContentResponseDto> {
    try {
      return await this.discoveryService.getTrendingContent(queryDto);
    } catch (error) {
      this.logger.error(error, 'Failed to retrieve trending content');
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to retrieve trending content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // search content
  @Get('search')
  @ApiOperation({
    summary: 'Search content',
    description: 'Search for content based on keywords',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number (starts from 1)',
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Number of items per page (max 50)',
    example: 10,
  })
  @ApiResponse({
    status: 200,
    description: 'Search content retrieved successfully',
    type: SearchContentResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid query parameters',
  })
  async searchContent(
    @Query() queryDto: SearchContentQueryDto,
  ): Promise<SearchContentResponseDto> {
    try {
      return await this.discoveryService.searchContent(queryDto);
    } catch (error) {
      this.logger.error(error, 'Failed to search content');
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to search content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
