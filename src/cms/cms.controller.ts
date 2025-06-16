import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { UpdateContentDto } from '../content/dto/update-content.dto';
import {
  ContentResponseDto,
  DeleteContentResponseDto,
} from '../content/dto/content-response.dto';
import { CmsService } from './cms.service';

@ApiTags('CMS - Content Management')
@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

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
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error',
  })
  async createContent(
    @Body() createContentDto: CreateContentDto,
  ): Promise<ContentResponseDto> {
    return this.cmsService.createContent(createContentDto);
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
  @ApiResponse({
    status: 404,
    description: 'Content not found',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Invalid input data',
  })
  async updateContent(
    @Param('id') id: string,
    @Body() updateContentDto: UpdateContentDto,
  ): Promise<ContentResponseDto> {
    return this.cmsService.updateContent(id, updateContentDto);
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
  @ApiResponse({
    status: 404,
    description: 'Content not found',
  })
  async deleteContent(
    @Param('id') id: string,
  ): Promise<DeleteContentResponseDto> {
    return this.cmsService.deleteContent(id);
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
  @ApiResponse({
    status: 404,
    description: 'Content not found',
  })
  async getContentDetails(
    @Param('id') id: string,
  ): Promise<ContentResponseDto> {
    return this.cmsService.getContentDetails(id);
  }
}
