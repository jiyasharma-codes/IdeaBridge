export interface StartupProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  isLive: boolean;
  tags: string[];
}

export interface RecentlyLaunchedProduct {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  validationsCount: number; // e.g. 3842
  monthlyRevenue: string;   // e.g. "₹4.8L"
  consumerResponse: string; // e.g. "82% positive"
  netProfit: string;        // e.g. "₹1.02L"
  margin: string;           // e.g. "21.3%"
  unitEconomics: {
    productionCost: number;     // e.g. 21
    packagingDistribution: number; // e.g. 9
    avgSellingPrice: number;    // e.g. 49
    contribution: number;       // e.g. 19
  };
  launchResponse: {
    repeatInterest: number;     // e.g. 68
    positiveTaste: number;      // e.g. 82
    packagingAppeal: number;    // e.g. 76
  };
}

export interface ImplementedIdeaFinancials {
  id: string;
  productName: string;
  originIdeaTitle: string;
  suggestedPrice: string;
  validationsCount: number;
  votesCount: number;
  monthlyRevenue: string;          // e.g. "₹4.8L"
  unitsPerMonth: string;           // e.g. "9,800 units / month" (separate metric)
  annualOpportunity: string;       // e.g. "₹57.6L" (whole-year revenue)
  productionCostMonthly: string;   // e.g. "₹2.05L / mo"
  operatingCostMonthly: string;    // e.g. "₹88K / mo"
  netProfitMonthly: string;        // e.g. "₹1.02L / mo"
  marginPercentage: string;        // e.g. "21.3%"
  growthPotentialYoY: string;      // e.g. "+24% YoY"
  breakdown: {
    production: number;   // e.g. 205
    operating: number;    // e.g. 88
    netProfit: number;    // e.g. 102
  };
}

export interface ScoutingMandate {
  whatWeAreLookingFor: string[];
  rewardsAndPerks: string[];
  targetAudience: string;
  priceRange: string;
  validationThreshold: string;
  pipelineFocus: string;
}

export interface AICluster {
  id: string;
  title: string;
  interactionsCount: string; // e.g. "1,184"
  statusTag: string;          // e.g. "High validation", "Rising", "Emerging"
  category: string;
}

export interface EmergingTrend {
  id: string;
  trendNumber: number;
  title: string;
  confidence: number;
  responsesCount: number;
  bullets: string[];
}

export interface StartupAnalytics {
  weeklyDemand: {
    week: string;
    validations: number;
    heightPct: string;
  }[];
  demographics: {
    group: string;
    pct: number;
    count: number;
    color: string;
  }[];
  priceSensitivity: {
    price: string;
    acceptancePct: number;
  }[];
  productAreaDemand: {
    area: string;
    count: number;
    pct: number;
  }[];
}

export interface Startup {
  id: string;
  name: string;
  avatar: string;
  category: string;
  stage: string;
  tagline: string;
  description: string;
  productPortfolio: StartupProduct[];
  recentlyLaunched: RecentlyLaunchedProduct;
  implementedFinancials?: ImplementedIdeaFinancials[];
  scoutingMandate?: ScoutingMandate;
  emergingTrends?: EmergingTrend[];
  aiInsightQuote?: string;
  analytics?: StartupAnalytics;
}
