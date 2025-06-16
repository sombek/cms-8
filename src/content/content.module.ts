import { Logger, Module } from '@nestjs/common';
import { ContentRepository } from './content.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { RedisModule } from '../redis/redis.module';

@Module({
  imports: [PrismaModule, RedisModule],
  providers: [ContentRepository, Logger],
  exports: [ContentRepository],
})
export class ContentModule {}
