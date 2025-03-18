import UserSchema from 'src/users/domain/user.schema';
import Community from './community';

export class CommunitySchema {
  id: string;
  owner: UserSchema;
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

    return object;
  }
}
