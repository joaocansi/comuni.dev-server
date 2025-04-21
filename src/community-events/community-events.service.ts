import { Inject } from '@nestjs/common';
import { CommunityEventRepository } from './domain/community-event.repository';
import CommunityRepository from 'src/communities/domain/community.repository';
import { CommunityEvent, CommunityEventFormat } from './domain/community-event';
import {
  CommunityEventNotFoundError,
  CommunityNotFoundError,
  CommunityUnauthorizedError,
} from 'src/shared/@nest/errors/app-error';
import { CommunityEventSchema } from './domain/community-event.schema';

type ICreateCommunityEvent = {
  name: string;
  description: string;
  date: Date;
  address?: string;
  state?: string;
  city?: string;
  format: CommunityEventFormat;
  calendarLink: string;
  communityId: string;
  userId: string;
};

type OCreateCommunityEvent = CommunityEvent;

type IDeleteCommunityEvent = {
  id: string;
  userId: string;
};

type ODeleteCommunityEvent = void;

type IUpdateCommunityEvent = {
  id: string;
  name?: string;
  description?: string;
  date?: Date;
  address?: string;
  state?: string;
  city?: string;
  format?: CommunityEventFormat;
  calendarLink?: string;
  userId: string;
};

type OUpdateCommunityEvent = CommunityEvent;

export class CommunityEventsService {
  constructor(
    @Inject('COMMUNITY_EVENT_REPOSITORY')
    private readonly communityEventRepository: CommunityEventRepository,
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async create(data: ICreateCommunityEvent): Promise<OCreateCommunityEvent> {
    const community = await this.communityRepository.findById(data.communityId);
    if (!community) throw CommunityNotFoundError();

    if (community.ownerId !== data.userId) throw CommunityUnauthorizedError();

    delete data.userId;

    const createCommunityEvent =
      await this.communityEventRepository.create(data);

    return CommunityEventSchema.toDomain(createCommunityEvent);
  }

  async delete({
    id,
    userId,
  }: IDeleteCommunityEvent): Promise<ODeleteCommunityEvent> {
    const communityEvent = await this.communityEventRepository.findById(id);
    if (!communityEvent) throw CommunityEventNotFoundError();

    if (
      !communityEvent.community ||
      communityEvent.community.ownerId !== userId
    )
      throw CommunityUnauthorizedError();

    await this.communityEventRepository.delete(id);
  }

  async update(data: IUpdateCommunityEvent): Promise<OUpdateCommunityEvent> {
    const communityEvent = await this.communityEventRepository.findById(
      data.id,
    );

    if (!communityEvent) throw CommunityEventNotFoundError();

    if (
      !communityEvent.community ||
      communityEvent.community.ownerId !== data.userId
    )
      throw CommunityUnauthorizedError();

    delete data.userId;

    const updateCommunityEvent =
      await this.communityEventRepository.update(data);

    return CommunityEventSchema.toDomain(updateCommunityEvent);
  }
}
