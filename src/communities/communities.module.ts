import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import CommunityRepositoryImpl from './infrastructure/community.repository.impl';
import CommunityUserRepositoryImpl from './infrastructure/community-user.repository.impl';
import { CreateCommunityUsecase } from './usecases/create-community.usecase';
import { JoinCommunityUsecase } from './usecases/join-community.usecase';
import { GetCommunityUsecase } from './usecases/get-community.usecase';
import { db } from 'src/@shared/db';
import { GetCommunitiesUsecase } from './usecases/get-communities.usecase';
import { LeaveCommunityUsecase } from './usecases/leave-community.usecase';
import { UpdateCommunityUsecase } from './usecases/update-community.usecase';

@Module({
  controllers: [CommunitiesController],
  providers: [
    CreateCommunityUsecase,
    UpdateCommunityUsecase,
    JoinCommunityUsecase,
    GetCommunityUsecase,
    GetCommunitiesUsecase,
    LeaveCommunityUsecase,
    {
      provide: 'COMMUNITY_REPOSITORY',
      useFactory: () => {
        return new CommunityRepositoryImpl(db);
      },
    },
    {
      provide: 'COMMUNITY_USER_REPOSITORY',
      useFactory: () => {
        return new CommunityUserRepositoryImpl(db);
      },
    },
  ],
})
export class CommunitiesModule {}
