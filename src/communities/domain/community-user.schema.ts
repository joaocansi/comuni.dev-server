import { CommunityUser } from './community-user';
import UserSchema from 'src/users/domain/user.schema';

export class CommunityUserSchema {
  userId: string;
  user?: UserSchema;
  communityId: string;
  community?: CommunityUserSchema;
  createdAt: Date | null;
  updatedAt: Date | null;

  static toDomain(communityUserSchema: CommunityUserSchema): CommunityUser {
    return {
      communityId: communityUserSchema.communityId,
      userId: communityUserSchema.userId,
    };
  }
}
