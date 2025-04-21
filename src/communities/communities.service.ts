import { Inject, Injectable } from '@nestjs/common';
import Community from './domain/community';
import { CommunityLink } from './domain/community-link';
import CommunityRepository, {
  CommunityPaginatedResult,
} from './domain/community.repository';
import { generateSlug } from 'src/shared/utils/slug-generator';
import { CommunitySchema } from './domain/community.schema';
import {
  CommunityAlreadyExistsError,
  CommunityNotFoundError,
  CommunityUnauthorizedError,
} from 'src/shared/@nest/errors/app-error';

type ICreateCommunity = {
  image: string;
  name: string;
  description: string;
  state: string;
  city: string;
  tags: string[];
  category: string;
  communityLinks: CommunityLink[];
  ownerId: string;
};

type OCreateCommunity = Community;

type IUpdateCommunity = {
  id: string;
  image?: string;
  name?: string;
  description?: string;
  state?: string;
  city?: string;
  tags?: string[];
  category?: string;
  communityLinks?: CommunityLink[];
  ownerId: string;
};

type OUpdateCommunity = Community;

type IGetCommunities = {
  limit: number;
  page: number;
  filters?: {
    tags?: string[];
    state?: string;
    city?: string;
  };
};

type OGetCommunities = CommunityPaginatedResult;

type IGetCommunity = {
  slug: string;
};

type OGetCommunity = Community;

@Injectable()
export class CommunitiesService {
  constructor(
    @Inject('COMMUNITY_REPOSITORY')
    private readonly communityRepository: CommunityRepository,
  ) {}

  async create(data: ICreateCommunity): Promise<OCreateCommunity> {
    const slug = generateSlug(data.name);

    const community = await this.communityRepository.findBySlug(slug);
    if (community) {
      throw CommunityAlreadyExistsError();
    }

    const createdCommunity = await this.communityRepository.create(
      Object.assign({}, data, { slug }),
    );
    return CommunitySchema.toDomain(createdCommunity as CommunitySchema);
  }

  async update(data: IUpdateCommunity): Promise<OUpdateCommunity> {
    const community = await this.communityRepository.findById(data.id);
    if (!community) {
      throw CommunityNotFoundError();
    }

    if (community.ownerId !== data.ownerId) {
      throw CommunityUnauthorizedError();
    }

    const UpdatedCommunity = await this.communityRepository.update(
      Object.assign({}, community, data),
    );
    return CommunitySchema.toDomain(UpdatedCommunity as CommunitySchema);
  }

  async getPaginatedCommunities({
    limit,
    page,
    filters,
  }: IGetCommunities): Promise<OGetCommunities> {
    return this.communityRepository.findPaginated({
      limit: Number(limit),
      page: Number(page),
      filters,
    });
  }

  async getCommunity(dto: IGetCommunity): Promise<OGetCommunity> {
    const community = await this.communityRepository.findBySlug(dto.slug);

    if (!community) throw CommunityNotFoundError();

    return Object.assign({}, CommunitySchema.toDomain(community), {
      sessionUser: null,
    });
  }
}
