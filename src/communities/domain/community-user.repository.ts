import { CommunityUserSchema } from './community-user.schema';

export type CreateCommunityUser = {
  userId: string;
  communityId: string;
};

export default interface CommunityUserRepository {
  deleteById(id: string, communityId: string): Promise<void>;
  findById(communityId: string, userId: string): Promise<CommunityUserSchema>;
  create(data: CreateCommunityUser): Promise<CommunityUserSchema>;
}
