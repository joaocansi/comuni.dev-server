import { Inject, Injectable } from '@nestjs/common';
import { Usecase } from 'src/@shared/usecase';
import { CommunityEvent } from '../domain/community-event';
import { CommunityEventRepository } from '../domain/community-event.repository';
import { UpdateCommunityEventDTO } from '../dtos/update-community-event.dto';
import { AppError, AppErrorType } from 'src/@nest/errors/app-error';
import { CommunityEventSchema } from '../domain/community-event.schema';

type IUpdateCommunityEventUsecase = UpdateCommunityEventDTO & {
  userId: string;
  id: string;
};

type OUpdateCommunityEventUsecase = CommunityEvent;

@Injectable()
export class UpdateCommunityEventUsecase
  implements Usecase<IUpdateCommunityEventUsecase, OUpdateCommunityEventUsecase>
{
  constructor(
    @Inject('COMMUNITY_EVENT_REPOSITORY')
    private readonly communityEventRepository: CommunityEventRepository,
  ) {}

  async execute(
    data: IUpdateCommunityEventUsecase,
  ): Promise<OUpdateCommunityEventUsecase> {
    const communityEvent = await this.communityEventRepository.findById(
      data.id,
    );

    if (!communityEvent)
      throw new AppError(
        'comunidade não encontrada',
        AppErrorType.COMMUNITY_EVENT_NOT_FOUND,
      );

    if (
      !communityEvent.community ||
      communityEvent.community.ownerId !== data.userId
    )
      throw new AppError(
        'é preciso ser dono da comunidade, para criar um evento.',
        AppErrorType.COMMUNITY_UNAUTHORIZED,
      );

    delete data.userId;

    const updateCommunityEvent =
      await this.communityEventRepository.update(data);

    return CommunityEventSchema.toDomain(updateCommunityEvent);
  }
}
