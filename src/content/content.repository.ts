import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import {
  ContentResponseDto,
  DeleteContentResponseDto,
} from './dto/content-response.dto';
import { ContentFilterDto } from './dto/content-filter.dto';
import { SearchContentDto } from './dto/search-content.dto';
import { IContentRepository } from './interfaces/content.interface';
import { Content, Prisma, Status } from '../generated/prisma';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ContentRepository implements IContentRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly logger: Logger,
  ) {}

  async create(
    createContentDto: CreateContentDto,
  ): Promise<ContentResponseDto> {
    try {
      const content = await this.prisma.content.create({
        data: {
          ...createContentDto,
          status: createContentDto.status || Status.DRAFT,
          published_at:
            createContentDto.status === Status.PUBLISHED ? new Date() : null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      });

      return this.mapToResponseDto(content);
    } catch (error) {
      this.logger.error(error, 'Failed to create content');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          'Failed to create content',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
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
        data: {
          ...updateContentDto,
          status: updateContentDto.status,
          published_at:
            updateContentDto.status === Status.PUBLISHED
              ? new Date()
              : undefined,
          updated_at: new Date(),
        },
      });

      return this.mapToResponseDto(content);
    } catch (error) {
      this.logger.error(error, 'Failed to update content');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Failed to update content',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  async delete(id: string): Promise<DeleteContentResponseDto> {
    try {
      await this.prisma.content.delete({
        where: { id },
      });

      return {
        message: 'Content deleted successfully',
        id,
      };
    } catch (error) {
      this.logger.error(error, 'Failed to delete content');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
        }
        throw new HttpException(
          'Failed to delete content',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  async findById(id: string): Promise<ContentResponseDto> {
    try {
      const content = await this.prisma.content.findUnique({
        where: { id },
      });

      if (!content) {
        throw new HttpException('Content not found', HttpStatus.NOT_FOUND);
      }

      return this.mapToResponseDto(content);
    } catch (error) {
      this.logger.error(error, 'Failed to retrieve content');
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Failed to retrieve content',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(filter: ContentFilterDto): Promise<ContentResponseDto[]> {
    try {
      const {
        page = 1,
        limit = 10,
        sort_by = 'created_at',
        sort_order = 'desc',
        ...where
      } = filter;

      const contents = await this.prisma.content.findMany({
        where: where as Prisma.ContentWhereInput,
        orderBy: {
          [sort_by]: sort_order as Prisma.SortOrder,
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return contents.map((content) => this.mapToResponseDto(content));
    } catch (error) {
      this.logger.error(error, 'Failed to retrieve contents');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          'Failed to retrieve contents',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  async search(searchDto: SearchContentDto): Promise<ContentResponseDto[]> {
    try {
      const {
        page = 1,
        limit = 10,
        sort_by = 'created_at',
        sort_order = 'desc',
        query,
        ...where
      } = searchDto;

      const contents = await this.prisma.content.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } },
            { body: { contains: query, mode: 'insensitive' } },
          ],
          ...where,
        } as Prisma.ContentWhereInput,
        orderBy: {
          [sort_by]: sort_order as Prisma.SortOrder,
        },
        skip: (page - 1) * limit,
        take: limit,
      });

      return contents.map((content) => this.mapToResponseDto(content));
    } catch (error) {
      this.logger.error(error, 'Failed to search contents');
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new HttpException(
          'Failed to search contents',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      throw error;
    }
  }

  private mapToResponseDto(content: Content): ContentResponseDto {
    return plainToInstance(ContentResponseDto, content, {
      excludeExtraneousValues: true,
    });
  }
}
