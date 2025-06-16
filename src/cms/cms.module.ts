import { Logger, Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentService } from '../content/content.service';
/* Module boundary */
/*
  The module scope is to handle the CRUD operations for the CMS.
  The only coupling is with the Content Service to interact with the database.
*/

@Module({
  imports: [PrismaModule],
  controllers: [CmsController],
  providers: [Logger, ContentService],
  exports: [],
})
export class CmsModule {}
