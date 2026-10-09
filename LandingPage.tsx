import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Package,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { challenges } = useApp();

  // Landing page must always be presented in clean light mode
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.body.classList.remove('dark');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Public Navigation Bar */}
      <header className="h-18 bg-white border-b border-slate-200/80 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-200">
              ⌘
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">IdeaBridge</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                Build with Bharat
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/auth/consumer">
              <Button variant="ghost" size="sm" className="text-xs font-semibold text-slate-700">
                Consumer Sign In
              </Button>
            </Link>
            <Link to="/auth/startup">
              <Button variant="outline" size="sm" className="text-xs font-semibold border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                Startup Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Public Hero */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 flex-1">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-800 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Open Consumer-to-Startup Innovation Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Help build what comes next. Turn everyday feedback into{' '}
            <span className="text-indigo-600">real physical products.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            IdeaBridge connects creative consumers with emerging consumer startups to validate,
            refine, and launch products people actually want.
          </p>
        </div>

        {/* Primary Role Choice Cards (Prominent and unambiguous) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Consumer Choice */}
          <div
            onClick={() => navigate('/auth/consumer')}
            className="group cursor-pointer rounded-3xl p-8 bg-white border-2 border-slate-200 hover:border-indigo-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl font-bold group-hover:scale-110 transition-transform">
                💡
              </div>
              <div>
                <Badge variant="brand" size="sm" className="mb-2">For Consumers & Creators</Badge>
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Continue as Consumer
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Submit product ideas, validate community concepts, vote on target pricing, join startup innovation challenges, and earn co-creation hampers.
                </p>
              </div>

              <ul className="space-y-2 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Submit product & packaging concepts</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Vote on willingness to buy & fair price points</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Win product hampers and early-access batches</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-indigo-600">
              <span>Enter Consumer Experience</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Startup Choice */}
          <div
            onClick={() => navigate('/auth/startup')}
            className="group cursor-pointer rounded-3xl p-8 bg-white border-2 border-slate-200 hover:border-emerald-500 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-3xl font-bold group-hover:scale-110 transition-transform">
                🏢
              </div>
              <div>
                <Badge variant="success" size="sm" className="mb-2">For Emerging Startups</Badge>
                <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Continue as Startup
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Review organic consumer demand, evaluate price sensitivity curves, run concept test simulations, and transition shortlisted ideas to commercial launch.
                </p>
              </div>

              <ul className="space-y-2 pt-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Review consumer concepts with validation scores</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Concept Lab unit economics & scenario analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Launch innovation briefs directly to community</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-sm font-bold text-emerald-700">
              <span>Enter Startup Portal</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Recently Launched Spotlight (Proving the complete loop) */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-8 sm:p-10 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Package className="w-3.5 h-3.5" />
                <span>Recently Launched Success Story</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold">
                Peanut Butter Crunch Protein Bar by Nuvie
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Co-created with 3,842 consumer validations on IdeaBridge. Launched to market at ₹49 with a 21.3% contribution margin and 82% positive repeat intent.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 shrink-0">
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 block">Validations</span>
                <b className="text-xl font-bold text-emerald-400">3,842</b>
              </div>
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 text-center">
                <span className="text-xs text-slate-400 block">Monthly Run</span>
                <b className="text-xl font-bold text-white">₹4.8L</b>
              </div>
              <div className="p-3.5 bg-slate-800/80 rounded-2xl border border-slate-700 text-center col-span-2 sm:col-span-1">
                <span className="text-xs text-slate-400 block">Positive Taste</span>
                <b className="text-xl font-bold text-teal-300">82%</b>
              </div>
            </div>
          </div>
        </div>

        {/* Active Challenges & Trending Preview */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Active Startup Challenges</h3>
              <p className="text-xs text-slate-500">Emerging startups looking for student and creator ideas</p>
            </div>
            <Link to="/auth/consumer" className="text-xs font-bold text-indigo-600 hover:underline">
              View all 5 challenges →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {challenges.slice(0, 3).map((c) => (
              <Card key={c.id} className="p-5 flex flex-col justify-between border-slate-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600">{c.company}</span>
                    <span className="text-[11px] text-slate-400">{c.left}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{c.desc}</p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{c.price}</span>
                  <span className="text-emerald-700 font-semibold">{c.ideas} ideas</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Clean Public Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-700">
            <span>⌘ IdeaBridge</span>
            <span>·</span>
            <span>Build with Bharat Prototype</span>
          </div>
          <div>
            <span>Connecting Indian consumers with emerging D2C startups</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
