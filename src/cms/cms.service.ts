import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { CreateContentDto } from '../content/dto/create-content.dto';
import { UpdateContentDto } from '../content/dto/update-content.dto';
import {
  ContentResponseDto,
  DeleteContentResponseDto,
} from '../content/dto/content-response.dto';
import { ContentRepository } from '../content/content.repository';

@Injectable()
export class CmsService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly logger: Logger,
  ) {}

  async createContent(
    createContentDto: CreateContentDto,
  ): Promise<ContentResponseDto> {
    try {
      const content = await this.contentRepository.create(createContentDto);
      return content;
    } catch (error) {
      this.logger.error(error, 'Failed to create content');
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to create content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateContent(
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<ContentResponseDto> {
    try {
      return await this.contentRepository.update(id, updateContentDto);
    } catch (error) {
      this.logger.error(error, 'Failed to update content');
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to update content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteContent(id: string): Promise<DeleteContentResponseDto> {
    try {
      return await this.contentRepository.delete(id);
    } catch (error) {
      this.logger.error(error, 'Failed to delete content');
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to delete content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getContentDetails(id: string): Promise<ContentResponseDto> {
    try {
      return await this.contentRepository.findById(id);
    } catch (error) {
      this.logger.error(error, 'Failed to retrieve content');
      if (error instanceof HttpException) throw error;
      throw new HttpException(
        'Failed to retrieve content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
