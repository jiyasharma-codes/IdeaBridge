export type IdeaCategory =
  | 'Food & Beverage'
  | 'Packaging'
  | 'Sneakers'
  | 'Clothing'
  | 'Technology'
  | 'Fragrances'
  | 'Gifting'
  | 'Accessories'
  | 'Crockery'
  | 'Handbags'
  | string;

export type IdeaStatus =
  | 'New'
  | 'Under Review'
  | 'Testing'
  | 'Shortlisted'
  | 'Prototype'
  | 'Launched'
  | 'Rejected'
  | 'Draft'
  | 'Saved'
  | 'Implemented';

export interface Author {
  id: string;
  name: string;
  username: string;
  avatarUrl?: string;
  reputationScore: number;
  badge?: string;
}

export interface IdeaComment {
  id: string;
  ideaId: string;
  author: Author;
  content: string;
  createdAt: string;
  upvotes: number;
  isStartupFeedback?: boolean;
  startupName?: string;
}

export interface ValidationSignals {
  viewsCount: number;
  supportersCount: number; // upvotes
  wouldTryPercentage: number; // e.g. 82%
  topConsumerPreferences: string[];
  targetPriceRange: string;
  engagementRate: string;
  categoryInterestScore: number;
}

export interface IdeaInsights {
  summary: string;
  consumerSentiment: 'Strongly Positive' | 'Positive' | 'Promising' | 'Mixed';
  keyOpportunity: string;
  emergingNeedSignal: string;
}

export interface SimilarIdeaRef {
  id: string;
  title: string;
  category: string;
  supporters: number;
}

export interface Idea {
  id: string;
  title: string;
  tagline: string;
  problemStatement: string;
  proposedSolution: string;
  targetAudience: string;
  keyBenefits: string[];
  category: IdeaCategory;
  targetStartupId?: string;
  targetStartupName: string;
  tags: string[];
  author: Author;
  status: IdeaStatus;
  upvotesCount: number;
  commentsCount: number;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
  hasUpvoted?: boolean;
  isShortlisted?: boolean;
  imageUrl?: string;
  challengeId?: string;
  challengeName?: string;

  // Prototype First-Class Metrics
  score: number;       // e.g. 91 (Validation score 0-100)
  buy: number;         // e.g. 82 (% purchase intent)
  opp: number;         // e.g. 88 (Opportunity score 0-100)
  price: string;       // e.g. "₹45–₹55"
  company: string;     // Alias to targetStartupName (e.g. "Nuvie")
  cat: string;         // Alias to category
  desc: string;        // Short description

  // Extended Validation & Testing Signals
  validation: ValidationSignals;
  insights?: IdeaInsights;
  similarIdeas?: SimilarIdeaRef[];
  startupReviewNotes?: string;
  testingPhaseDetails?: string;
  shortlistPriority?: 'high' | 'medium' | 'low';
  contributorRecognition?: string;
  rewardClaimed?: boolean;
}

export type IdeaSortOption =
  | 'Trending'
  | 'Most Validated'
  | 'New'
  | 'Most Discussed'
  | 'High Purchase Intent'
  | 'Highest Opportunity'
  | 'trending'
  | 'most_voted'
  | 'newest';
