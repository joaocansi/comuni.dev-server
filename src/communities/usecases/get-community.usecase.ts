import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import { CommunitySchema } from '../domain/community.schema';
import { Usecase } from 'src/@shared/usecase';
import Community from '../domain/community';
import { AppError, AppErrorType } from 'src/@nest/errors/app-error';

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

    return data;
  }
}
