import { CommunityEventFormat } from '../domain/community-event';

export type CreateCommunityEventDTO = {
  id: string;
  name: string;
  description: string;
  date: Date;
  address?: string;
  state?: string;
  city?: string;
  format: CommunityEventFormat;
  calendarLink: string;
  communityId: string;
};
