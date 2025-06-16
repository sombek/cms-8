import { Module } from '@nestjs/common';
import { ContentModule } from './content/content.module';
import { CmsModule } from './cms/cms.module';
import { DiscoveryModule } from './discovery/discovery.module';

@Module({
  imports: [ContentModule, CmsModule, DiscoveryModule],
})
export class AppModule {}
