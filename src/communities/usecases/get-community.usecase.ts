import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import { CommunitySchema } from '../domain/community.schema';
import { Usecase } from 'src/@shared/types/usecase';
import Community from '../domain/community';
import { AppError, AppErrorType } from 'src/@shared/errors/app-error';
import CommunityUserRepository from '../domain/community-user.repository';

type IGetCommunityUsecase = {
  userId: string;
  communitySlug: string;
};
type OGetCommunityUsecase = Community & {
  sessionUser: string;
};

@Injectable()
export class GetCommunityUsecase
  implements Usecase<IGetCommunityUsecase, OGetCommunityUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
    @Inject('COMMUNITY_USER_REPOSITORY')
    private readonly communityUserRepository: CommunityUserRepository,
  ) {}

  async execute(dto: IGetCommunityUsecase) {
    const community = await this.communityRepository.findBySlug(
      dto.communitySlug,
    );
    if (!community)
      throw new AppError(
        'communidade não encontrada',
        AppErrorType.COMMUNITY_NOT_FOUND,
      );

    const data = {
      ...CommunitySchema.toDomain(community),
      sessionUser: null,
    } as OGetCommunityUsecase;

    if (dto.userId) {
      const communityUser = await this.communityUserRepository.findById(
        community.id,
        dto.userId,
      );

      if (communityUser) data.sessionUser = dto.userId;
    }

    return data;
  }
}
