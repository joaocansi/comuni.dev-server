import { CommunityEventFormat } from '../domain/community-event';

export type CreateCommunityEventDTO = {
  id: string;
  name: string;
  description: string;
  date: Date;
  location?: string;
  format: CommunityEventFormat;
  calendarLink: string;
  communityId: string;
};
