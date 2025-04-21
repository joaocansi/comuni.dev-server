import { CommunityEvent } from 'src/community-events/domain/community-event';
import { CommunityLink } from './community-link';

export default class Community {
  id: string;
  image: string;
  name: string;
  state: string;
  slug: string;
  city: string;
  category: string;
  totalMembers: number;
  owner: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
  communityEvents?: CommunityEvent[];
  communityLinks?: CommunityLink[];
  description: string;
  tags: string[];
  createdAt: Date;
}
