import { Inject } from '@nestjs/common';
import { CommunityEventRepository } from '../domain/community-event.repository';
import { AppError, AppErrorType } from 'src/@nest/errors/app-error';
import { Usecase } from 'src/@shared/usecase';

type IDeleteCommunityEventUsecase = {
  id: string;
  userId: string;
};

type ODeleteCommunityEventUsecase = void;

export class DeleteCommunityEventUseCase
  implements Usecase<IDeleteCommunityEventUsecase, ODeleteCommunityEventUsecase>
{
  constructor(
    @Inject('COMMUNITY_EVENT_REPOSITORY')
    private readonly communityEventRepository: CommunityEventRepository,
  ) {}

  async execute({ id, userId }: IDeleteCommunityEventUsecase): Promise<void> {
    const communityEvent = await this.communityEventRepository.findById(id);
    if (!communityEvent)
      throw new AppError(
        'comunidade não encontrada',
        AppErrorType.COMMUNITY_EVENT_NOT_FOUND,
      );

    if (
      !communityEvent.community ||
      communityEvent.community.ownerId !== userId
    )
      throw new AppError(
        'é preciso ser dono da comunidade, para deletar um evento.',
        AppErrorType.COMMUNITY_UNAUTHORIZED,
      );
    await this.communityEventRepository.delete(id);
  }
}
