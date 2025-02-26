export type MembershipLevel = 'admin' | 'developer' | 'user';

export interface User {
  id: string;
  name: string;
  email: string;
  membershipLevel: MembershipLevel;
}

export interface AIAgent {
  id: string;
  name: string;
  description: string;
  developer: User;
  status: 'pending' | 'approved' | 'rejected';
  reviews: Review[];
  rating: number;
}

export interface Review {
  id: string;
  user: User;
  content: string;
  rating: number;
  date: Date;
}