export type CommunityEventFormat = 'IN_PERSON' | 'VIRTUAL' | 'BOTH';

export type CommunityEvent = {
  id: string;
  name: string;
  description: string;
  date: Date;
  location?: string;
  format: CommunityEventFormat;
  calendarLink: string;
};
