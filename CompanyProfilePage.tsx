import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import {
  Building2,
  ShieldCheck,
  Trophy,
  CheckCircle,
  MapPin,
  Globe,
} from 'lucide-react';

export const CompanyProfilePage: React.FC = () => {
  const { startupUser, selectedStartup, challenges, ideas } = useApp();

  const startupShortlisted = ideas.filter(
    (i) => i.isShortlisted && (i.targetStartupId === selectedStartup.id || i.targetStartupName === selectedStartup.name)
  );
  const startupChallenges = challenges.filter(
    (c) => c.company.toLowerCase() === selectedStartup.name.toLowerCase()
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Startup Organization Header */}
      <Card className="p-6 sm:p-8 border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shadow-md shadow-emerald-600/20">
              <Building2 className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {selectedStartup.name}
                </h1>
                <Badge variant="enterprise" size="sm" className="gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{selectedStartup.stage}</span>
                </Badge>
                <Badge variant="neutral" size="sm">
                  {selectedStartup.category}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
                {selectedStartup.description}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  India
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  {selectedStartup.name.toLowerCase().replace(/\s+/g, '')}.in
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200/80 text-center flex-1 sm:flex-initial">
              <span className="text-xs text-emerald-700 font-medium">Pipeline Concepts</span>
              <p className="text-xl font-bold text-emerald-900">{startupShortlisted.length}</p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center flex-1 sm:flex-initial">
              <span className="text-xs text-slate-500 font-medium">Active Briefs</span>
              <p className="text-xl font-bold text-slate-800">{startupChallenges.length}</p>
            </div>
          </div>
        </div>

        {/* Lead Representative on Record */}
        {startupUser && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800">Founder / Lead on Duty:</span>
              <span>{startupUser.name} ({startupUser.title})</span>
              <span className="text-slate-400">• {startupUser.workEmail}</span>
            </div>
            <Badge variant="enterprise" size="sm">
              Verified Startup Domain
            </Badge>
          </div>
        )}
      </Card>

      {/* Startup Active Commercial Product Portfolio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {selectedStartup.name} Current Product Portfolio
            </h2>
            <p className="text-xs text-slate-500">
              Commercial SKUs currently on retail shelves and online distribution.
            </p>
          </div>
          <Badge variant="brand" size="sm">{selectedStartup.productPortfolio.length} Live SKUs</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {selectedStartup.productPortfolio.map((product) => (
            <Card key={product.id} className="p-5 border-slate-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="neutral" size="sm">{product.category}</Badge>
                  <span className="font-bold text-sm text-slate-900">{product.price}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mb-1">{product.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">{product.description}</p>
              </div>
              <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                {product.tags.map((tag) => (
                  <span key={tag} className="text-[10px] text-slate-500 bg-slate-50 px-2 py-0.5 rounded">
                    #{tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Recently Launched Products Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              Recently Launched Products (Co-Created via IdeaBridge)
            </h2>
            <p className="text-xs text-slate-500">
              Products originating from community ideas that progressed through validation and launched commercially.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {selectedStartup.recentlyLaunched && (
            <Card key={selectedStartup.recentlyLaunched.id} className="p-5 border-emerald-200/80 bg-emerald-50/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Launched Product
                    </span>
                    <span className="text-xs text-slate-400">Validations: {selectedStartup.recentlyLaunched.validationsCount}</span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900">{selectedStartup.recentlyLaunched.name}</h3>
                  <p className="text-xs text-slate-600">
                    <strong>Monthly Revenue:</strong> {selectedStartup.recentlyLaunched.monthlyRevenue} (Margin: {selectedStartup.recentlyLaunched.margin})
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    <strong>Market Response:</strong> {selectedStartup.recentlyLaunched.consumerResponse}
                  </p>
                </div>
                <Link to="/startup/ideas">
                  <Button variant="outline" size="sm">
                    Scout More for {selectedStartup.name}
                  </Button>
                </Link>
              </div>
            </Card>
          )}
        </div>
      </section>

      {/* Grid: Scouting Criteria & Sponsored Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scouting Criteria */}
        <Card className="p-6 space-y-4 border-slate-200 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="font-bold text-base text-slate-900">
              Scouting Criteria & Mandates
            </h3>
            <p className="text-xs text-slate-500">
              What the {selectedStartup.name} team prioritizes when reviewing community pitches.
            </p>
          </div>

          <div className="space-y-2.5">
            {[
              'Consumer problem validation and unique taste/lifestyle appeal',
              'Feasibility under accessible Indian consumer price points',
              'Clean ingredients and sustainable packaging design',
            ].map((criterion: string, idx: number) => (
              <div
                key={idx}
                className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
              >
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{criterion}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Active Sponsored Challenge */}
        <Card className="p-6 space-y-4 border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="border-b border-slate-100 pb-3 mb-3">
              <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-500" />
                Active Challenge Brief
              </h3>
              <p className="text-xs text-slate-500">
                Live brief sponsored by {selectedStartup.name}.
              </p>
            </div>

            {startupChallenges[0] ? (
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="warning" size="sm">Open Brief</Badge>
                  <span className="text-xs font-bold text-amber-900">{startupChallenges[0].reward}</span>
                </div>
                <h4 className="font-bold text-sm text-slate-900">{startupChallenges[0].title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{startupChallenges[0].desc}</p>
                <div className="text-[11px] text-amber-800 font-semibold pt-1">
                  {startupChallenges[0].ideas} Community Submissions
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-xs text-slate-400 bg-slate-50 rounded-xl">
                No active challenge briefs currently open for this startup.
              </div>
            )}
          </div>


          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link to="/company/discover">
              <Button variant="outline" size="sm">
                Discover More Ideas
              </Button>
            </Link>
            <Link to="/company/dashboard">
              <Button variant="enterprise" size="sm">
                Open Command Center
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
