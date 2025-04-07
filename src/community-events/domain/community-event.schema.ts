import { CommunitySchema } from 'src/communities/domain/community.schema';
import { CommunityEvent, CommunityEventFormat } from './community-event';

export class CommunityEventSchema {
  id: string;
  name: string;
  description: string;
  date: Date;
  location?: string;
  format: CommunityEventFormat;
  calendarLink: string;
  communityId: string;
  community?: CommunitySchema;
  createdAt: Date;
  updatedAt: Date;

  static toDomain(schema: CommunityEventSchema): CommunityEvent {
    return {
      id: schema.id,
      calendarLink: schema.calendarLink,
      date: schema.date,
      location: schema.location,
      description: schema.description,
      format: schema.format,
      name: schema.name,
    };
  }
}
