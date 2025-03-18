import {
  PaginatedResult,
  PaginationOptions,
} from 'src/@shared/types/paginated';
import { CommunitySchema } from './community.schema';

export type CreateCommunity = {
  image: string;
  name: string;
  state: string;
  slug: string;
  city: string;
  description: string;
  ownerId: string;
  tags: string[];
  category: string;
};

export type UpdateCommunity = Partial<CreateCommunity> & {
  id: string;
};

export type UpdateCommunityResponse = CommunitySchema;

export type CommunityFilters = {
  state?: string;
  city?: string;
  tag?: string;
  category?: string;
};

export type CommunityPaginatedResult = PaginatedResult<{
  id: string;
  image: string;
  name: string;
  state: string;
  city: string;
  description: string;
  category: string;
  owner: {
    name: string;
    email: string;
    image: string;
  };
  totalMembers: number;
  tags: string[];
}>;

export default interface CommunityRepository {
  findBySlug(slug: string): Promise<CommunitySchema>;
  findById(id: string): Promise<CommunitySchema>;
  findByName(name: string): Promise<CommunitySchema>;
  findPaginated(
    options: PaginationOptions<CommunityFilters>,
  ): Promise<CommunityPaginatedResult>;
  create(data: CreateCommunity): Promise<Omit<CommunitySchema, 'owner'>>;
  update(data: UpdateCommunity): Promise<Omit<CommunitySchema, 'owner'>>;
}
