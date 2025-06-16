import { Injectable, Logger } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import {
  ContentResponseDto,
  DeleteContentResponseDto,
} from './dto/content-response.dto';
import { ContentFilterDto } from './dto/content-filter.dto';
import { PrismaService } from '../prisma/prisma.service';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(
    createContentDto: CreateContentDto,
  ): Promise<ContentResponseDto> {
    try {
      const content = await this.prisma.content.create({
        data: createContentDto,
      });
      return plainToInstance(ContentResponseDto, content);
    } catch (error) {
      this.logger.error(error, 'ContentService: Failed to create content');
      throw error;
    }
  }

  async update(
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<ContentResponseDto> {
    try {
      const content = await this.prisma.content.update({
        where: { id },
        data: updateContentDto,
      });
      return plainToInstance(ContentResponseDto, content);
    } catch (error) {
      this.logger.error(error, 'ContentService: Failed to update content');
      throw error;
    }
  }

  async delete(id: string): Promise<DeleteContentResponseDto> {
    try {
      const content = await this.prisma.content.delete({
        where: { id },
      });
      return plainToInstance(DeleteContentResponseDto, content);
    } catch (error) {
      this.logger.error(error, 'ContentService: Failed to delete content');
      throw error;
    }
  }

  async findById(id: string): Promise<ContentResponseDto> {
    try {
      const content = await this.prisma.content.findUnique({
        where: { id },
      });
      return plainToInstance(ContentResponseDto, content);
    } catch (error) {
      this.logger.error(error, 'ContentService: Failed to find content by id');
      throw error;
    }
  }

  async findAll(filter: ContentFilterDto): Promise<ContentResponseDto[]> {
    try {
      const {
        page = 1,
        limit = 10,
        sort_by = 'created_at',
        sort_order = 'desc',
        ...whereFilter
      } = filter;
      const skip = (page - 1) * limit;

      const contents = await this.prisma.content.findMany({
        where: whereFilter,
        skip,
        take: limit,
        orderBy: {
          [sort_by as string]: sort_order,
        },
      });
      return plainToInstance(ContentResponseDto, contents);
    } catch (error) {
      this.logger.error(error, 'ContentService: Failed to find all contents');
      throw error;
    }
  }

  async count(
    filter: Omit<ContentFilterDto, 'page' | 'limit' | 'sort_by' | 'sort_order'>,
  ): Promise<number> {
    try {
      return await this.prisma.content.count({
        where: filter,
      });
    } catch (error) {
      this.logger.error(error, 'ContentService: Failed to count contents');
      throw error;
    }
  }
}
