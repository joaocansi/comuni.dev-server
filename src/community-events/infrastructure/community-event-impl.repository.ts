import { Injectable } from '@nestjs/common';
import { Community, CommunityEvent, PrismaClient } from '@prisma/client';
import {
  CommunityEventRepository,
  CreateCommunityEvent,
  UpdateCommunityEvent,
} from '../domain/community-event.repository';
import { CommunityEventSchema } from '../domain/community-event.schema';
import { CommunityLink } from 'src/communities/domain/community-link';

@Injectable()
export default class CommunityEventRepositoryImpl
  implements CommunityEventRepository
{
  constructor(private readonly db: PrismaClient) {}

  // This method is used to convert the CommunityEvent object from the database
  // to the CommunityEventSchema object that is used in the application.
  // It includes the community information and maps the community links to the
  // CommunityLink type.
  private convertToCommunityEventSchema(
    communityEvent: CommunityEvent & { community: Community },
  ): CommunityEventSchema | null {
    if (!communityEvent) {
      return null;
    }

    const communityLinks = this.mapCommunityLinks(
      communityEvent.community.communityLinks,
    );

    const community = {
      ...communityEvent.community,
      communityLinks,
    };

    return {
      ...communityEvent,
      community,
    };
  }

  // This method is used to map the community links from the database
  // to the CommunityLink type that is used in the application.
  private mapCommunityLinks(links: any): CommunityLink[] {
    if (!Array.isArray(links)) {
      return [];
    }

    return links.map((link: any) => ({
      name: link.name,
      value: link.value,
    }));
  }

  async findById(id: string): Promise<CommunityEventSchema> {
    const communityEvent = await this.db.communityEvent.findUnique({
      where: {
        id,
      },
      include: {
        community: true,
      },
    });
    return this.convertToCommunityEventSchema(communityEvent);
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
