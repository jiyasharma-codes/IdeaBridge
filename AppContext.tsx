import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Idea, IdeaComment, IdeaStatus } from '@/types/idea';
import { ConsumerProfile, StartupRepresentative } from '@/types/user';
import {
  Startup,
  AICluster,
  ImplementedIdeaFinancials,
  ScoutingMandate,
  EmergingTrend,
  StartupAnalytics,
} from '@/types/startup';
import { Challenge } from '@/types/challenge';
import { INITIAL_STARTUPS, INITIAL_DRAFT_IDEAS } from '@/data/startupsData';

interface AppContextType {
  // Authentication & Role
  consumerUser: ConsumerProfile | null;
  startupUser: StartupRepresentative | null;
  setConsumerUser: (user: ConsumerProfile | null) => void;
  setStartupUser: (user: StartupRepresentative | null) => void;
  logout: () => void;

  // Consumer Auth Modal
  isConsumerAuthModalOpen: boolean;
  openConsumerAuthModal: () => void;
  closeConsumerAuthModal: () => void;

  // Preferences & Global Search
  selectedAvatar: string;
  setSelectedAvatar: (avatar: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  globalConsumerSearch: string;
  setGlobalConsumerSearch: (q: string) => void;

  // Startups & Active Startup Context
  startups: Startup[];
  selectedStartup: Startup;
  setSelectedStartupId: (startupId: string) => void;
  activeImplementedFinancials: ImplementedIdeaFinancials[];
  activeScoutingMandate: ScoutingMandate;
  activeEmergingTrends: EmergingTrend[];
  activeAnalytics: StartupAnalytics;

  // Ideas & State
  ideas: Idea[];
  draftIdeas: Idea[];
  submitDraftIdea: (draftId: string) => void;
  updateDraftIdea: (draft: Idea) => void;
  comments: Record<string, IdeaComment[]>;
  upvoteIdea: (ideaId: string) => boolean;
  submitIdea: (ideaData: {
    title: string;
    company: string;
    cat: string;
    price: string;
    desc: string;
    why: string;
  }) => Idea;
  addComment: (ideaId: string, content: string, isStartupFeedback?: boolean) => void;
  updateIdeaStatus: (ideaId: string, newStatus: IdeaStatus) => void;
  toggleShortlist: (ideaId: string) => void;

  // Challenges
  challenges: Challenge[];
  submitChallengeIdea: (challengeIndex: number, submission: {
    title: string;
    desc: string;
    problem: string;
    targetCustomer: string;
    price: string;
    whyBuy: string;
  }) => void;
  addChallenge: (challenge: {
    title: string;
    desc: string;
    price: string;
    reward: string;
    cat: string;
  }) => void;

  // Market Insights & AI Clusters
  aiClusters: AICluster[];

  // Concept Lab State & Simulation
  conceptLabIdea: {
    name: string;
    packageType: string;
    weightVolume: string;
    targetAge: string;
    sellingPrice: number;
    unitCost: number;
    marketingUnit: number;
    distributionUnit: number;
    expectedSales: number;
  };
  setConceptLabIdea: React.Dispatch<React.SetStateAction<any>>;
  simulationResult: {
    tested: boolean;
    opportunityScore: number;
    marketingScore: number;
    wouldBuyPercentage: number;
    medianPrice: number;
    topConcern: string;
    consumersTested: number;
    marketingBars: { label: string; score: number }[];
    overallBars: { label: string; score: number }[];
    aiRecommendation: string;
    message: string;
  } | null;
  runConsumerTestSimulation: (customIdea?: any) => void;

  // Global Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}


// The exact 12 original ideas from the prototype
const INITIAL_IDEAS: Idea[] = [
  {
    id: '1',
    company: 'Nuvie',
    targetStartupName: 'Nuvie',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Peanut Butter Crunch Protein Bar',
    tagline: 'A medium-sweet protein bar with a peanut-butter centre and a thin layer of roasted crushed peanuts for texture.',
    desc: 'A medium-sweet protein bar with a peanut-butter centre and a thin layer of roasted crushed peanuts for texture.',
    problemStatement: 'Most gym protein bars in India are chalky, overly sweet with artificial sweeteners, or exceed student budgets.',
    proposedSolution: 'Formulate with pure roasted peanut butter, whey isolate, and natural date paste with an exterior roasted peanut crust.',
    targetAudience: 'College students, working professionals, gym-goers',
    keyBenefits: ['15g clean protein', 'Real peanut butter core', 'Sub-₹50 price point'],
    tags: ['ProteinBar', 'Snacks', 'PeanutButter', 'CleanLabel'],
    author: { id: 'u1', name: 'Aarav', username: 'aarav', avatarUrl: undefined, reputationScore: 840, badge: 'Early Innovator' },
    score: 91,
    buy: 82,
    opp: 88,
    status: 'Shortlisted',
    commentsCount: 34,
    upvotesCount: 8554,
    viewsCount: 12400,
    price: '₹45–₹55',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    validation: {
      viewsCount: 12400,
      supportersCount: 8554,
      wouldTryPercentage: 82,
      topConsumerPreferences: ['84% prefer no artificial sweeteners', '76% demand real roasted peanut texture'],
      targetPriceRange: '₹45–₹55',
      engagementRate: '14.8%',
      categoryInterestScore: 91,
    },
    startupReviewNotes: 'Formulation bench sample #3 validated. Packaging line tested with 35g wrapper.',
    testingPhaseDetails: 'Pilot batch of 200 bars tested across 3 Bengaluru colleges. 82% repeat intent.',
    shortlistPriority: 'high',
  },
  {
    id: '2',
    company: 'Go Desi',
    targetStartupName: 'Go Desi',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Aam Panna Sparkling Cooler',
    tagline: 'A light sparkling drink inspired by homemade aam panna, with roasted cumin and a less-sweet finish.',
    desc: 'A light sparkling drink inspired by homemade aam panna, with roasted cumin and a less-sweet finish.',
    problemStatement: 'Summer canned drinks in India are saturated with synthetic mango essence and extreme sugar levels.',
    proposedSolution: 'A carbonated real green-mango brew seasoned with black salt, cumin, and mint with 40% less sugar.',
    targetAudience: 'Summer travelers, college students, lunch accompaniments',
    keyBenefits: ['Natural green mango puree', 'Digestive spices', 'Crisp sparkling refreshment'],
    tags: ['AamPanna', 'RegionalDrink', 'Sparkling', 'Summer'],
    author: { id: 'u2', name: 'Ananya', username: 'ananya', avatarUrl: undefined, reputationScore: 780, badge: 'Trend Spotter' },
    score: 86,
    buy: 78,
    opp: 83,
    status: 'Testing',
    commentsCount: 29,
    upvotesCount: 8084,
    viewsCount: 9800,
    price: '₹35–₹45',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    validation: {
      viewsCount: 9800,
      supportersCount: 8084,
      wouldTryPercentage: 78,
      topConsumerPreferences: ['81% prefer light sparkling carbonation', '88% want roasted cumin notes'],
      targetPriceRange: '₹35–₹45',
      engagementRate: '12.4%',
      categoryInterestScore: 86,
    },
    startupReviewNotes: 'Formulation in R&D sensory testing. Preservative-free retort process being audited.',
    testingPhaseDetails: 'Small-batch canning trials underway.',
    shortlistPriority: 'high',
  },
  {
    id: '3',
    company: 'SoleStory',
    targetStartupName: 'SoleStory',
    category: 'Sneakers',
    cat: 'Sneakers',
    title: 'Better Everyday Sneaker Packaging',
    tagline: 'Use a cleaner, more premium-looking box and inner wrap so the sneaker feels worth its price before the customer even tries it.',
    desc: 'Use a cleaner, more premium-looking box and inner wrap so the sneaker feels worth its price before the customer even tries it.',
    problemStatement: 'Affordable sneakers (sub-₹1,600) come in crushed, flimsy cardboard boxes with cheap plastic wrap, diminishing perceived value.',
    proposedSolution: 'Rigid kraft board with pull-out drawer mechanism, debossed brand icon, and biodegradable soy-ink wrap.',
    targetAudience: 'Gen Z sneaker enthusiasts, unboxing creators',
    keyBenefits: ['Reusable storage box', 'Zero plastic waste', 'Elevated unboxing experience'],
    tags: ['Sneakers', 'Packaging', 'Unboxing', 'Sustainable'],
    author: { id: 'u3', name: 'Rohan', username: 'rohan', avatarUrl: undefined, reputationScore: 920, badge: 'Community Builder' },
    score: 89,
    buy: 77,
    opp: 85,
    status: 'Shortlisted',
    commentsCount: 31,
    upvotesCount: 8366,
    viewsCount: 11200,
    price: '₹80–₹120 packaging',
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    validation: {
      viewsCount: 11200,
      supportersCount: 8366,
      wouldTryPercentage: 77,
      topConsumerPreferences: ['91% say packaging influences brand loyalty', '86% favor drawer-style boxes'],
      targetPriceRange: '₹80–₹120 packaging',
      engagementRate: '13.1%',
      categoryInterestScore: 89,
    },
    startupReviewNotes: 'Box die-cut sample approved. Negotiating MOQ with Bengaluru corrugator.',
    shortlistPriority: 'medium',
  },
  {
    id: '4',
    company: 'Nuvie',
    targetStartupName: 'Nuvie',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Smaller 30g Protein Bar',
    tagline: 'A compact single-serving protein bar for students who want an affordable snack between classes.',
    desc: 'A compact single-serving protein bar for students who want an affordable snack between classes.',
    problemStatement: 'Standard 60g protein bars cost ₹100+ and are too heavy for an afternoon snack between college lectures.',
    proposedSolution: 'A pocket-sized 30g bar delivering 8g protein at a ₹30 price point.',
    targetAudience: 'High school & college students, quick snackers',
    keyBenefits: ['₹30 price pocket barrier', '8g protein', 'Portion controlled'],
    tags: ['MiniBar', 'PocketSnack', 'BudgetProtein'],
    author: { id: 'u4', name: 'Vikram', username: 'vikram', avatarUrl: undefined, reputationScore: 680, badge: 'Innovator' },
    score: 79,
    buy: 71,
    opp: 76,
    status: 'Prototype',
    commentsCount: 21,
    upvotesCount: 7426,
    viewsCount: 8600,
    price: '₹30–₹40',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    validation: {
      viewsCount: 8600,
      supportersCount: 7426,
      wouldTryPercentage: 71,
      topConsumerPreferences: ['74% want pocket-friendly size', '88% want ₹30 price point'],
      targetPriceRange: '₹30–₹40',
      engagementRate: '10.5%',
      categoryInterestScore: 79,
    },
    startupReviewNotes: 'Prototyping extruder die for smaller 30g slab cutting.',
    shortlistPriority: 'medium',
  },
  {
    id: '5',
    company: 'ThreadTheory',
    targetStartupName: 'ThreadTheory',
    category: 'Clothing',
    cat: 'Clothing',
    title: 'Monsoon-Friendly Overshirt',
    tagline: 'A lightweight everyday overshirt with quick-dry fabric and a simple silhouette for humid Indian cities.',
    desc: 'A lightweight everyday overshirt with quick-dry fabric and a simple silhouette for humid Indian cities.',
    problemStatement: 'Heavier cotton shirts get soggy and clingy during Mumbai/Chennai/Kolkata monsoons.',
    proposedSolution: 'Nylon-spandex mini-ripstop overshirt with breathable back vent and Teflon eco-dry coating.',
    targetAudience: 'City commuters, college riders, metro travelers',
    keyBenefits: ['Dries in 15 minutes', 'Wrinkle-resistant', 'Subtle urban styling'],
    tags: ['Apparel', 'Monsoon', 'QuickDry', 'Overshirt'],
    author: { id: 'u5', name: 'Diya', username: 'diya', avatarUrl: undefined, reputationScore: 810, badge: 'Trend Spotter' },
    score: 84,
    buy: 73,
    opp: 80,
    status: 'Shortlisted',
    commentsCount: 27,
    upvotesCount: 7896,
    viewsCount: 9400,
    price: '₹799–₹999',
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    validation: {
      viewsCount: 9400,
      supportersCount: 7896,
      wouldTryPercentage: 73,
      topConsumerPreferences: ['86% prioritize quick-drying fabric', '79% prefer dark olive & slate colors'],
      targetPriceRange: '₹799–₹999',
      engagementRate: '11.8%',
      categoryInterestScore: 84,
    },
    startupReviewNotes: 'Fabric yardage samples received from Surat mill. Water repellency test passed.',
    shortlistPriority: 'high',
  },
  {
    id: '6',
    company: 'Go Desi',
    targetStartupName: 'Go Desi',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Nimbu Pudina Electrolyte Drink',
    tagline: 'An everyday hydration drink with lemon, mint and a mild electrolyte profile for Indian summers.',
    desc: 'An everyday hydration drink with lemon, mint and a mild electrolyte profile for Indian summers.',
    problemStatement: 'Electrolyte powders are clinical and medicinal; sports drinks are artificial neon-blue concoctions.',
    proposedSolution: 'Ready-to-drink real lemon juice, crushed garden mint, Himalayan rock salt, and tender coconut water base.',
    targetAudience: 'Athletes, daily walkers, summer commuters',
    keyBenefits: ['Natural potassium & sodium', 'Crisp homemade shikanji flavor', 'Zero synthetic colors'],
    tags: ['Hydration', 'Electrolytes', 'Shikanji', 'Mint'],
    author: { id: 'u6', name: 'Priya', username: 'priya', avatarUrl: undefined, reputationScore: 760, badge: 'Innovator' },
    score: 84,
    buy: 76,
    opp: 81,
    status: 'Under Review',
    commentsCount: 37,
    upvotesCount: 7896,
    viewsCount: 10400,
    price: '₹30–₹40',
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    validation: {
      viewsCount: 10400,
      supportersCount: 7896,
      wouldTryPercentage: 76,
      topConsumerPreferences: ['83% prefer real lemon over artificial flavor', '79% want low calorie formulation'],
      targetPriceRange: '₹30–₹40',
      engagementRate: '12.9%',
      categoryInterestScore: 84,
    },
    startupReviewNotes: 'Initial review for shelf-stability of real mint extract in packaging.',
    shortlistPriority: 'medium',
  },
  {
    id: '7',
    company: 'Nuvie',
    targetStartupName: 'Nuvie',
    category: 'Packaging',
    cat: 'Packaging',
    title: 'Premium Matte Protein Bar Wrapper',
    tagline: 'A cleaner matte wrapper with stronger colour hierarchy so the product feels premium without increasing shelf price.',
    desc: 'A cleaner matte wrapper with stronger colour hierarchy so the product feels premium without increasing shelf price.',
    problemStatement: 'Shiny metallic foil wrappers look cheap and clutter nutritional highlights.',
    proposedSolution: 'Soft-touch matte cold-seal laminate with clear bold typography showing protein grams prominently.',
    targetAudience: 'Nutrition-conscious shoppers',
    keyBenefits: ['Tactile premium feel', 'High-contrast readability', '100% barrier protection'],
    tags: ['Packaging', 'Design', 'Branding', 'Matte'],
    author: { id: 'u7', name: 'Meera', username: 'meera', avatarUrl: undefined, reputationScore: 890, badge: 'Trend Spotter' },
    score: 88,
    buy: 74,
    opp: 79,
    status: 'Shortlisted',
    commentsCount: 18,
    upvotesCount: 8272,
    viewsCount: 8900,
    price: '₹2–₹4 packaging',
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    validation: {
      viewsCount: 8900,
      supportersCount: 8272,
      wouldTryPercentage: 74,
      topConsumerPreferences: ['88% rate matte packaging more premium than shiny foil'],
      targetPriceRange: '₹2–₹4 packaging',
      engagementRate: '11.2%',
      categoryInterestScore: 88,
    },
    startupReviewNotes: 'Cylinder engraving quotes received. Color proofing scheduled.',
    shortlistPriority: 'high',
  },
  {
    id: '8',
    company: 'SoleStory',
    targetStartupName: 'SoleStory',
    category: 'Sneakers',
    cat: 'Sneakers',
    title: 'Breathable College Sneaker',
    tagline: 'A lightweight mesh sneaker with better airflow and a removable insole for long college days.',
    desc: 'A lightweight mesh sneaker with better airflow and a removable insole for long college days.',
    problemStatement: 'Wearing synthetic sneakers in 35°C Indian campuses causes foot sweat and odor after 6 hours.',
    proposedSolution: 'Engineered 3D sandwich mesh upper with perforated ortholite insole and ultra-light EVA midsole.',
    targetAudience: 'University students, retail workers standing long hours',
    keyBenefits: ['Maximum breathability', 'Under 280 grams per shoe', 'Washable insole'],
    tags: ['Footwear', 'Mesh', 'College', 'Comfort'],
    author: { id: 'u8', name: 'Ishaan', username: 'ishaan', avatarUrl: undefined, reputationScore: 710, badge: 'Innovator' },
    score: 82,
    buy: 70,
    opp: 78,
    status: 'New',
    commentsCount: 23,
    upvotesCount: 7708,
    viewsCount: 8200,
    price: '₹1,299–₹1,599',
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    validation: {
      viewsCount: 8200,
      supportersCount: 7708,
      wouldTryPercentage: 70,
      topConsumerPreferences: ['89% want lightweight breathability for everyday use'],
      targetPriceRange: '₹1,299–₹1,599',
      engagementRate: '9.8%',
      categoryInterestScore: 82,
    },
  },
  {
    id: '9',
    company: 'ThreadTheory',
    targetStartupName: 'ThreadTheory',
    category: 'Clothing',
    cat: 'Clothing',
    title: 'Pocket-First College Cargo',
    tagline: 'A relaxed-fit cargo designed around practical pocket placement without looking bulky.',
    desc: 'A relaxed-fit cargo designed around practical pocket placement without looking bulky.',
    problemStatement: 'Most cargos have loose pockets that bounce phones against the knees when walking or cycling.',
    proposedSolution: 'Ergonomic side-angled thigh pocket that holds phones snug to the upper leg without swinging.',
    targetAudience: 'College students, cyclists, backpackers',
    keyBenefits: ['Secure phone lock pocket', 'Comfort stretch waistband', 'Tapered cuff'],
    tags: ['Cargos', 'FunctionalFashion', 'Pockets'],
    author: { id: 'u9', name: 'Kavya', username: 'kavya', avatarUrl: undefined, reputationScore: 730, badge: 'Innovator' },
    score: 80,
    buy: 68,
    opp: 74,
    status: 'New',
    commentsCount: 19,
    upvotesCount: 7520,
    viewsCount: 7900,
    price: '₹899–₹1,099',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    validation: {
      viewsCount: 7900,
      supportersCount: 7520,
      wouldTryPercentage: 68,
      topConsumerPreferences: ['84% demand dedicated phone anti-bounce pocket'],
      targetPriceRange: '₹899–₹1,099',
      engagementRate: '9.2%',
      categoryInterestScore: 80,
    },
  },
  {
    id: '10',
    company: 'AuraNest',
    targetStartupName: 'AuraNest',
    category: 'Fragrances',
    cat: 'Fragrances',
    title: 'Pocket Roll-On: Chai & Cedar',
    tagline: 'A compact roll-on fragrance with warm chai notes and cedar designed for everyday college use.',
    desc: 'A compact roll-on fragrance with warm chai notes and cedar designed for everyday college use.',
    problemStatement: 'Glass perfume bottles break in backpacks; spray colognes overpower small classroom spaces.',
    proposedSolution: 'A 10ml leak-proof metal rollerball with concentrated fragrance oil featuring ginger, cardamom, and virginian cedar.',
    targetAudience: 'College commuters, young professionals',
    keyBenefits: ['Lasts 8+ hours', 'Spill-proof pocket size', 'Unisex warm spicy fragrance'],
    tags: ['Fragrance', 'RollOn', 'PocketPerfume', 'Chai'],
    author: { id: 'u10', name: 'Neha', username: 'neha', avatarUrl: undefined, reputationScore: 870, badge: 'Early Innovator' },
    score: 85,
    buy: 75,
    opp: 82,
    status: 'Shortlisted',
    commentsCount: 28,
    upvotesCount: 7990,
    viewsCount: 9100,
    price: '₹249–₹299',
    createdAt: new Date(Date.now() - 86400000 * 11).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    validation: {
      viewsCount: 9100,
      supportersCount: 7990,
      wouldTryPercentage: 75,
      topConsumerPreferences: ['87% prefer non-alcoholic oil base for skin friendliness'],
      targetPriceRange: '₹249–₹299',
      engagementRate: '12.1%',
      categoryInterestScore: 85,
    },
    startupReviewNotes: 'Batch sample approved. Rollerball leak test under 40°C heat passed.',
    shortlistPriority: 'high',
  },
  {
    id: '11',
    company: 'Giftly',
    targetStartupName: 'Giftly',
    category: 'Gifting',
    cat: 'Gifting',
    title: 'Build-Your-Own Mini Hamper',
    tagline: 'Let customers choose three small items and a message card while keeping the final hamper affordable.',
    desc: 'Let customers choose three small items and a message card while keeping the final hamper affordable.',
    problemStatement: 'Standard gift hampers cost ₹1,500+ and contain unwanted filler items.',
    proposedSolution: 'A 3-step configurator choosing 1 snack jar, 1 self-care mini item, and 1 keepsake with handwritten calligraphy note.',
    targetAudience: 'Friends gifting for birthdays, exams, anniversaries',
    keyBenefits: ['100% personalized', 'Sub-₹500 transparent pricing', 'Includes gift box & note'],
    tags: ['Gifting', 'Personalized', 'Hamper', 'BudgetGifts'],
    author: { id: 'u11', name: 'Simran', username: 'simran', avatarUrl: undefined, reputationScore: 820, badge: 'Community Builder' },
    score: 83,
    buy: 72,
    opp: 77,
    status: 'Under Review',
    commentsCount: 22,
    upvotesCount: 7802,
    viewsCount: 8800,
    price: '₹399–₹499',
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 11).toISOString(),
    validation: {
      viewsCount: 8800,
      supportersCount: 7802,
      wouldTryPercentage: 72,
      topConsumerPreferences: ['93% want full control over items in the box'],
      targetPriceRange: '₹399–₹499',
      engagementRate: '10.8%',
      categoryInterestScore: 83,
    },
    startupReviewNotes: 'Reviewing box packaging dimensions to fit all item combinations.',
    shortlistPriority: 'medium',
  },
  {
    id: '12',
    company: 'UrbanCarry',
    targetStartupName: 'UrbanCarry',
    category: 'Accessories',
    cat: 'Accessories',
    title: 'Slim Everyday Laptop Tote',
    tagline: 'A structured tote with hidden bottle and charger compartments for students and early-career commuters.',
    desc: 'A structured tote with hidden bottle and charger compartments for students and early-career commuters.',
    problemStatement: 'Backpacks look too casual for client offices; conventional totes lack structure and laptop padding.',
    proposedSolution: 'A water-resistant structured canvas tote with padded 14-inch sleeve, key leash, and internal bottle holster.',
    targetAudience: 'Designers, interns, college seniors',
    keyBenefits: ['Stands upright on floors', 'Dedicated umbrella/bottle slot', 'Wide non-slip shoulder strap'],
    tags: ['Tote', 'LaptopBag', 'Commuter', 'College'],
    author: { id: 'u12', name: 'Dev', username: 'dev', avatarUrl: undefined, reputationScore: 750, badge: 'Innovator' },
    score: 78,
    buy: 66,
    opp: 73,
    status: 'New',
    commentsCount: 16,
    upvotesCount: 7332,
    viewsCount: 7600,
    price: '₹899–₹1,199',
    createdAt: new Date(Date.now() - 86400000 * 13).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    validation: {
      viewsCount: 7600,
      supportersCount: 7332,
      wouldTryPercentage: 66,
      topConsumerPreferences: ['82% want upright structured base and padded laptop section'],
      targetPriceRange: '₹899–₹1,199',
      engagementRate: '8.9%',
      categoryInterestScore: 78,
    },
  },
  {
    id: '13',
    company: 'Nuvie',
    targetStartupName: 'Nuvie',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Masala Roasted Peanut Protein Trail Mix',
    tagline: 'A savory high-protein blend of spiced peanuts, roasted chana, and chia seeds for evening desk snacking.',
    desc: 'A savory high-protein blend of spiced peanuts, roasted chana, and chia seeds for evening desk snacking.',
    problemStatement: 'Most high-protein snacks are sweet; evening office workers crave traditional salty masala snacks without palm oil.',
    proposedSolution: 'Dry-roasted legumes seasoned with chaat masala, cold-pressed mustard oil, and whey crisps.',
    targetAudience: 'Office professionals, evening snackers, tea drinkers',
    keyBenefits: ['12g protein per 40g pouch', 'Zero palm oil', 'Authentic Indian spice blend'],
    tags: ['TrailMix', 'Savory', 'HighProtein', 'Chaat'],
    author: { id: 'u13', name: 'Kabir', username: 'kabir', avatarUrl: undefined, reputationScore: 790, badge: 'Innovator' },
    score: 82,
    buy: 77,
    opp: 80,
    status: 'New',
    commentsCount: 19,
    upvotesCount: 7610,
    viewsCount: 8400,
    price: '₹35–₹45',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    validation: {
      viewsCount: 8400,
      supportersCount: 7610,
      wouldTryPercentage: 77,
      topConsumerPreferences: ['89% prefer savory over sweet protein snacks'],
      targetPriceRange: '₹35–₹45',
      engagementRate: '11.5%',
      categoryInterestScore: 82,
    },
  },
  {
    id: '14',
    company: 'Nuvie',
    targetStartupName: 'Nuvie',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Cold-Brew Coffee Whey Isolate Cooler',
    tagline: 'Ready-to-drink Arabica cold-brew coffee infused with 15g clear whey isolate and no added sugar.',
    desc: 'Ready-to-drink Arabica cold-brew coffee infused with 15g clear whey isolate and no added sugar.',
    problemStatement: 'Gym-goers need both caffeine and protein before morning workouts but hate drinking thick milkshakes.',
    proposedSolution: 'Light, translucent coffee beverage with microfiltered whey protein isolate, 120mg natural caffeine, and stevia.',
    targetAudience: 'Morning gym-goers, remote tech workers, runners',
    keyBenefits: ['120mg natural caffeine', '15g clear whey', '0g sugar'],
    tags: ['ColdBrew', 'CoffeeProtein', 'PreWorkout', 'ClearWhey'],
    author: { id: 'u14', name: 'Zoya', username: 'zoya', avatarUrl: undefined, reputationScore: 830, badge: 'Early Innovator' },
    score: 87,
    buy: 79,
    opp: 84,
    status: 'Testing',
    commentsCount: 25,
    upvotesCount: 8150,
    viewsCount: 9900,
    price: '₹55–₹65',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    validation: {
      viewsCount: 9900,
      supportersCount: 8150,
      wouldTryPercentage: 79,
      topConsumerPreferences: ['85% prefer clear texture over milky shake'],
      targetPriceRange: '₹55–₹65',
      engagementRate: '13.2%',
      categoryInterestScore: 87,
    },
    testingPhaseDetails: 'Sensory test with 150 Bangalore gym members: 84% repeat intent.',
  },
  {
    id: '15',
    company: 'Nuvie',
    targetStartupName: 'Nuvie',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Almond Cocoa Crunchy Slab',
    tagline: 'Dark cocoa slab with California almonds and 16g protein, launched commercially in retail.',
    desc: 'Dark cocoa slab with California almonds and 16g protein, launched commercially in retail.',
    problemStatement: 'Consumers want real dark chocolate taste without sugar spikes.',
    proposedSolution: 'Single-origin 70% dark cocoa coating with whole roasted almonds and milk protein crispies.',
    targetAudience: 'Fitness enthusiasts, clean-eaters',
    keyBenefits: ['16g protein', '70% dark cocoa', 'Sub-₹50 price'],
    tags: ['AlmondCocoa', 'DarkChocolate', 'ProteinSlab'],
    author: { id: 'u15', name: 'Karan', username: 'karan', avatarUrl: undefined, reputationScore: 910, badge: 'Community Builder' },
    score: 93,
    buy: 85,
    opp: 89,
    status: 'Launched',
    commentsCount: 42,
    upvotesCount: 9200,
    viewsCount: 14000,
    price: '₹49',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    validation: {
      viewsCount: 14000,
      supportersCount: 9200,
      wouldTryPercentage: 85,
      topConsumerPreferences: ['92% rated taste superior to commercial chocolate bars'],
      targetPriceRange: '₹49',
      engagementRate: '15.6%',
      categoryInterestScore: 93,
    },
  },
  {
    id: '16',
    company: 'Nuvie',
    targetStartupName: 'Nuvie',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Synthetic Sucralose Sweetened Bar',
    tagline: 'High-sweetness budget bar using artificial sucralose.',
    desc: 'High-sweetness budget bar using artificial sucralose.',
    problemStatement: 'Evaluating low-cost artificial sweetener formulations.',
    proposedSolution: 'Standard formulation using bulk sucralose and maltodextrin.',
    targetAudience: 'Budget consumers',
    keyBenefits: ['Low production cost'],
    tags: ['Sucralose', 'Budget'],
    author: { id: 'u16', name: 'Rahul', username: 'rahul', avatarUrl: undefined, reputationScore: 540 },
    score: 42,
    buy: 32,
    opp: 40,
    status: 'Rejected',
    commentsCount: 14,
    upvotesCount: 1240,
    viewsCount: 4100,
    price: '₹35',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(),
    validation: {
      viewsCount: 4100,
      supportersCount: 1240,
      wouldTryPercentage: 32,
      topConsumerPreferences: ['78% strongly reject artificial aftertaste in consumer panel'],
      targetPriceRange: '₹35',
      engagementRate: '5.2%',
      categoryInterestScore: 42,
    },
  },
  {
    id: '17',
    company: 'Go Desi',
    targetStartupName: 'Go Desi',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Kaccha Aam Spicy Chikki Bites',
    tagline: 'Traditional jaggery peanut chikki infused with tangy raw mango powder and black salt.',
    desc: 'Traditional jaggery peanut chikki infused with tangy raw mango powder and black salt.',
    problemStatement: 'Traditional chikkis are monotonously sweet; young consumers want punchy sweet-and-sour flavor contrast.',
    proposedSolution: 'Individually wrapped bite-sized chikkis combining roasted groundnuts, organic jaggery, amchur, and rock salt.',
    targetAudience: 'School/college snackers, nostalgic millennial snackers',
    keyBenefits: ['Natural jaggery energy', 'Piquant chatpata tang', 'Pocket-friendly ₹20 pack'],
    tags: ['Chikki', 'DesiSnacks', 'RawMango', 'Chatpata'],
    author: { id: 'u17', name: 'Tanvi', username: 'tanvi', avatarUrl: undefined, reputationScore: 780, badge: 'Trend Spotter' },
    score: 85,
    buy: 80,
    opp: 82,
    status: 'New',
    commentsCount: 24,
    upvotesCount: 7920,
    viewsCount: 9100,
    price: '₹20–₹30',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    validation: {
      viewsCount: 9100,
      supportersCount: 7920,
      wouldTryPercentage: 80,
      topConsumerPreferences: ['87% love the tangy-sweet flavor combination'],
      targetPriceRange: '₹20–₹30',
      engagementRate: '12.6%',
      categoryInterestScore: 85,
    },
  },
  {
    id: '18',
    company: 'Go Desi',
    targetStartupName: 'Go Desi',
    category: 'Food & Beverage',
    cat: 'Food & Beverage',
    title: 'Kokum Jeera Digestive Popz',
    tagline: 'Lollipop on a wooden stick infused with Konkan kokum fruit pulp, roasted jeera, and jaggery.',
    desc: 'Lollipop on a wooden stick infused with Konkan kokum fruit pulp, roasted jeera, and jaggery.',
    problemStatement: 'Commercial hard candies are pure corn syrup and artificial food colors.',
    proposedSolution: 'All-natural kokum lollipop with roasted cumin, mint extract, and jaggery.',
    targetAudience: 'Post-meal digestives, daily treats for all ages',
    keyBenefits: ['Natural digestive aid', '100% natural fruit pulp', 'Zero refined sugar'],
    tags: ['Kokum', 'Digestive', 'Popz', 'NaturalCandy'],
    author: { id: 'u18', name: 'Manish', username: 'manish', avatarUrl: undefined, reputationScore: 860, badge: 'Early Innovator' },
    score: 90,
    buy: 84,
    opp: 88,
    status: 'Shortlisted',
    commentsCount: 31,
    upvotesCount: 8420,
    viewsCount: 11400,
    price: '₹15–₹25',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    validation: {
      viewsCount: 11400,
      supportersCount: 8420,
      wouldTryPercentage: 84,
      topConsumerPreferences: ['91% endorse kokum as traditional cooling and digestive ingredient'],
      targetPriceRange: '₹15–₹25',
      engagementRate: '13.8%',
      categoryInterestScore: 90,
    },
  },
];

// The exact 5 challenges from the prototype, enriched with detailed requirements & rewards
const INITIAL_CHALLENGES: Challenge[] = [
  {
    id: 'c-1',
    company: 'Go Desi',
    cat: 'Food & Beverage',
    title: 'Create the Next Regional Summer Drink',
    desc: 'Suggest a refreshing Indian regional flavour that feels familiar, affordable and relevant to college-age consumers.',
    price: '₹30–₹45 per unit',
    people: '1,284',
    ideas: '312',
    left: '14 days',
    reward: 'Discount coupons + summer drinks hamper',
    problemSolved: 'Summer packaged drinks in India are heavily dominated by synthetic colas or hyper-sweetened pulps with artificial coloring. Consumers want natural, nostalgic regional Indian refreshments with authentic spices.',
    whyInterested: 'Go Desi is scaling its beverage lineup to replicate the runaway success of Desi Popz. We want consumer-driven recipes that evoke Indian childhood memories with zero artificial preservatives.',
    targetAudience: 'College students, daily commuters, and young professionals aged 18–32 seeking refreshing non-sugary beverages.',
    expectedUseCase: 'Afternoon refreshment, college canteen snack pairing, summer thirst quencher during commute.',
    requirements: [
      'Shelf-stable formulation feasible for ambient distribution',
      'Use of indigenous regional ingredients (e.g. Kokum, Raw Mango, Jamun, Jeera)',
      'Sub-₹45 retail price point for a 200ml–250ml single-serve package',
      'At least 35% less sugar than conventional commercial sodas',
    ],
    perks: [
      'Featured co-creator credit on commercial product bottles',
      'Exclusive Go Desi Mega Hamper with unreleased pilot flavours',
      'Direct 1-on-1 virtual mentoring session with Go Desi R&D leadership',
      '₹10,000 innovation grant upon product selection',
    ],
    winnerRewards: {
      hamper: 'Go Desi Ultimate Regional Treats Hamper (Valued at ₹2,500)',
      cashReward: '₹10,000 Product Innovation Cash Grant',
      earlyAccess: 'First batch sample crate shipped before retail release',
      collaboration: 'Invited to participate in pilot taste test panel in Bengaluru',
    },
    criteria: [
      'Practical product idea for Indian consumers',
      'Suggested price that can work at startup scale',
      'Regional flavour / cultural relevance is a plus',
      'Clear reason customers would choose it',
    ],
  },
  {
    id: 'c-2',
    company: 'Nuvie',
    cat: 'Food & Beverage',
    title: 'Reinvent the Everyday Protein Snack',
    desc: 'Design a protein snack concept that fits Indian taste preferences, student budgets and an easy on-the-go format.',
    price: '₹40–₹60 per pack',
    people: '936',
    ideas: '184',
    left: '21 days',
    reward: 'Protein hamper + 20% product discount',
    problemSolved: 'Most protein snacks in the Indian market cost ₹100–₹180 per bar, making daily protein supplementation unaffordable for students and young workers. Existing options also suffer from dry, chalky textures.',
    whyInterested: 'Nuvie aims to democratize clean daily protein across India by offering tasty, authentic snack formats under ₹60.',
    targetAudience: 'University students, budget-conscious fitness enthusiasts, and office workers needing quick 4 PM sustenance.',
    expectedUseCase: 'Post-workout fuel, between-lecture hunger fix, office desk snack.',
    requirements: [
      'Minimum 10g–15g clean protein per serving',
      'No artificial sugar alcohols (maltitol/sucralose) or chemical preservatives',
      'Target price between ₹40 and ₹60 per single unit',
      'Moist or crunchy texture suited for room-temperature storage',
    ],
    perks: [
      '3-month supply of Nuvie protein products',
      'Co-formulator credit on commercial packaging',
      '₹15,000 cash prize for the winning formulation',
      'Invitation to join Nuvie Customer Advisory Circle',
    ],
    winnerRewards: {
      hamper: 'Quarterly Nuvie Protein Subscription Box (Valued at ₹4,500)',
      cashReward: '₹15,000 Innovation Winner Cash Grant',
      earlyAccess: 'VIP access to all upcoming flavor drops for 12 months',
      collaboration: 'Direct input on final batch recipe and label design',
    },
    criteria: [
      'At least 10g protein per serving',
      'Clean ingredients without excessive artificial gums',
      'Target price between ₹40–₹60',
      'Delicious taste matching Indian snack culture',
    ],
  },
  {
    id: 'c-3',
    company: 'SoleStory',
    cat: 'Sneakers',
    title: 'Design a Sneaker That Feels Premium at ₹1,500',
    desc: 'Help us improve comfort, styling or packaging without pushing the everyday sneaker beyond a student-friendly price.',
    price: '₹1,299–₹1,599',
    people: '742',
    ideas: '126',
    left: '17 days',
    reward: 'Sneaker discount + early-access pair',
    problemSolved: 'Sneakers under ₹1,500 in India typically suffer from hard plastic soles, poor arch support, and uninspired clone aesthetics. Students want high-comfort, durable sneakers with sleek minimal silhouettes.',
    whyInterested: 'SoleStory is on a mission to bring designer-grade everyday footwear to university campuses at accessible price points.',
    targetAudience: 'College students and young city commuters walking 5,000–10,000 steps daily.',
    expectedUseCase: 'Daily campus walking, casual outings, library study sessions.',
    requirements: [
      'High-density memory foam or dual-density EVA insole design',
      'Breathable canvas or recycled knit upper suitable for Indian heat',
      'Total manufacturing cost allowing an MSRP below ₹1,600',
      'Versatile colorways (monochrome or subtle contrast)',
    ],
    perks: [
      'Free pair of the custom-manufactured sneaker',
      'Custom laser engraving of the winner’s initials on the tongue',
      '₹12,000 design bounty',
    ],
    winnerRewards: {
      hamper: 'Two pairs of SoleStory custom sneakers + Sneaker Care Kit',
      cashReward: '₹12,000 Footwear Design Bounty',
      earlyAccess: 'Prototype tester pair shipped 60 days before launch',
      collaboration: 'Feature spotlight on SoleStory Instagram & website',
    },
    criteria: [
      'Focus on insole comfort and breathable materials',
      'Trendy everyday silhouette for campus wear',
      'Design feasible under ₹1,600 retail price',
    ],
  },
  {
    id: 'c-4',
    company: 'ThreadTheory',
    cat: 'Clothing',
    title: 'Build a Better College Essential',
    desc: 'Suggest a practical everyday clothing piece for Indian college life with comfortable fabric, useful details and easy styling.',
    price: '₹699–₹999',
    people: '518',
    ideas: '84',
    left: '20 days',
    reward: '20% discount + early sample access',
    problemSolved: 'Standard college wear lacks utility for Indian weather (high humidity, sudden rains) and rarely has secure pockets for phones and transit cards.',
    whyInterested: 'ThreadTheory builds thoughtful, pocket-first garments tailored for Indian weather and campus mobility.',
    targetAudience: 'Gen-Z university students who commute via metro, bus, or two-wheelers.',
    expectedUseCase: 'Campus lectures, rainy commute, casual hangouts.',
    requirements: [
      'Quick-dry or moisture-wicking natural blend fabric',
      'Hidden or reinforced pockets for metro pass and phone',
      'Under ₹999 price tag at retail',
    ],
    perks: [
      'ThreadTheory wardrobe bundle (3 apparel essentials)',
      'Product co-creator badge and credit',
      '₹10,000 cash grant',
    ],
    winnerRewards: {
      hamper: 'ThreadTheory Wardrobe Capsule (Valued at ₹3,500)',
      cashReward: '₹10,000 Innovation Grant',
      earlyAccess: 'First production piece from sizing run',
      collaboration: 'Style consultation with head apparel designer',
    },
    criteria: [
      'Durable, machine-washable cotton or eco-blends',
      'Smart pocket or ventilation features',
      'Under ₹999 price tag',
    ],
  },
  {
    id: 'c-5',
    company: 'AuraNest',
    cat: 'Fragrances',
    title: 'Find the Next Everyday Indian Fragrance',
    desc: 'Suggest a wearable fragrance direction that feels fresh, memorable and affordable for everyday use.',
    price: '₹249–₹399',
    people: '463',
    ideas: '71',
    left: '12 days',
    reward: 'Fragrance discovery set + discount',
    problemSolved: 'Affordable perfumes in India smell harsh or fade within 30 minutes, while luxury designer scents cost thousands.',
    whyInterested: 'AuraNest creates artisanal pocket roll-ons inspired by Indian botanicals that last all day.',
    targetAudience: 'Young adults wanting a distinct, comforting personal scent for college and work.',
    expectedUseCase: 'Daily freshening, pulse-point roll-on before outings.',
    requirements: [
      'Long-lasting base notes (vetiver, cedar, amber, vanilla)',
      'Sub-₹399 retail price for 10ml roll-on',
      'Non-greasy, skin-safe organic carrier oil',
    ],
    perks: [
      'AuraNest complete perfume collection',
      'Scent naming privilege on retail bottle',
      '₹8,000 cash prize',
    ],
    winnerRewards: {
      hamper: 'AuraNest Complete Artisan Fragrance Collection',
      cashReward: '₹8,000 Olfactory Innovation Bounty',
      earlyAccess: 'Personalized batch bottle with customized label',
      collaboration: 'Co-formulation session with master perfumer',
    },
    criteria: [
      'Alcohol-free or low-alcohol long-lasting formulation',
      'Unisex or versatile everyday notes',
      'Sub-₹399 affordable pricing',
    ],
  },
];

const INITIAL_CLUSTERS: AICluster[] = [
  { id: 'cl-1', title: 'Peanut + chocolate textures', interactionsCount: '1,184', statusTag: 'High validation', category: 'Food & Beverage' },
  { id: 'cl-2', title: 'Affordable mini portions', interactionsCount: '936', statusTag: 'Rising', category: 'Food & Beverage' },
  { id: 'cl-3', title: 'Less-sweet Indian flavours', interactionsCount: '812', statusTag: 'Emerging', category: 'Food & Beverage' },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Consumer session (Generic fallback without hardcoded personal info)
  const [consumerUser, setConsumerUser] = useState<ConsumerProfile | null>(() => {
    try {
      const saved = localStorage.getItem('ideabridge_consumer_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      id: 'usr-innovator',
      email: 'innovator@ideabridge.io',
      name: 'Community Innovator',
      username: 'innovator',
      reputationScore: 842,
      submittedIdeasCount: 12,
      upvotedIdeasCount: 1284,
      badges: ['Trend Spotter', 'Early Innovator', 'Community Builder'],
      rewardsEarned: [
        { id: 'r1', title: 'Nuvie Summer Taste Kit', fromStartup: 'Nuvie', date: 'Yesterday', rewardType: 'Product Hamper' },
        { id: 'r2', title: 'Go Desi 25% Founders Voucher', fromStartup: 'Go Desi', date: '3 days ago', rewardType: 'Discount Voucher' },
      ],
      createdAt: '2026-08-01',
    };
  });

  // Consumer Auth Modal State
  const [isConsumerAuthModalOpen, setIsConsumerAuthModalOpen] = useState<boolean>(false);
  const openConsumerAuthModal = () => setIsConsumerAuthModalOpen(true);
  const closeConsumerAuthModal = () => setIsConsumerAuthModalOpen(false);

  // Startup session (Default startup user for Nuvie)
  const [startupUser, setStartupUser] = useState<StartupRepresentative | null>(() => {
    try {
      const saved = localStorage.getItem('ideabridge_startup_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      id: 'rep-nuvie',
      workEmail: 'founder@drinknuvie.com',
      name: 'Nuvie Innovation Team',
      title: 'Head of Product & R&D',
      startupId: 'startup-nuvie',
      startupName: 'Nuvie',
      startupCategory: 'Food & Beverage',
      isVerified: true,
      createdAt: '2026-07-15',
    };
  });

  // Theme, Avatar & Global Search Preferences
  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
    return localStorage.getItem('ideabridge_avatar') || '🦊';
  });

  // Default theme is ALWAYS LIGHT. Dark mode only activates if user explicitly chose it.
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('ideabridge_theme');
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  const [globalConsumerSearch, setGlobalConsumerSearch] = useState<string>('');

  // Synchronize Dark Theme class and localStorage immediately
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('ideabridge_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('ideabridge_theme', 'light');
    }
  }, [isDarkMode]);

  // Synchronize Avatar to localStorage
  useEffect(() => {
    if (selectedAvatar) {
      localStorage.setItem('ideabridge_avatar', selectedAvatar);
    }
  }, [selectedAvatar]);

  // Synchronize Consumer session to localStorage
  useEffect(() => {
    if (consumerUser) {
      localStorage.setItem('ideabridge_consumer_user', JSON.stringify(consumerUser));
    } else {
      localStorage.removeItem('ideabridge_consumer_user');
    }
  }, [consumerUser]);

  // Synchronize Startup session to localStorage
  useEffect(() => {
    if (startupUser) {
      localStorage.setItem('ideabridge_startup_user', JSON.stringify(startupUser));
    } else {
      localStorage.removeItem('ideabridge_startup_user');
    }
  }, [startupUser]);

  // Startups state - Authenticated startup user is isolated to their own company
  const [startups] = useState<Startup[]>(INITIAL_STARTUPS);
  const [selectedStartupId, setSelectedStartupId] = useState<string>('startup-nuvie');

  const selectedStartup = useMemo(() => {
    if (startupUser && startupUser.startupName) {
      const match = startups.find(
        (s) =>
          s.id === startupUser.startupId ||
          s.name.toLowerCase() === startupUser.startupName.toLowerCase()
      );
      if (match) return match;
    }
    return startups.find((s) => s.id === selectedStartupId) || startups[0];
  }, [startupUser, selectedStartupId, startups]);

  // Startup dynamic contextual data
  const activeImplementedFinancials = selectedStartup.implementedFinancials || [];
  const activeScoutingMandate = selectedStartup.scoutingMandate || {
    whatWeAreLookingFor: [
      'Category-defining consumer products',
      'Affordable accessible pricing',
      'Clean sustainable packaging',
    ],
    rewardsAndPerks: [
      'Founder review session',
      'Curated startup hamper',
      'Innovation bounty grant',
    ],
    targetAudience: 'Everyday consumers',
    priceRange: '₹40–₹100',
    validationThreshold: '>75% purchase intent & >500 validations',
    pipelineFocus: 'Consumer innovation',
  };
  const activeEmergingTrends = selectedStartup.emergingTrends || [];
  const activeAnalytics: StartupAnalytics = selectedStartup.analytics || {
    weeklyDemand: [
      { week: 'W1', validations: 320, heightPct: '32%' },
      { week: 'W2', validations: 540, heightPct: '54%' },
      { week: 'W3', validations: 780, heightPct: '78%' },
      { week: 'W4', validations: 1120, heightPct: '92%' },
      { week: 'W5', validations: 1450, heightPct: '96%' },
      { week: 'W6', validations: 1840, heightPct: '100%' },
    ],
    demographics: [
      { group: '18–24 College', pct: 54, count: 6696, color: '#4f46e5' },
      { group: '25–34 Young Pros', pct: 32, count: 3968, color: '#06b6d4' },
      { group: '35–44 Urban Active', pct: 10, count: 1240, color: '#10b981' },
      { group: '45+ Mature', pct: 4, count: 496, color: '#f59e0b' },
    ],
    priceSensitivity: [
      { price: '₹35–₹45', acceptancePct: 88 },
      { price: '₹46–₹55', acceptancePct: 76 },
      { price: '₹56–₹70', acceptancePct: 42 },
      { price: '> ₹70', acceptancePct: 18 },
    ],
    productAreaDemand: [
      { area: 'High-Protein Snacking', count: 1420, pct: 44 },
      { area: 'Functional Hydration', count: 980, pct: 31 },
      { area: 'Guilt-free Sweets', count: 780, pct: 25 },
    ],
  };

  // Ideas & Drafts State
  const [ideas, setIdeas] = useState<Idea[]>(() => {
    try {
      const saved = localStorage.getItem('ideabridge_ideas');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_IDEAS;
  });
  const [draftIdeas, setDraftIdeas] = useState<Idea[]>(() => {
    try {
      const saved = localStorage.getItem('ideabridge_draft_ideas');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_DRAFT_IDEAS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('ideabridge_ideas', JSON.stringify(ideas));
    } catch {
      // ignore
    }
  }, [ideas]);

  useEffect(() => {
    try {
      localStorage.setItem('ideabridge_draft_ideas', JSON.stringify(draftIdeas));
    } catch {
      // ignore
    }
  }, [draftIdeas]);

  const [comments, setComments] = useState<Record<string, IdeaComment[]>>({
    '1': [
      {
        id: 'c-101',
        ideaId: '1',
        author: { id: 'u-comm', name: 'Pooja V.', username: 'pooja', reputationScore: 480 },
        content: "The flavour + texture combination feels easy to understand. I'd buy it at ₹49.",
        createdAt: '1 day ago',
        upvotes: 8,
      },
      {
        id: 'c-102',
        ideaId: '1',
        author: { id: 'u-comm-2', name: 'Kunal M.', username: 'kunal', reputationScore: 610 },
        content: 'Packaging should clearly show protein per serving in bold on the front.',
        createdAt: '18 hours ago',
        upvotes: 5,
      },
    ],
  });

  // Challenges state
  const [challenges, setChallenges] = useState<Challenge[]>(INITIAL_CHALLENGES);

  // Concept Lab state
  const [conceptLabIdea, setConceptLabIdea] = useState({
    name: 'Peanut Butter Crunch Protein Bar',
    packageType: '35g matte wrapper',
    weightVolume: '35g',
    targetAge: '18–30',
    sellingPrice: 49,
    unitCost: 21,
    marketingUnit: 4,
    distributionUnit: 5,
    expectedSales: 10000,
  });

  const [simulationResult, setSimulationResult] = useState<{
    tested: boolean;
    opportunityScore: number;
    marketingScore: number;
    wouldBuyPercentage: number;
    medianPrice: number;
    topConcern: string;
    consumersTested: number;
    marketingBars: { label: string; score: number }[];
    overallBars: { label: string; score: number }[];
    aiRecommendation: string;
    message: string;
  } | null>(null);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark');
      }
      showToast(next ? 'Dark mode enabled' : 'Light mode enabled');
      return next;
    });
  };

  const logout = () => {
    localStorage.removeItem('ideabridge_consumer_user');
    localStorage.removeItem('ideabridge_startup_user');
    setConsumerUser(null);
    setStartupUser(null);
    showToast('Logged out successfully');
  };

  // Exact +1 / -1 Toggle for Idea Validation
  const upvoteIdea = (ideaId: string): boolean => {
    let isNowUpvoted = false;
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const currentlyUpvoted = !!idea.hasUpvoted;
          isNowUpvoted = !currentlyUpvoted;
          const newUpvotes = currentlyUpvoted ? Math.max(0, idea.upvotesCount - 1) : idea.upvotesCount + 1;
          const scoreDelta = currentlyUpvoted ? -1 : 1;
          const newScore = Math.max(1, Math.min(99, idea.score + scoreDelta));
          return {
            ...idea,
            hasUpvoted: isNowUpvoted,
            upvotesCount: newUpvotes,
            score: newScore,
            validation: {
              ...idea.validation,
              supportersCount: Math.max(0, idea.validation.supportersCount + scoreDelta),
            },
          };
        }
        return idea;
      })
    );

    if (isNowUpvoted) {
      showToast('Validation recorded (+1)');
    } else {
      showToast('Validation removed (-1)');
    }
    return isNowUpvoted;
  };

  // Submit new idea
  const submitIdea = (ideaData: {
    title: string;
    company: string;
    cat: string;
    price: string;
    desc: string;
    why: string;
  }): Idea => {
    const authorName = consumerUser ? consumerUser.name : 'Community Innovator';
    const authorAvatar = selectedAvatar;

    const newIdea: Idea = {
      id: String(Date.now()),
      title: ideaData.title || 'New customer concept',
      company: ideaData.company,
      targetStartupName: ideaData.company,
      category: ideaData.cat,
      cat: ideaData.cat,
      tagline: ideaData.desc || 'Customer-submitted concept awaiting community validation.',
      desc: ideaData.desc || 'Customer-submitted concept awaiting community validation.',
      problemStatement: ideaData.why || 'Customer problem identified by consumer co-creation.',
      proposedSolution: ideaData.desc || 'New product formulation and packaging proposal.',
      targetAudience: 'Everyday consumers',
      keyBenefits: ['Fresh customer concept', 'Target price aligned'],
      tags: [ideaData.cat.replace(/\s+/g, ''), ideaData.company],
      author: {
        id: consumerUser ? consumerUser.id : 'usr-innovator',
        name: authorName,
        username: authorName.toLowerCase().replace(/\s+/g, ''),
        avatarUrl: authorAvatar,
        reputationScore: (consumerUser?.reputationScore || 842) + 25,
        badge: 'Innovator',
      },
      score: 50,
      buy: 60,
      opp: 50,
      status: 'New',
      commentsCount: 0,
      upvotesCount: 1,
      viewsCount: 15,
      price: ideaData.price || 'To be validated',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      hasUpvoted: true,
      validation: {
        viewsCount: 15,
        supportersCount: 1,
        wouldTryPercentage: 70,
        topConsumerPreferences: ['Community submission in early validation phase'],
        targetPriceRange: ideaData.price || 'To be validated',
        engagementRate: '9.5%',
        categoryInterestScore: 65,
      },
    };

    setIdeas((prev) => [newIdea, ...prev]);

    if (consumerUser) {
      setConsumerUser({
        ...consumerUser,
        submittedIdeasCount: consumerUser.submittedIdeasCount + 1,
        reputationScore: consumerUser.reputationScore + 25,
      });
    }

    showToast('Idea submitted — AI clustering started');
    return newIdea;
  };

  // Submit Draft Idea to Live Community
  const submitDraftIdea = (draftId: string) => {
    const draft = draftIdeas.find((d) => d.id === draftId);
    if (!draft) return;

    const publishedIdea: Idea = {
      ...draft,
      id: String(Date.now()),
      status: 'New',
      score: 62,
      buy: 74,
      opp: 68,
      commentsCount: 0,
      upvotesCount: 1,
      hasUpvoted: true,
      viewsCount: 12,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      validation: {
        ...draft.validation,
        viewsCount: 12,
        supportersCount: 1,
        wouldTryPercentage: 74,
        engagementRate: '8.3%',
        categoryInterestScore: 62,
      },
    };

    setIdeas((prev) => [publishedIdea, ...prev]);
    setDraftIdeas((prev) => prev.filter((d) => d.id !== draftId));
    if (consumerUser) {
      setConsumerUser({
        ...consumerUser,
        submittedIdeasCount: consumerUser.submittedIdeasCount + 1,
        reputationScore: consumerUser.reputationScore + 25,
      });
    }
    showToast(`Draft "${draft.title}" submitted successfully!`);
  };

  // Update Draft Idea
  const updateDraftIdea = (updated: Idea) => {
    setDraftIdeas((prev) => prev.map((d) => (d.id === updated.id ? updated : d)));
    showToast('Draft saved');
  };

  // Add Comment
  const addComment = (ideaId: string, content: string, isStartupFeedback = false) => {
    const authorName = isStartupFeedback
      ? `${selectedStartup.name} R&D Team`
      : consumerUser ? consumerUser.name : 'Community Member';

    const newComment: IdeaComment = {
      id: `comment-${Date.now()}`,
      ideaId,
      author: {
        id: `usr-${Date.now()}`,
        name: authorName,
        username: authorName.toLowerCase().replace(/\s+/g, '_'),
        avatarUrl: undefined,
        reputationScore: isStartupFeedback ? 1200 : 400,
        badge: isStartupFeedback ? 'Verified Startup Partner' : undefined,
      },
      content,
      createdAt: 'Just now',
      upvotes: 0,
      isStartupFeedback,
      startupName: isStartupFeedback ? selectedStartup.name : undefined,
    };

    setComments((prev) => ({
      ...prev,
      [ideaId]: [...(prev[ideaId] || []), newComment],
    }));

    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === ideaId ? { ...idea, commentsCount: idea.commentsCount + 1 } : idea
      )
    );

    showToast('Feedback added to the idea');
  };

  // Update idea status (from Startup Consumer Ideas table)
  const updateIdeaStatus = (ideaId: string, newStatus: IdeaStatus) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          return {
            ...idea,
            status: newStatus,
            isShortlisted: ['Shortlisted', 'Testing', 'Prototype', 'Launched', 'Implemented'].includes(newStatus),
          };
        }
        return idea;
      })
    );
    showToast(`Idea moved to ${newStatus}`);
  };

  // Toggle Shortlist
  const toggleShortlist = (ideaId: string) => {
    setIdeas((prev) =>
      prev.map((idea) => {
        if (idea.id === ideaId) {
          const next = !idea.isShortlisted;
          return {
            ...idea,
            isShortlisted: next,
            status: next && idea.status === 'New' ? 'Shortlisted' : idea.status,
          };
        }
        return idea;
      })
    );
    showToast('Shortlist updated');
  };

  // Participate in Challenge
  const submitChallengeIdea = (challengeIndex: number, submission: {
    title: string;
    desc: string;
    problem: string;
    targetCustomer: string;
    price: string;
    whyBuy: string;
  }) => {
    const ch = challenges[challengeIndex];
    if (!ch) return;

    submitIdea({
      title: submission.title,
      company: ch.company,
      cat: ch.cat,
      price: submission.price || ch.price,
      desc: submission.desc,
      why: `${submission.problem}. Target: ${submission.targetCustomer}. Purchase driver: ${submission.whyBuy}`,
    });

    setChallenges((prev) =>
      prev.map((c, idx) =>
        idx === challengeIndex
          ? { ...c, ideas: String(parseInt(c.ideas.replace(/,/g, ''), 10) + 1) }
          : c
      )
    );

    showToast('Challenge response submitted for review');
  };

  // Add new challenge (from Startup side)
  const addChallenge = (newCh: {
    title: string;
    desc: string;
    price: string;
    reward: string;
    cat: string;
  }) => {
    const created: Challenge = {
      id: `c-${Date.now()}`,
      company: selectedStartup.name,
      cat: newCh.cat || selectedStartup.category.split(' · ')[0],
      title: newCh.title,
      desc: newCh.desc,
      price: newCh.price,
      people: '1',
      ideas: '0',
      left: '30 days',
      reward: newCh.reward,
    };
    setChallenges((prev) => [created, ...prev]);
    showToast('New innovation challenge launched to community');
  };

  // Run Concept Lab Consumer Test Simulation
  const runConsumerTestSimulation = (customIdea?: any) => {
    // Extract idea from parameter if provided (and validate it's an idea object, not a MouseEvent)
    const idea =
      customIdea &&
      typeof customIdea === 'object' &&
      'sellingPrice' in customIdea &&
      typeof customIdea.sellingPrice === 'number'
        ? customIdea
        : conceptLabIdea;

    // Ensure context conceptLabIdea is synchronized if customIdea was passed
    if (customIdea && customIdea !== conceptLabIdea && typeof customIdea.sellingPrice === 'number') {
      setConceptLabIdea(customIdea);
    }

    const sellingPrice = Number(idea.sellingPrice) || 0;
    const unitCost = Number(idea.unitCost) || 0;
    const marketingUnit = Number(idea.marketingUnit) || 0;
    const distributionUnit = Number(idea.distributionUnit) || 0;
    const expectedSales = Number(idea.expectedSales) || 10000;
    const weightVolume = (idea.weightVolume && String(idea.weightVolume).trim()) || '35g';

    const totalUnitCost = unitCost + marketingUnit + distributionUnit;
    const marginPerUnit = sellingPrice - totalUnitCost;
    const marginPct = sellingPrice > 0 ? Math.round((marginPerUnit / sellingPrice) * 100) : 0;

    // Responsive price elasticity & purchase intent:
    // Benchmark: sellingPrice = 49 -> 82% intent.
    // Elasticity: ~0.9% change per ₹1 deviation.
    const priceDelta = sellingPrice - 49;
    const wouldBuy = Math.min(96, Math.max(38, Math.round(82 - priceDelta * 0.9)));

    // Median acceptable consumer price benchmark (~94% of MSRP)
    const medianPrice = Math.max(10, Math.round(sellingPrice * 0.94));

    // Dynamic tester panel size: scales realistically with expected first-month sales scale
    const consumersTested = Math.min(5000, Math.max(500, Math.round(1240 + (expectedSales - 10000) * 0.04)));

    // Dynamic Opportunity Score: factors both consumer demand (wouldBuy) and startup unit margin
    const marginDelta = marginPct - 39;
    const oppScore = Math.min(98, Math.max(40, Math.round(88 - priceDelta * 0.6 + marginDelta * 0.35)));

    // Dynamic Marketing Score: driven by price positioning and consumer excitement
    const mktScore = Math.min(96, Math.max(42, Math.round(84 - priceDelta * 0.55)));

    // Dynamic Top Consumer Concern based on live economics and parameters
    let topConcern = 'Texture preservation across shelf-life';
    if (marginPct < 15) {
      topConcern = 'Narrow gross margin creates vulnerability to ingredient cost inflation';
    } else if (sellingPrice > 60) {
      topConcern = 'Price point higher than mass alternatives in retail channels';
    } else if (unitCost > 28) {
      topConcern = 'High BOM unit production cost limits retail discount flexibility';
    } else if (distributionUnit > 6) {
      topConcern = 'High distribution & logistics cost across Tier-2 retail channels';
    } else if (sellingPrice > 50) {
      topConcern = 'Price point slightly higher than entry-level snack alternatives';
    }

    // Dynamic AI Recommendation incorporating current price, weight/volume, margin, intent
    const aiRecommendation =
      oppScore >= 75
        ? `Strong validation signals across ${consumersTested.toLocaleString()} tested consumers. The ${weightVolume} packaging at ₹${sellingPrice} delivers healthy contribution margin (${marginPct}%) with high purchase intent (${wouldBuy}%). Recommended to advance to pilot batch production.`
        : `Moderate validation signals across ${consumersTested.toLocaleString()} tested consumers. Unit margin is ${marginPct}%. Consider optimizing packaging or ingredient formulation to achieve a target price closer to ₹${medianPrice} to lift purchase intent above 80%.`;

    setSimulationResult({
      tested: true,
      opportunityScore: oppScore,
      marketingScore: mktScore,
      wouldBuyPercentage: wouldBuy,
      medianPrice: medianPrice,
      topConcern: topConcern,
      consumersTested: consumersTested,
      marketingBars: [
        { label: 'Concept Clarity', score: Math.min(96, Math.max(55, Math.round(mktScore + 2))) },
        { label: 'Packaging Appeal', score: Math.min(96, Math.max(55, Math.round(mktScore - 2))) },
        { label: 'Perceived Quality', score: Math.min(96, Math.max(55, Math.round(oppScore - 9))) },
        { label: 'Uniqueness vs Competition', score: Math.min(98, Math.max(55, Math.round(mktScore + 4))) },
      ],
      overallBars: [
        { label: 'Price-to-Value Match', score: Math.min(96, Math.max(40, Math.round(wouldBuy + 2))) },
        { label: 'Repeat Purchase Intent', score: Math.min(95, Math.max(35, Math.round(wouldBuy - 4))) },
        { label: 'Recommendation Potential', score: Math.min(96, Math.max(40, Math.round(oppScore - 3))) },
        { label: 'Market Readiness', score: oppScore },
      ],
      aiRecommendation: aiRecommendation,
      message: `Test complete: ${oppScore}% Opportunity Score · ${wouldBuy}% Purchase Intent`,
    });

    showToast(`Test complete: ${oppScore}% Opportunity Score · ${wouldBuy}% Purchase Intent`);
  };

  return (
    <AppContext.Provider
      value={{
        consumerUser,
        startupUser,
        setConsumerUser,
        setStartupUser,
        logout,
        isConsumerAuthModalOpen,
        openConsumerAuthModal,
        closeConsumerAuthModal,
        selectedAvatar,
        setSelectedAvatar,
        isDarkMode,
        toggleDarkMode,
        globalConsumerSearch,
        setGlobalConsumerSearch,
        startups,
        selectedStartup,
        setSelectedStartupId,
        activeImplementedFinancials,
        activeScoutingMandate,
        activeEmergingTrends,
        activeAnalytics,
        ideas,
        draftIdeas,
        submitDraftIdea,
        updateDraftIdea,
        comments,
        upvoteIdea,
        submitIdea,
        addComment,
        updateIdeaStatus,
        toggleShortlist,
        challenges,
        submitChallengeIdea,
        addChallenge,
        aiClusters: INITIAL_CLUSTERS,
        conceptLabIdea,
        setConceptLabIdea,
        simulationResult,
        runConsumerTestSimulation,
        toastMessage,
        showToast,
      }}
    >
      {children}
      {/* Prototype Toast Notification */}
      {toastMessage && (
        <div className="fixed right-6 bottom-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl z-50 text-sm font-semibold animate-bounce-subtle border border-slate-700">
          {toastMessage}
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
