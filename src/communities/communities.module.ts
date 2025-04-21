import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import CommunityRepositoryImpl from './infrastructure/community.repository.impl';
import { db } from 'src/shared/db/db';
import { CommunitiesService } from './communities.service';

@Module({
  controllers: [CommunitiesController],
  providers: [
    {
      provide: 'COMMUNITY_REPOSITORY',
      useFactory: () => {
        return new CommunityRepositoryImpl(db);
      },
    },
    CommunitiesService,
  ],
  exports: ['COMMUNITY_REPOSITORY'],
})
export class CommunitiesModule {}
