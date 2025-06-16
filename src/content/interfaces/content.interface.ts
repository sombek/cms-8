import { CreateContentDto } from '../dto/create-content.dto';
import { UpdateContentDto } from '../dto/update-content.dto';
import {
  ContentResponseDto,
  DeleteContentResponseDto,
} from '../dto/content-response.dto';
import { ContentFilterDto } from '../dto/content-filter.dto';
import { SearchContentDto } from '../dto/search-content.dto';
import { Status } from '../../generated/prisma';

export interface IContent {
  id: string;
  title: string;
  description: string;
  body: string;
  category: string;
  language: string;
  status: Status;
  author_id: string;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
  meta_data: Record<string, any> | null;
}

export interface IContentRepository {
  create(createContentDto: CreateContentDto): Promise<ContentResponseDto>;
  update(
    id: string,
    updateContentDto: UpdateContentDto,
  ): Promise<ContentResponseDto>;
  delete(id: string): Promise<DeleteContentResponseDto>;
  findById(id: string): Promise<ContentResponseDto>;
  findAll(filter: ContentFilterDto): Promise<ContentResponseDto[]>;
  search(searchDto: SearchContentDto): Promise<ContentResponseDto[]>;
}

export interface IContentFilter {
  category?: string;
  language?: string;
  status?: Status;
  author_id?: string;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface IContentSearch {
  query: string;
  category?: string;
  language?: string;
  status?: Status;
  page?: number;
  limit?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}
