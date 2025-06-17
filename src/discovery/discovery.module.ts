import { Logger, Module } from '@nestjs/common';
import { DiscoveryController } from './discovery.controller';
import { DiscoveryService } from './discovery.service';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';
import { ContentService } from 'src/content/content.service';

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
      ttl: 300, // 5 minutes
    }),
  ],
  controllers: [DiscoveryController],
  providers: [Logger, DiscoveryService, ContentService],
})
export class DiscoveryModule {}
