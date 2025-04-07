import { CommunityEventFormat } from './community-event';
import { CommunityEventSchema } from './community-event.schema';

export type CreateCommunityEvent = {
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
};

export interface CommunityEventRepository {
  create(data: CreateCommunityEvent): Promise<CommunityEventSchema>;
}
