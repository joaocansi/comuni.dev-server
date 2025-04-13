import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  CommunityEventRepository,
  CreateCommunityEvent,
  UpdateCommunityEvent,
} from '../domain/community-event.repository';
import { CommunityEventSchema } from '../domain/community-event.schema';

@Injectable()
export default class CommunityEventRepositoryImpl
  implements CommunityEventRepository
{
  constructor(private readonly db: PrismaClient) {}

  findById(id: string): Promise<CommunityEventSchema> {
    return this.db.communityEvent.findUnique({
      where: {
        id,
      },
      include: {
        community: true,
      },
    });
  }

  create(data: CreateCommunityEvent): Promise<CommunityEventSchema> {
    return this.db.communityEvent.create({
      data,
    });
  }

  update({ id, ...data }: UpdateCommunityEvent): Promise<CommunityEventSchema> {
    return this.db.communityEvent.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.db.communityEvent.delete({
      where: {
        id,
      },
    });
  }
}
