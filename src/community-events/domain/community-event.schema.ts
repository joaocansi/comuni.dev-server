import { CommunitySchema } from 'src/communities/domain/community.schema';
import { CommunityEvent, CommunityEventFormat } from './community-event';

export class CommunityEventSchema {
  id: string;
  name: string;
  description: string;
  date: Date;
  state?: string;
  city?: string;
  address?: string;
  format: CommunityEventFormat;
  calendarLink: string;
  communityId: string;
  community?: CommunitySchema;
  createdAt: Date;
  updatedAt: Date;

  static toDomain(schema: CommunityEventSchema): CommunityEvent {
    const object = {
      id: schema.id,
      calendarLink: schema.calendarLink,
      date: schema.date,
      description: schema.description,
      format: schema.format,
      name: schema.name,
    } as CommunityEvent;

    if (schema.format !== 'VIRTUAL') {
      object.location = {
        state: schema.state,
        city: schema.city,
        address: schema.address,
      };
    }

    return object;
  }
}
