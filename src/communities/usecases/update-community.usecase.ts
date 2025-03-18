import { Inject, Injectable } from '@nestjs/common';
import CommunityRepository from '../domain/community.repository';
import { UpdateCommunityDTO } from '../dtos/update-community.dto';
import { CommunitySchema } from '../domain/community.schema';
import Community from '../domain/community';
import { Usecase } from 'src/@shared/types/usecase';
import { AppError, AppErrorType } from 'src/@shared/errors/app-error';

type IUpdateCommunityUsecase = UpdateCommunityDTO & {
  ownerId: string;
  id: string;
};

type OUpdateCommunityUsecase = Community;

@Injectable()
export class UpdateCommunityUsecase
  implements Usecase<IUpdateCommunityUsecase, OUpdateCommunityUsecase>
{
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async execute(data: IUpdateCommunityUsecase): Promise<Community> {
    const community = await this.communityRepository.findById(data.id);
    if (!community) {
      throw new AppError(
        'comunidade não existe',
        AppErrorType.COMMUNITY_NOT_FOUND,
      );
    }

    if (community.ownerId !== data.ownerId) {
      throw new AppError(
        'é preciso ser dono da comunidade para editar informações.',
        AppErrorType.COMMUNITY_UNAUTHORIZED,
      );
    }

    console.log(data);
    const UpdatedCommunity = await this.communityRepository.update({
      id: community.id,
      ...data,
    });
    return CommunitySchema.toDomain(UpdatedCommunity as CommunitySchema);
  }
}
