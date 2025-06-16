import { Module } from '@nestjs/common';
import { ContentModule } from './content/content.module';
import { CmsModule } from './cms/cms.module';

@Module({
  imports: [ContentModule, CmsModule],
})
export class AppModule {}
