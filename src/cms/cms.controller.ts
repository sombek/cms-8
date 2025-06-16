import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { UpdateContentDto } from '../content/dto/update-content.dto';
import {
  ContentResponseDto,
  DeleteContentResponseDto,
  PaginatedContentResponseDto,
} from '../content/dto/content-response.dto';
import { ContentService } from '../content/content.service';
import { ContentFilterDto } from '../content/dto/content-filter.dto';

@ApiTags('CMS - Content Management')
@Controller('cms')
export class CmsController {
  constructor(private readonly contentService: ContentService) {}

  @Post('content')
  @ApiOperation({
    summary: 'Create new content',
    description: 'Creates a new content item in the CMS',
  })
  @ApiBody({ type: CreateContentDto })
  @ApiResponse({
    status: 201,
    description: 'Content created successfully',
    type: ContentResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async createContent(
    @Body() createContentDto: CreateContentDto,
  ): Promise<ContentResponseDto> {
    return this.contentService.create(createContentDto);
  }

  @Put('content/:id')
  @ApiOperation({
    summary: 'Update existing content',
    description: 'Updates an existing content item by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Content ID to update',
    example: 'content-123',
  })
  @ApiBody({ type: UpdateContentDto })
  @ApiResponse({
    status: 200,
    description: 'Content updated successfully',
    type: ContentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Content not found' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid input data' })
  async updateContent(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto,
  ): Promise<ContentResponseDto> {
    return this.contentService.update(id, updateContentDto);
  }

  @Delete('content/:id')
  @ApiOperation({
    summary: 'Delete content',
    description: 'Deletes a content item by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Content ID to delete',
    example: 'content-123',
  })
  @ApiResponse({
    status: 200,
    description: 'Content deleted successfully',
    type: DeleteContentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Content not found' })
  async deleteContent(
    @Param('id') id: string,
  ): Promise<DeleteContentResponseDto> {
    return this.contentService.delete(id);
  }

  @Get('content/:id')
  @ApiOperation({
    summary: 'Get content details',
    description: 'Retrieves detailed information about a specific content item',
  })
  @ApiParam({
    name: 'id',
    description: 'Content ID to retrieve',
    example: 'content-123',
  })
  @ApiResponse({
    status: 200,
    description: 'Content details retrieved successfully',
    type: ContentResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Content not found' })
  async getContentDetails(
    @Param('id') id: string,
  ): Promise<ContentResponseDto> {
    return this.contentService.findById(id);
  }

  @Get('content')
  @ApiOperation({
    summary: 'List all contents',
    description:
      'Retrieves a paginated list of all content items with optional filtering',
  })
  @ApiQuery({ type: ContentFilterDto })
  @ApiResponse({
    status: 200,
    description: 'Contents retrieved successfully',
    type: PaginatedContentResponseDto,
  })
  async listContents(
    @Query() filter: ContentFilterDto,
  ): Promise<PaginatedContentResponseDto> {
    const contents = await this.contentService.findAll(filter);
    const total = await this.contentService.count(filter);

    return {
      data: contents,
      total,
      page: filter.page || 1,
      limit: filter.limit || 10,
      totalPages: Math.ceil(total / (filter.limit || 10)),
    };
  }
}
