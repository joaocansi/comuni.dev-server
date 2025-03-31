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
  rejected: number;
  accepted: number;
  createdAt: Date;
  updatedAt: Date;

  static toDomain(schema: CommunityEventSchema): CommunityEvent {
    return schema;
  }
}
