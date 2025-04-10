import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  CommunityEventRepository,
  CreateCommunityEvent,
} from '../domain/community-event.repository';
import { CommunityEventSchema } from '../domain/community-event.schema';

@Injectable()
export default class CommunityEventRepositoryImpl
  implements CommunityEventRepository
{
  constructor(private readonly db: PrismaClient) {}

  create(data: CreateCommunityEvent): Promise<CommunityEventSchema> {
    return this.db.communityEvent.create({
      data,
    });
  }
}
