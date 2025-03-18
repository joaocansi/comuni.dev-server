import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import CommunityUserRepository, {
  CreateCommunityUser,
} from '../domain/community-user.repository';
import { CommunityUserSchema } from '../domain/community-user.schema';

@Injectable()
export default class CommunityUserRepositoryImpl
  implements CommunityUserRepository
{
  constructor(private readonly db: PrismaClient) {}

  async deleteById(communityId: string, userId: string): Promise<void> {
    await this.db.$transaction([
      this.db.community.update({
        where: {
          id: communityId,
        },
        data: {
          totalMembers: {
            decrement: 1,
          },
        },
      }),
      this.db.communityUser.delete({
        where: { communityId_userId: { communityId, userId } },
      }),
    ]);
  }

  findById(communityId: string, userId: string): Promise<CommunityUserSchema> {
    return this.db.communityUser.findFirst({
      where: {
        communityId,
        userId,
      },
    });
  }

  async create(data: CreateCommunityUser): Promise<CommunityUserSchema> {
    const [communityUser] = await this.db.$transaction([
      this.db.communityUser.create({
        data,
      }),
      this.db.community.update({
        where: {
          id: data.communityId,
        },
        data: {
          totalMembers: {
            increment: 1,
          },
        },
      }),
    ]);
    return communityUser;
  }
}
