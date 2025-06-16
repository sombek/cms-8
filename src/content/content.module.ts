import { Module } from '@nestjs/common';
import { ContentController } from './content.controller';

@Module({
  controllers: [ContentController],
  providers: [],
  exports: [],
})
export class ContentModule {}
