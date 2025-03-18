import { Injectable } from '@nestjs/common';
import CommunityRepository, {
  CommunityFilters,
  CommunityPaginatedResult,
  CreateCommunity,
  UpdateCommunity,
} from '../domain/community.repository';
import { CommunitySchema } from '../domain/community.schema';
import { db } from 'src/@shared/db';
import { PrismaClient } from '@prisma/client';
import { PaginationOptions } from 'src/@shared/types/paginated';

@Injectable()
export default class CommunityRepositoryImpl implements CommunityRepository {
  constructor(private readonly db: PrismaClient) {}
  findBySlug(slug: string): Promise<CommunitySchema> {
    return db.community.findFirst({
      where: {
        slug,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });
  }

  findByName(name: string): Promise<CommunitySchema> {
    return db.community.findFirst({
      where: {
        name,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });
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
        omit: {
          ownerId: true,
        },
        include: {
          owner: {
            select: {
              id: true,
              name: true,
              image: true,
              email: true,
            },
          },
        },
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
    return db.community.findFirst({
      where: {
        id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            image: true,
            email: true,
          },
        },
      },
    });
  }

  create(data: CreateCommunity): Promise<Omit<CommunitySchema, 'owner'>> {
    return db.community.create({
      data,
    });
  }

  update({
    id,
    ...data
  }: UpdateCommunity): Promise<Omit<CommunitySchema, 'owner'>> {
    return db.community.update({
      where: {
        id,
      },
      data,
    });
  }
}
