import { UserSchema } from 'src/users/domain/user.schema';
import Community from './community';
import { CommunityEventSchema } from 'src/community-events/domain/community-event.schema';

export class CommunitySchema {
  id: string;
  owner?: UserSchema;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  image: string;
  slug: string;
  category: string;
  state: string;
  city: string;
  description: string;
  totalMembers: number;
  tags: string[];
  communityEvents?: CommunityEventSchema[];

  static toDomain(schema: CommunitySchema): Community {
    const object = {
      id: schema.id,
      city: schema.city,
      state: schema.state,
      name: schema.name,
      description: schema.description,
      image: schema.image,
      tags: schema.tags,
      slug: schema.slug,
      totalMembers: schema.totalMembers,
      createdAt: schema.createdAt,
      category: schema.category,
    } as Community;

    if (schema.owner)
      object.owner = {
        id: schema.owner.id,
        email: schema.owner.name,
        image: schema.owner.image,
        name: schema.owner.name,
      };

    if (schema.communityEvents)
      object.communityEvents = schema.communityEvents.map((item) =>
        CommunityEventSchema.toDomain(item),
      );

    return object;
  }
}
