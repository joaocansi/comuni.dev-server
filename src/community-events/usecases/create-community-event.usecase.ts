import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from 'src/@shared/usecase';
import { CommunityEvent } from '../domain/community-event';
import { CommunityEventRepository } from '../domain/community-event.repository';
import CommunityRepository from 'src/communities/domain/community.repository';
import { CreateCommunityEventDTO } from '../dtos/create-community-event.dto';
import { AppError, AppErrorType } from 'src/@nest/errors/app-error';
import { CommunityEventSchema } from '../domain/community-event.schema';

type ICreateCommunityEventUsecase = CreateCommunityEventDTO & {
  userId: string;
};

type OCreateCommunityEventUsecase = CommunityEvent;

@Injectable()
export class CreateCommunityEventUsecase
  implements Usecase<ICreateCommunityEventUsecase, OCreateCommunityEventUsecase>
{
  constructor(
    @Inject('COMMUNITY_EVENT_REPOSITORY')
    private readonly communityEventRepository: CommunityEventRepository,
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async execute(
    data: ICreateCommunityEventUsecase,
  ): Promise<OCreateCommunityEventUsecase> {
    const community = await this.communityRepository.findById(data.communityId);
    if (!community)
      throw new AppError(
        'comunidade não encontrada',
        AppErrorType.COMMUNITY_NOT_FOUND,
      );

    if (community.ownerId !== data.userId)
      throw new AppError(
        'é preciso ser dono da comunidade, para criar um evento.',
        AppErrorType.COMMUNITY_UNAUTHORIZED,
      );

    delete data.userId;

    const createCommunityEvent =
      await this.communityEventRepository.create(data);

    return CommunityEventSchema.toDomain(createCommunityEvent);
  }
}
