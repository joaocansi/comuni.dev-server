import CommunityEventRepositoryImpl from './infrastructure/community-event-impl.repository';

import { Module } from '@nestjs/common';
import { CommunityEventsController } from './community-events.controller';
import { CommunitiesModule } from 'src/communities/communities.module';
import { db } from 'src/shared/db/db';
import { CommunityEventsService } from './community-events.service';

@Module({
  controllers: [CommunityEventsController],
  providers: [
    CommunityEventsService,
    {
      provide: 'COMMUNITY_EVENT_REPOSITORY',
      useFactory: () => {
        return new CommunityEventRepositoryImpl(db);
      },
    },
  ],
  imports: [CommunitiesModule],
  exports: ['COMMUNITY_EVENT_REPOSITORY'],
})
export class CommunityEventsModule {}
