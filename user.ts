import { IdeaCategory } from './idea';

export interface ConsumerProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  avatarUrl?: string;
  bio?: string;
  reputationScore: number;
  submittedIdeasCount: number;
  upvotedIdeasCount: number;
  badges: string[];
  rewardsEarned: {
    id: string;
    title: string;
    fromStartup: string;
    date: string;
    rewardType: string;
  }[];
  createdAt: string;
}

export interface StartupRepresentative {
  id: string;
  workEmail: string;
  name: string;
  title: string;
  startupId: string;
  startupName: string;
  startupCategory: IdeaCategory;
  avatarUrl?: string;
  isVerified: boolean;
  createdAt: string;
}
