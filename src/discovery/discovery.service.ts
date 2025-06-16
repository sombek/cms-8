// import { Injectable, Logger } from '@nestjs/common';
// import { CACHE_MANAGER } from '@nestjs/cache-manager';
// import { Inject } from '@nestjs/common';
// import { Cache } from 'cache-manager';
// import { DiscoveryQueryDto } from './dto/discovery-query.dto';
// import { TrendingContentResponseDto } from './dto/discovery-response.dto';

// @Injectable()
// export class DiscoveryService {
//   private readonly CACHE_TTL = 300; // 5 minutes in seconds
//   private readonly CACHE_PREFIX = 'trending:';

//   constructor(
//     @Inject(CACHE_MANAGER) private cacheManager: Cache,
//     private readonly logger: Logger,
//   ) {}

//   private generateCacheKey(query: DiscoveryQueryDto): string {
//     const { category, language, page, limit } = query;
//     return `${this.CACHE_PREFIX}${category || 'all'}:${language || 'all'}:${page || 1}:${limit || 10}`;
//   }

//   async getTrendingContent(
//     query: DiscoveryQueryDto,
//   ): Promise<TrendingContentResponseDto> {
//     try {
//       const cacheKey = this.generateCacheKey(query);

//       // Try to get from cache first
//       const cachedData =
//         await this.cacheManager.get<TrendingContentResponseDto>(cacheKey);
//       if (cachedData) {
//         this.logger.debug(`Cache hit for key: ${cacheKey}`);
//         return cachedData;
//       }

//       // If not in cache, get from repository
//       const content = await this.contentRepository.findAll({
//         page: query.page || 1,
//         limit: query.limit || 10,
//         sort_by: 'published_at',
//         sort_order: 'desc',
//         category: query.category || 'all',
//       });
//       const total = content.length;
//       const trending_content = content.map((content) => ({
//         ...content,
//         discovery_meta: {
//           viewCount: 0,
//         },
//       }));
//       const response: TrendingContentResponseDto = {
//         trending_content: trending_content,
//         total,
//         page: query.page || 1,
//         limit: query.limit || 10,
//         updated_at: new Date(),
//       };

//       // Store in cache
//       await this.cacheManager.set(cacheKey, response, this.CACHE_TTL * 1000);
//       this.logger.debug(`Cached data for key: ${cacheKey}`);

//       return response;
//     } catch (error) {
//       this.logger.error('Failed to get trending content', error);
//       throw error;
//     }
//   }
// }
