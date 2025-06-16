import { Logger, Module } from '@nestjs/common';
import { ContentRepository } from './content.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContentRepository, Logger],
  exports: [ContentRepository],
})
export class ContentModule {}
