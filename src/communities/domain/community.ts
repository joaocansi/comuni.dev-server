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
  description: string;
  tags: string[];
  createdAt: Date;
}
