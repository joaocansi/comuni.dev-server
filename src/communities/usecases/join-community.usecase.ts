import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import CommunityUserRepository from '../domain/community-user.repository';
import { Usecase } from 'src/@shared/types/usecase';
import { CommunityUserSchema } from '../domain/community-user.schema';
import { CommunityUser } from '../domain/community-user';
import { AppError, AppErrorType } from 'src/@shared/errors/app-error';

type IJoinCommunityUsecase = {
  communityId: string;
  userId: string;
};

type OJoinCommunityUsecase = CommunityUser;

@Injectable()
export class JoinCommunityUsecase
  implements Usecase<IJoinCommunityUsecase, OJoinCommunityUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
    @Inject('COMMUNITY_USER_REPOSITORY')
    private readonly communityUserRepository: CommunityUserRepository,
  ) {}

  async execute({
    communityId,
    userId,
  }: IJoinCommunityUsecase): Promise<OJoinCommunityUsecase> {
    const community = await this.communityRepository.findById(communityId);
    if (!community)
      throw new AppError(
        'comunidade não existe',
        AppErrorType.COMMUNITY_NOT_FOUND,
      );

    if (community.ownerId === userId)
      throw new AppError(
        'usuário é o criador da comunidade e não pode entrar na comunidade como usuário comum.',
        AppErrorType.OWNER_CANNOT_JOIN,
      );

    const communityUser = await this.communityUserRepository.findById(
      communityId,
      userId,
    );

    if (communityUser)
      throw new AppError(
        'usuário já está na comunidade',
        AppErrorType.USER_ALREADY_JOINED,
      );

    const createdCommunityUser = await this.communityUserRepository.create({
      communityId,
      userId,
    });

    return CommunityUserSchema.toDomain(createdCommunityUser);
  }
}
