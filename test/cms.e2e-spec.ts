import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CmsModule } from '../src/cms/cms.module';
import {
  ContentResponseDto,
  DeleteContentResponseDto,
  PaginatedContentResponseDto,
} from '../src/content/dto/content-response.dto';
import { CreateContentDto } from '../src/content/dto/create-content.dto';
import { Status } from '../src/generated/prisma/enums';
import 'dotenv/config';
import { UpdateContentDto } from '../src/content/dto/update-content.dto';

describe('CMS Controller (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [CmsModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /cms/content', () => {
    it('should create new content', () => {
      const createContentDto: CreateContentDto = {
        title: 'Test Content',
        description: 'Test Description',
        author_id: 'test-user-1',
        body: 'Test Content Body',
        category: 'test-category',
        language: 'en',
        status: Status.PUBLISHED,
      };

      return request(app.getHttpServer())
        .post('/cms/content')
        .send(createContentDto)
        .expect(201)
        .expect((res) => {
          const createdContent = res.body as ContentResponseDto;
          expect(createdContent.title).toEqual('Test Content');
          expect(createdContent.description).toEqual('Test Description');
          expect(createdContent.author_id).toEqual('test-user-1');
          expect(createdContent.body).toEqual('Test Content Body');
        });
    });
  });

  describe('PUT /cms/content/:id', () => {
    it('should update existing content', async () => {
      const createContentDto: CreateContentDto = {
        title: 'Test Content',
        description: 'Test Description',
        author_id: 'test-user-1',
        body: 'Test Content Body',
        category: 'test-category',
        language: 'en',
        status: Status.PUBLISHED,
      };
      let contentId: string | null = null;
      await request(app.getHttpServer())
        .post('/cms/content')
        .send(createContentDto)
        .expect((res) => {
          const createdContent = res.body as ContentResponseDto;
          contentId = createdContent.id;
        });
      if (contentId === null) throw new Error('Content ID not found');

      const updateContentDto: UpdateContentDto = {
        title: 'Updated Content',
        description: 'Updated Description',
        category: 'test-category',
        language: 'en',
        status: Status.DRAFT,
      };
      return request(app.getHttpServer())
        .put(`/cms/content/${contentId as string}`)
        .send(updateContentDto)
        .expect(200)
        .expect((res) => {
          const updatedContent = res.body as ContentResponseDto;
          expect(updatedContent.title).toEqual('Updated Content');
          expect(updatedContent.description).toEqual('Updated Description');
          expect(updatedContent.category).toEqual('test-category');
          expect(updatedContent.language).toEqual('en');
          expect(updatedContent.status).toEqual(Status.DRAFT);
        });
    });
  });

  describe('DELETE /cms/content/:id', () => {
    it('should delete content', async () => {
      const createContentDto: CreateContentDto = {
        title: 'Test Content',
        description: 'Test Description',
        author_id: 'test-user-1',
        body: 'Test Content Body',
        category: 'test-category',
        language: 'en',
        status: Status.PUBLISHED,
      };
      let contentId: string | null = null;
      await request(app.getHttpServer())
        .post('/cms/content')
        .send(createContentDto)
        .expect((res) => {
          const createdContent = res.body as ContentResponseDto;
          contentId = createdContent.id;
        });
      if (contentId === null) throw new Error('Content ID not found');
      return request(app.getHttpServer())
        .delete(`/cms/content/${contentId as string}`)
        .expect(200)
        .expect((res) => {
          const deletedContent = res.body as DeleteContentResponseDto;
          expect(deletedContent.message).toEqual(
            'Content deleted successfully',
          );
          expect(deletedContent.id).toEqual(contentId);
        });
    });
  });

  describe('GET /cms/content/:id', () => {
    it('should get content details', async () => {
      const createContentDto: CreateContentDto = {
        title: 'Test Content',
        description: 'Test Description',
        author_id: 'test-user-1',
        body: 'Test Content Body',
        category: 'test-category',
        language: 'en',
        status: Status.PUBLISHED,
      };
      let contentId: string | null = null;
      await request(app.getHttpServer())
        .post('/cms/content')
        .send(createContentDto)
        .expect((res) => {
          const createdContent = res.body as ContentResponseDto;
          contentId = createdContent.id;
        });
      if (contentId === null) throw new Error('Content ID not found');
      return request(app.getHttpServer())
        .get(`/cms/content/${contentId as string}`)
        .expect(200)
        .expect((res) => {
          const content = res.body as ContentResponseDto;
          expect(content.title).toEqual('Test Content');
          expect(content.description).toEqual('Test Description');
          expect(content.author_id).toEqual('test-user-1');
          expect(content.body).toEqual('Test Content Body');
        });
    });
  });

  describe('GET /cms/content', () => {
    it('should list all contents with pagination', () => {
      return request(app.getHttpServer())
        .get('/cms/content')
        .expect(200)
        .expect((res) => {
          const paginatedContent = res.body as PaginatedContentResponseDto;
          expect(paginatedContent.total).toBeGreaterThan(0);
          expect(paginatedContent.page).toBeGreaterThan(0);
          expect(paginatedContent.limit).toBeGreaterThan(0);
          expect(paginatedContent.totalPages).toBeGreaterThan(0);
        });
    });
  });

  describe('GET /cms/content?page=2&limit=5', () => {
    it('should list contents with custom pagination', () => {
      return request(app.getHttpServer())
        .get('/cms/content')
        .query({ page: 2, limit: 5 })
        .expect(200)
        .expect((res) => {
          const paginatedContent = res.body as PaginatedContentResponseDto;
          expect(paginatedContent.total).toBeGreaterThan(0);
          expect(paginatedContent.page).toEqual(2);
          expect(paginatedContent.limit).toEqual(5);
          expect(paginatedContent.totalPages).toBeGreaterThan(0);
        });
    });
  });
});
