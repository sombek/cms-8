import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CmsModule } from '../src/cms/cms.module';
import { ContentResponseDto } from '../src/content/dto/content-response.dto';
import { CreateContentDto } from '../src/content/dto/create-content.dto';
import { Status } from '../src/generated/prisma/enums';
import 'dotenv/config';

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

  // describe('PUT /cms/content/:id', () => {
  //   it('should update existing content', () => {
  //     const updateContentDto: UpdateContentDto = {
  //       title: 'Updated Content',
  //       description: 'Updated Description',
  //       category: 'test-category',
  //       language: 'en',
  //       status: Status.DRAFT,
  //     };

  //     return request(app.getHttpServer())
  //       .put('/cms/content/test-content-1')
  //       .send(updateContentDto)
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body).toEqual(mockContent);
  //       });
  //   });
  // });

  // describe('DELETE /cms/content/:id', () => {
  //   it('should delete content', () => {
  //     return request(app.getHttpServer())
  //       .delete('/cms/content/test-content-1')
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body).toEqual({ success: true });
  //       });
  //   });
  // });

  // describe('GET /cms/content/:id', () => {
  //   it('should get content details', () => {
  //     return request(app.getHttpServer())
  //       .get('/cms/content/test-content-1')
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body).toEqual(mockContent);
  //       });
  //   });
  // });

  // describe('GET /cms/content', () => {
  //   it('should list all contents with pagination', () => {
  //     const expectedResponse = {
  //       data: [mockContent],
  //       total: 1,
  //       page: 1,
  //       limit: 10,
  //       totalPages: 1,
  //     };

  //     return request(app.getHttpServer())
  //       .get('/cms/content')
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body).toEqual(expectedResponse);
  //       });
  //   });

  //   it('should list contents with custom pagination', () => {
  //     const expectedResponse = {
  //       data: [mockContent],
  //       total: 1,
  //       page: 2,
  //       limit: 5,
  //       totalPages: 1,
  //     };

  //     return request(app.getHttpServer())
  //       .get('/cms/content?page=2&limit=5')
  //       .expect(200)
  //       .expect((res) => {
  //         expect(res.body).toEqual(expectedResponse);
  //       });
  //   });
  // });
});
