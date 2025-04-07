import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import CommunityRepositoryImpl from './infrastructure/community.repository.impl';
import { CreateCommunityUsecase } from './usecases/create-community.usecase';
import { GetCommunityUsecase } from './usecases/get-community.usecase';
import { db } from 'src/@shared/db/db';
import { GetCommunitiesUsecase } from './usecases/get-communities.usecase';
import { UpdateCommunityUsecase } from './usecases/update-community.usecase';

@Module({
  controllers: [CommunitiesController],
  providers: [
    CreateCommunityUsecase,
    UpdateCommunityUsecase,
    GetCommunityUsecase,
    GetCommunitiesUsecase,
    {
      provide: 'COMMUNITY_REPOSITORY',
      useFactory: () => {
        return new CommunityRepositoryImpl(db);
      },
    },
  ],
  exports: ['COMMUNITY_REPOSITORY'],
})
export class CommunitiesModule {}
