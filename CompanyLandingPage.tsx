import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Building2,
  TrendingUp,
  Target,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  LogIn,
} from 'lucide-react';

export const CompanyLandingPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 animate-fade-in">
      {/* Enterprise Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-6 pt-6 sm:pt-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>IdeaBridge Startup & Brand Innovation Suite</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Discover verified consumer demand before committing{' '}
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            formulation & pilot capital.
          </span>
        </h1>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Access organic product ideas submitted by real consumers, measure quantitative willingness
          to try (% would try, target ₹ price points), and co-create breakout consumer products.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link to="/company/dashboard" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="enterprise"
              leftIcon={<LayoutDashboard className="w-5 h-5" />}
              className="w-full sm:w-auto px-7 py-3 text-base shadow-lg shadow-emerald-600/20"
            >
              Open Startup Dashboard
            </Button>
          </Link>
          <Link to="/company/auth" className="w-full sm:w-auto">
            <Button
              size="lg"
              variant="outline"
              leftIcon={<LogIn className="w-4 h-4" />}
              className="w-full sm:w-auto px-7 py-3 text-base"
            >
              Startup Team Sign In
            </Button>
          </Link>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 space-y-3 border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Emerging Trend Signals</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Algorithmic clustering of consumer search patterns and recurring feature requests reveals
            unmet needs months before standard market research reports.
          </p>
        </Card>

        <Card className="p-6 space-y-3 border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Direct Brand Targeting</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Consumers explicitly pitch concepts tailored for your hardware, software, or appliance
            ecosystems. Review ideas specifically targeted at your brand.
          </p>
        </Card>

        <Card className="p-6 space-y-3 border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Curated Scouting Pipeline</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Shortlist high-velocity concepts, flag ideas for feasibility analysis, and engage directly
            with community creators through verified corporate comments.
          </p>
        </Card>
      </section>

      {/* Enterprise Capabilities Checklist */}
      <section className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 space-y-8">
        <div className="max-w-xl space-y-2">
          <Badge variant="enterprise" size="sm">Enterprise Features</Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Engineered for Corporate Product Teams
          </h2>
          <p className="text-sm text-slate-500">
            Modern innovation scouting tools designed to integrate seamlessly into your R&D lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            'Real-time consumer demand velocity tracking',
            'Pre-feasibility market potential scoring',
            'Direct verified corporate engagement in idea discussions',
            'Private pipeline management & evaluation stages',
            'Scalable architecture ready for PostgreSQL & AI summarization',
            'Verified Enterprise Scout credentials with corporate email',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-sm font-medium text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <div className="pt-4 flex items-center justify-between border-t border-slate-100 flex-wrap gap-4">
          <span className="text-xs text-slate-500">
            Ready to explore? Jump right into the live innovation analytics dashboard.
          </span>
          <Link to="/company/dashboard">
            <Button variant="enterprise" size="sm" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Launch Dashboard Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};
