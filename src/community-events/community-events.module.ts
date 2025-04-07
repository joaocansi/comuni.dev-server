import { Module } from '@nestjs/common';
import { CommunityEventsController } from './community-events.controller';
import { CreateCommunityEventUsecase } from './usecases/create-community-event.usecase';
import { CommunitiesModule } from 'src/communities/communities.module';
import CommunityEventRepositoryImpl from './infrastructure/community-event-impl.repository';
import { db } from 'src/@shared/db/db';

@Module({
  controllers: [CommunityEventsController],
  providers: [
    CreateCommunityEventUsecase,
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
