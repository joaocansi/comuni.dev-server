export const CommunityEventFormatValues = [
  'IN_PERSON',
  'VIRTUAL',
  'BOTH',
] as const;
export type CommunityEventFormat = (typeof CommunityEventFormatValues)[number];

export type CommunityEvent = {
  id: string;
  name: string;
  description: string;
  date: Date;
  location: {
    state: string;
    city: string;
    address: string;
  };
  format: CommunityEventFormat;
  calendarLink: string;
};
