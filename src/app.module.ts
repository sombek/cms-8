import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ContentModule } from './content/content.module';
import { CmsModule } from './cms/cms.module';
import { DiscoveryModule } from './discovery/discovery.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    ContentModule,
    CmsModule,
    DiscoveryModule,
  ],
})
export class AppModule {}
