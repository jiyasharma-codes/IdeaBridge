import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Flame,
  Users,
  Compass,
  ArrowRight,
  Building2,
} from 'lucide-react';

export const CompanyIntelligencePage: React.FC = () => {
  const { aiClusters, startups } = useApp();

  const startupMentions = startups.map((s, idx) => ({
    brand: s.name,
    count: 18 - idx * 3,
    category: s.category,
    share: `${30 - idx * 5}%`,
  }));

  return (
    <div className="space-y-10 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="enterprise" size="sm" className="gap-1 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Consumer Demand Intelligence</span>
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Market Signals & Emerging Consumer Trends
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Real-time clustering of consumer pain points, price expectations, and startup-targeting
            patterns across food, beverage, snack, and everyday retail categories.
          </p>
        </div>

        <Link to="/startup/ideas">
          <Button variant="enterprise" size="sm" leftIcon={<Compass className="w-4 h-4" />}>
            Scout Concepts
          </Button>
        </Link>
      </div>

      {/* Primary Trend Radar Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-500" />
            Top Surging Consumer Demand Signals
          </h2>
          <span className="text-xs text-slate-400">Refreshed from verified community submissions</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiClusters.map((cluster) => (
            <Card
              key={cluster.id}
              className="p-6 flex flex-col justify-between border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <Badge variant="neutral" size="sm">
                    {cluster.category}
                  </Badge>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    {cluster.statusTag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {cluster.title}
                </h3>

                <div className="p-2.5 bg-emerald-50/60 rounded-lg border border-emerald-100 flex items-center justify-between text-xs text-emerald-950 font-medium mt-3">
                  <span>Consumer Validation:</span>
                  <strong className="text-emerald-800">{cluster.interactionsCount} consumer interactions</strong>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {cluster.interactionsCount} signals
                  </span>
                  <span>Cluster: <strong className="text-indigo-700">AI Synthesized</strong></span>
                </div>

                <Link to="/startup/ideas">
                  <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                    Scout Ideas
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Startup Target Analysis & Category Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Startup Pitch Share */}
        <Card className="p-6 lg:col-span-2 space-y-4 border-slate-200 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-600" />
                Target Startup Mentions in Consumer Pitches
              </h3>
              <p className="text-xs text-slate-500">
                Startups most frequently targeted by community innovators for co-creation.
              </p>
            </div>
            <Badge variant="brand" size="sm">Startup Radar</Badge>
          </div>

          <div className="space-y-3 pt-1">
            {startupMentions.map((item) => (
              <div
                key={item.brand}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
              >
                <div className="space-y-0.5">
                  <span className="font-bold text-slate-900">{item.brand}</span>
                  <p className="text-slate-400 text-[11px]">Category: {item.category}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-slate-800">{item.count} Pitches</span>
                  <p className="text-emerald-600 font-semibold text-[11px]">{item.share} volume share</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Corporate Scout Recommendation */}
        <Card className="p-6 space-y-4 border-slate-200 bg-gradient-to-br from-slate-900 to-slate-950 text-white shadow-md flex flex-col justify-between">
          <div className="space-y-2">
            <Badge variant="enterprise" size="sm" className="bg-emerald-950 text-emerald-400 border-emerald-800">
              R&D Scout Recommendation
            </Badge>
            <h4 className="text-base font-bold text-white">
              Launch a Targeted Corporate Challenge
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              If your corporate R&D team is seeking specific bio-based packaging or sugar-free formulations,
              sponsoring a challenge directly focuses the creativity of 10,000+ consumer inventors.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <div className="text-xs text-slate-400">
              Average challenge delivers <strong>50+ validated prototypes</strong> within 4 weeks.
            </div>
            <Link to="/company/profile">
              <Button variant="enterprise" size="sm" className="w-full">
                View Organization Briefs
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
