export interface Challenge {
  id: string;
  title: string;
  company: string; // Startup name, e.g. "Go Desi", "Nuvie", "SoleStory"
  cat: string;     // e.g. "Food & Beverage", "Sneakers"
  tagline?: string;
  desc: string;    // Brief description
  price: string;   // e.g. "₹30–₹45 per unit"
  people: string;  // e.g. "1,284"
  ideas: string;   // e.g. "312"
  left: string;    // e.g. "14 days"
  reward: string;  // e.g. "Discount coupons + summer drinks hamper"
  criteria?: string[];
  problemSolved?: string;
  whyInterested?: string;
  targetAudience?: string;
  expectedUseCase?: string;
  requirements?: string[];
  perks?: string[];
  winnerRewards?: {
    hamper?: string;
    cashReward?: string;
    earlyAccess?: string;
    collaboration?: string;
    other?: string;
  };
  rewardPackage?: {
    title: string;
    items: string[];
  };
}
