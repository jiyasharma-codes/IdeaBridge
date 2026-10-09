import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ConsumerLayout } from '@/layouts/ConsumerLayout';
import { CompanyLayout } from '@/layouts/CompanyLayout';

// Public Experience
import { LandingPage } from '@/pages/public/LandingPage';
import { ConsumerAuthPage } from '@/pages/consumer/ConsumerAuthPage';
import { CompanyAuthPage } from '@/pages/company/CompanyAuthPage';

// Consumer Experience Pages
import { ConsumerDashboardPage } from '@/pages/consumer/ConsumerDashboardPage';
import { ExploreIdeasPage } from '@/pages/consumer/ExploreIdeasPage';
import { IdeaDetailPage } from '@/pages/consumer/IdeaDetailPage';
import { SubmitIdeaPage } from '@/pages/consumer/SubmitIdeaPage';
import { MyIdeasPage } from '@/pages/consumer/MyIdeasPage';
import { ChallengesPage } from '@/pages/consumer/ChallengesPage';
import { ConsumerProfilePage } from '@/pages/consumer/ConsumerProfilePage';

// Startup Portal Pages (7 Prototype Sections)
import { CompanyOverviewPage } from '@/pages/company/CompanyOverviewPage';
import { CompanyConsumerIdeasPage } from '@/pages/company/CompanyConsumerIdeasPage';
import { CompanyChallengesPage } from '@/pages/company/CompanyChallengesPage';
import { CompanyMarketInsightsPage } from '@/pages/company/CompanyMarketInsightsPage';
import { CompanyConceptLabPage } from '@/pages/company/CompanyConceptLabPage';
import { CompanyMarketingPage } from '@/pages/company/CompanyMarketingPage';
import { CompanyAnalyticsPage } from '@/pages/company/CompanyAnalyticsPage';
import { CompanyFinancialPage } from '@/pages/company/CompanyFinancialPage';
import { CompanySettingsPage } from '@/pages/company/CompanySettingsPage';

// Shared
import { NotFoundPage } from '@/pages/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Stand-alone Public Landing Page (Zero consumer navbar / dashboard behind it!) */}
      <Route path="/" element={<LandingPage />} />

      {/* Public Authentication Gateways */}
      <Route path="/auth/consumer" element={<ConsumerAuthPage />} />
      <Route path="/auth/startup" element={<CompanyAuthPage />} />

      {/* Consumer Experience Routes */}
      <Route path="/consumer" element={<ConsumerLayout />}>
        <Route index element={<ConsumerDashboardPage />} />
        <Route path="home" element={<ConsumerDashboardPage />} />
        <Route path="explore" element={<ExploreIdeasPage />} />
        <Route path="challenges" element={<ChallengesPage />} />
        <Route path="my-ideas" element={<MyIdeasPage />} />
        <Route path="submit" element={<SubmitIdeaPage />} />
        <Route path="profile" element={<ConsumerProfilePage />} />
        <Route path="ideas/:id" element={<IdeaDetailPage />} />
      </Route>

      {/* Direct Consumer convenience routes */}
      <Route element={<ConsumerLayout />}>
        <Route path="/explore" element={<ExploreIdeasPage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/my-ideas" element={<MyIdeasPage />} />
        <Route path="/submit" element={<SubmitIdeaPage />} />
        <Route path="/profile" element={<ConsumerProfilePage />} />
        <Route path="/ideas/:id" element={<IdeaDetailPage />} />
      </Route>

      {/* Startup Portal Routes (/startup/*) */}
      <Route path="/startup" element={<CompanyLayout />}>
        <Route index element={<CompanyOverviewPage />} />
        <Route path="overview" element={<CompanyOverviewPage />} />
        <Route path="ideas" element={<CompanyConsumerIdeasPage />} />
        <Route path="challenges" element={<CompanyChallengesPage />} />
        <Route path="market" element={<CompanyMarketInsightsPage />} />
        <Route path="concept" element={<CompanyConceptLabPage />} />
        <Route path="lab" element={<CompanyConceptLabPage />} />
        <Route path="marketing" element={<CompanyMarketingPage />} />
        <Route path="financial" element={<CompanyFinancialPage />} />
        <Route path="analytics" element={<CompanyAnalyticsPage />} />
        <Route path="settings" element={<CompanySettingsPage />} />
      </Route>

      {/* Company Route Aliases (/company/* -> /startup/*) */}
      <Route path="/company" element={<CompanyLayout />}>
        <Route index element={<CompanyOverviewPage />} />
        <Route path="overview" element={<CompanyOverviewPage />} />
        <Route path="ideas" element={<CompanyConsumerIdeasPage />} />
        <Route path="discover" element={<CompanyConsumerIdeasPage />} />
        <Route path="challenges" element={<CompanyChallengesPage />} />
        <Route path="market" element={<CompanyMarketInsightsPage />} />
        <Route path="intelligence" element={<CompanyMarketInsightsPage />} />
        <Route path="concept" element={<CompanyConceptLabPage />} />
        <Route path="shortlist" element={<CompanyConceptLabPage />} />
        <Route path="marketing" element={<CompanyMarketingPage />} />
        <Route path="financial" element={<CompanyFinancialPage />} />
        <Route path="analytics" element={<CompanyAnalyticsPage />} />
        <Route path="settings" element={<CompanySettingsPage />} />
        <Route path="profile" element={<CompanyOverviewPage />} />
        <Route path="auth" element={<CompanyAuthPage />} />
      </Route>

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
