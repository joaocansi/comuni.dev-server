import { CommunityEventFormat } from './community-event';
import { CommunityEventSchema } from './community-event.schema';

export type CreateCommunityEvent = {
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

export type UpdateCommunityEvent = {
  id: string;
  name?: string;
  description?: string;
  date?: Date;
  state?: string;
  city?: string;
  address?: string;
  format?: CommunityEventFormat;
  calendarLink?: string;
};

export interface CommunityEventRepository {
  findById(id: string): Promise<CommunityEventSchema>;
  update(data: UpdateCommunityEvent): Promise<CommunityEventSchema>;
  create(data: CreateCommunityEvent): Promise<CommunityEventSchema>;
  delete(id: string): Promise<void>;
}
