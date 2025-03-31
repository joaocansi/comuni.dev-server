import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommunitiesModule } from './communities/communities.module';
import { CommunityEventsModule } from './community-events/community-events.module';

@Global()
@Module({
  imports: [ConfigModule.forRoot(), CommunitiesModule, CommunityEventsModule],
})
export class AppModule {
  static register(db: any): DynamicModule {
    return {
      module: AppModule,
      providers: [
        {
          provide: 'DATABASE_CONNECTION',
          useValue: db,
        },
      ],
      exports: ['DATABASE_CONNECTION'],
    };
  }
}
