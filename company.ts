import { IdeaCategory } from './idea';

export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string;
  industry: string;
  description: string;
  verified: boolean;
  activeChallengesCount: number;
  shortlistedIdeasCount: number;
  interests: IdeaCategory[];
  headquarters: string;
  website: string;
}

export interface TrendMetric {
  id: string;
  category: IdeaCategory;
  keyword: string;
  growthPercentage: number;
  totalSubmissions: number;
  sentiment: 'positive' | 'neutral' | 'high_demand';
  description: string;
  consumerQuote: string;
  monthlyVelocity: number;
}

export type PipelineStage = 'scouted' | 'in_review' | 'lab_testing' | 'commercialization';

export interface ShortlistedIdeaRecord {
  id: string;
  ideaId: string;
  companyId: string;
  stage: PipelineStage;
  internalNotes?: string;
  assignedTeam?: string;
  addedAt: string;
  priority: 'low' | 'medium' | 'high';
}

export interface CompanyAnalyticsSummary {
  totalIdeasMonitored: number;
  newIdeasThisWeek: number;
  highEngagementIdeas: number;
  shortlistedPipelineCount: number;
  topTrendingCategory: IdeaCategory;
}
