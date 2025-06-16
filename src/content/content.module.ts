import { Logger, Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ContentService, Logger],
  exports: [ContentService],
})
export class ContentModule {}
