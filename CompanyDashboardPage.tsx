import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { StatCard } from '@/components/common/StatCard';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import {
  Building2,
  TrendingUp,
  BookmarkCheck,
  Layers,
  Compass,
  ArrowRight,
  Flame,
  Sparkles,
  BarChart3,
  Lightbulb,
} from 'lucide-react';

export const CompanyDashboardPage: React.FC = () => {
  const { ideas, selectedStartup, startupUser, aiClusters, toggleShortlist } = useApp();

  const shortlistedIdeas = ideas.filter((i) => i.isShortlisted);
  const highEngagementIdeas = ideas.filter((i) => (i.validation?.wouldTryPercentage || 0) >= 75);
  const totalSubmissions = ideas.length;

  // Pipeline stage breakdown counts based on the 7 lifecycle stages
  const stageCounts = {
    new: ideas.filter((i) => i.status === 'New').length,
    validation: ideas.filter((i) => i.status === 'Under Review').length,
    review: ideas.filter((i) => i.status === 'Shortlisted').length,
    testing: ideas.filter((i) => i.status === 'Testing').length,
    validated: ideas.filter((i) => i.status === 'Prototype').length,
    launch: ideas.filter((i) => i.status === 'Launched').length,
    implemented: ideas.filter((i) => i.status === 'Implemented').length,
  };

  // Category distribution calculation
  const categoryStats = [
    { name: 'Beverages & Drinks', count: ideas.filter((i) => i.category === 'Beverages & Drinks').length, pct: 36, color: 'bg-emerald-500' },
    { name: 'Snacks & Confectionery', count: ideas.filter((i) => i.category === 'Snacks & Confectionery').length, pct: 28, color: 'bg-amber-500' },
    { name: 'Food & Culinary', count: ideas.filter((i) => i.category === 'Food & Culinary').length, pct: 18, color: 'bg-orange-500' },
    { name: 'Personal Care & Wellness', count: ideas.filter((i) => i.category === 'Personal Care & Wellness').length, pct: 10, color: 'bg-rose-500' },
    { name: 'Home & Kitchen Essentials', count: ideas.filter((i) => i.category === 'Home & Kitchen Essentials').length, pct: 8, color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Startup Portal Welcome Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <Badge variant="enterprise" size="sm" className="gap-1 font-bold">
              <Building2 className="w-3.5 h-3.5" />
              <span>{selectedStartup.name}</span>
            </Badge>
            <span className="text-xs text-slate-500 font-semibold">• {selectedStartup.category}</span>
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
              {selectedStartup.stage}
            </span>
            {startupUser && (
              <span className="text-xs text-slate-500 font-medium">
                • {startupUser.name} ({startupUser.title})
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {selectedStartup.name} Innovation & R&D Command Center
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Discover community product pitches, evaluate consumer willingness to try (% would try, target ₹ price points),
            and move validated concepts into formulation and commercial launch.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/company/discover">
            <Button variant="enterprise" size="sm" leftIcon={<Compass className="w-4 h-4" />}>
              Scout Ideas
            </Button>
          </Link>
          <Link to="/company/shortlist">
            <Button variant="outline" size="sm" leftIcon={<Layers className="w-4 h-4" />}>
              Pipeline ({shortlistedIdeas.length})
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stat Cards Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Community Concepts Monitored"
          value={totalSubmissions}
          subtitle="Across 6 core retail verticals"
          trend={{ value: '+14 new this week', isPositive: true }}
          icon={<Lightbulb className="w-5 h-5" />}
          variant="neutral"
        />
        <StatCard
          title="High-Validation Concepts"
          value={highEngagementIdeas.length}
          subtitle="≥ 75% consumer purchase intent"
          trend={{ value: '+22% momentum', isPositive: true }}
          icon={<TrendingUp className="w-5 h-5" />}
          variant="brand"
        />
        <StatCard
          title="Active Shortlist Pipeline"
          value={shortlistedIdeas.length}
          subtitle="Under formulation review"
          icon={<BookmarkCheck className="w-5 h-5" />}
          variant="enterprise"
        />
        <StatCard
          title="Emerging Consumer Needs"
          value={`${aiClusters.length} Active`}
          subtitle="Unmet pain points detected"
          icon={<Sparkles className="w-5 h-5" />}
          variant="enterprise"
        />
      </div>

      {/* R&D Innovation Pipeline (7-Step Workflow) */}
      <Card className="p-6 border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Startup Co-Creation & R&D Pipeline
            </h2>
            <p className="text-xs text-slate-500">
              Progression of consumer product concepts from community ideation to commercial launch.
            </p>
          </div>
          <Link to="/company/shortlist">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Manage Pipeline
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">1. New</span>
            <div className="text-xl font-extrabold text-slate-900 mt-1">{stageCounts.new}</div>
            <p className="text-[11px] text-slate-400 mt-0.5">Fresh pitches</p>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-200/70">
            <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider block">2. Validating</span>
            <div className="text-xl font-extrabold text-purple-900 mt-1">{stageCounts.validation}</div>
            <p className="text-[11px] text-purple-600/80 mt-0.5">Votes & price check</p>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-200/70">
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">3. Review</span>
            <div className="text-xl font-extrabold text-blue-900 mt-1">{stageCounts.review}</div>
            <p className="text-[11px] text-blue-600/80 mt-0.5">Founder review</p>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/70">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">4. Testing</span>
            <div className="text-xl font-extrabold text-amber-900 mt-1">{stageCounts.testing}</div>
            <p className="text-[11px] text-amber-600/80 mt-0.5">Pilot formulation</p>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200/70">
            <span className="text-[10px] font-bold text-teal-700 uppercase tracking-wider block">5. Validated</span>
            <div className="text-xl font-extrabold text-teal-900 mt-1">{stageCounts.validated}</div>
            <p className="text-[11px] text-teal-700 mt-0.5">Trial verified</p>
          </div>

          <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-200/70">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">6. Candidate</span>
            <div className="text-xl font-extrabold text-indigo-900 mt-1">{stageCounts.launch}</div>
            <p className="text-[11px] text-indigo-700 mt-0.5">Packaging ready</p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-300">
            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">7. Implemented</span>
            <div className="text-xl font-extrabold text-emerald-900 mt-1">{stageCounts.implemented}</div>
            <p className="text-[11px] text-emerald-700 mt-0.5">In Market & Shelves</p>
          </div>
        </div>
      </Card>

      {/* Recently Launched Products Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Recently Launched Products by {selectedStartup.name}
            </h2>
            <p className="text-xs text-slate-500">
              Commercial products launched from community ideas through IdeaBridge validation.
            </p>
          </div>
          <Link to="/company/profile">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Full Portfolio ({selectedStartup.productPortfolio.length} Products)
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedStartup.recentlyLaunched && (
            <Card key={selectedStartup.recentlyLaunched.id} className="p-5 border-emerald-200/80 bg-white hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="enterprise" size="sm">
                  Launched
                </Badge>
                <span className="text-xs text-slate-400">Validations: {selectedStartup.recentlyLaunched.validationsCount}</span>
              </div>
              <h3 className="font-bold text-base text-slate-900">{selectedStartup.recentlyLaunched.name}</h3>
              <p className="text-xs text-slate-600 mt-1 mb-2">
                <strong>Monthly Revenue:</strong> {selectedStartup.recentlyLaunched.monthlyRevenue} (Margin: {selectedStartup.recentlyLaunched.margin})
              </p>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-emerald-800 mb-2">
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Market Response:</span>
                "{selectedStartup.recentlyLaunched.consumerResponse}"
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Grid: Trending Categories & Emerging Needs Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Momentum Breakdown */}
        <Card className="p-6 space-y-5 border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-brand-600" />
                <h3 className="font-bold text-base text-slate-900">
                  Consumer Sector Demand Momentum
                </h3>
              </div>
              <Badge variant="brand" size="sm">Live Signals</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Distribution of consumer pitches submitted over the last 30 days.
            </p>

            <div className="space-y-4">
              {categoryStats.map((item) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{item.name}</span>
                    <span>{item.count} concepts ({item.pct}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Viewing as: <strong className="text-slate-800">{selectedStartup.name} ({selectedStartup.category})</strong></span>
            <Link to="/company/intelligence" className="font-semibold text-brand-600 hover:underline">
              Deep Signals →
            </Link>
          </div>
        </Card>

        {/* Emerging Consumer Needs Radar */}
        <Card className="p-6 space-y-4 border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-rose-500" />
                <h3 className="font-bold text-base text-slate-900">
                  Emerging Consumer Needs Radar
                </h3>
              </div>
              <Badge variant="enterprise" size="sm">High Signal</Badge>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Clustered demand spikes identified from consumer feedback and upvote velocity.
            </p>

            <div className="space-y-3">
              {aiClusters.slice(0, 3).map((cluster) => (
                <div
                  key={cluster.id}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{cluster.title}</span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {cluster.statusTag}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium flex items-center justify-between mt-2">
                    <span>Category: <strong className="text-slate-800">{cluster.category}</strong></span>
                    <span className="text-indigo-700 font-semibold">{cluster.interactionsCount} signals</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Analyzed across {totalSubmissions} submissions</span>
            <Link to="/company/intelligence" className="font-semibold text-emerald-700 hover:underline">
              Explore All Signals →
            </Link>
          </div>
        </Card>
      </div>

      {/* High-Engagement Concepts Ready for Evaluation */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              High-Velocity Consumer Concepts
            </h2>
            <p className="text-xs text-slate-500">
              Pitches with highest community purchase intent and verified price expectations.
            </p>
          </div>
          <Link to="/company/discover">
            <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              Discover All ({ideas.length})
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highEngagementIdeas.slice(0, 3).map((idea) => (
            <Card key={idea.id} className="p-5 flex flex-col justify-between border-slate-200 hover:border-emerald-300 transition-all">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="brand" size="sm">{idea.category}</Badge>
                  {idea.validation && (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                      {idea.validation.wouldTryPercentage}% would try
                    </span>
                  )}
                </div>

                <Link
                  to={`/ideas/${idea.id}`}
                  className="font-bold text-base text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1 mb-1 block"
                >
                  {idea.title}
                </Link>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {idea.tagline}
                </p>

                {idea.targetStartupName && (
                  <div className="text-[11px] text-slate-500 font-semibold mb-3">
                    Targeted Startup: <span className="text-slate-800">{idea.targetStartupName}</span>
                  </div>
                )}

                {idea.validation && (
                  <div className="text-xs text-slate-500 mb-3 bg-slate-50 p-2 rounded-lg">
                    Target Price: <strong className="text-slate-800">{idea.validation.targetPriceRange}</strong>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  {idea.upvotesCount} Supporters
                </span>
                <button
                  onClick={() => toggleShortlist(idea.id)}
                  className={`text-xs px-3 py-1.5 rounded-xl border font-semibold transition-all ${
                    idea.isShortlisted
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {idea.isShortlisted ? '✓ Shortlisted' : '+ Shortlist'}
                </button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};
