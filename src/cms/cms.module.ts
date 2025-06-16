import { Logger, Module } from '@nestjs/common';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ContentModule } from '../content/content.module';
/* Module boundary */
/*
  The module scope is to handle the CRUD operations for the CMS.
  The only coupling is with the Content module.
*/

@Module({
  imports: [PrismaModule, ContentModule],
  controllers: [CmsController],
  providers: [CmsService, Logger],
  exports: [CmsService],
})
export class CmsModule {}
