import { Module } from '@nestjs/common';
import { CmsController } from './cms.controller';

@Module({
  controllers: [CmsController],
  providers: [],
  exports: [],
})
export class CmsModule {}
