import { Injectable } from '@nestjs/common';
import CommunityRepository, {
  CommunityFilters,
  CommunityPaginatedResult,
  CreateCommunity,
  UpdateCommunity,
} from '../domain/community.repository';
import { CommunitySchema } from '../domain/community.schema';
import { db } from 'src/shared/db/db';
import { Community, PrismaClient } from '@prisma/client';
import { PaginationOptions } from 'src/shared/paginated';
import { CommunityLink } from '../domain/community-link';

@Injectable()
export default class CommunityRepositoryImpl implements CommunityRepository {
  constructor(private readonly db: PrismaClient) {}

  private readonly defaultInclude = {
    owner: {
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
      },
    },
  };

  // This method is used to convert the Community object from the database
  // to the CommunitySchema object that is used in the application.
  // It includes the community links and maps them to the CommunityLink type.
  private convertToCommunitySchema(community: Community): CommunitySchema {
    if (!community) {
      return null;
    }

    const communityLinks = community.communityLinks?.map((link: any) => ({
      name: link.name,
      value: link.value,
    })) as CommunityLink[] | undefined;

    return {
      ...community,
      communityLinks,
    };
  }

  async findBySlug(slug: string): Promise<CommunitySchema> {
    const community = await db.community.findFirst({
      where: {
        slug,
      },
      include: {
        ...this.defaultInclude,
        communityEvents: {
          where: {
            date: {
              gt: new Date(),
            },
          },
        },
      },
    });

    return this.convertToCommunitySchema(community);
  }

  async findByName(name: string): Promise<CommunitySchema> {
    const community = await db.community.findFirst({
      where: {
        name,
      },
      include: this.defaultInclude,
    });
    return this.convertToCommunitySchema(community);
  }

  async findPaginated(
    options: PaginationOptions<CommunityFilters>,
  ): Promise<CommunityPaginatedResult> {
    const { page = 1, limit = 10, filters = {} } = options;
    const skip = (page - 1) * limit;

    const where = {
      ...(filters.state && { state: filters.state }),
      ...(filters.city && { city: filters.city }),
      ...(filters.tag && { tags: { has: filters.tag } }),
      ...(filters.category && { category: filters.category }),
    };

    const [data, total] = await Promise.all([
      this.db.community.findMany({
        where,
        skip,
        take: limit,
        include: this.defaultInclude,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.db.community.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<CommunitySchema> {
    const community = await db.community.findFirst({
      where: {
        id,
      },
      include: this.defaultInclude,
    });
    return this.convertToCommunitySchema(community);
  }

  async create(data: CreateCommunity): Promise<Omit<CommunitySchema, 'owner'>> {
    const community = await db.community.create({
      data,
      include: this.defaultInclude,
    });
    return this.convertToCommunitySchema(community);
  }

  async update({
    id,
    ...data
  }: UpdateCommunity): Promise<Omit<CommunitySchema, 'owner'>> {
    const community = await db.community.update({
      where: {
        id,
      },
      data,
      include: this.defaultInclude,
    });
    return this.convertToCommunitySchema(community);
  }
}
