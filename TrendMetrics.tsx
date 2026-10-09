import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useApp } from '@/context/AppContext';
import { TrendingUp, Flame, Users, Sparkles } from 'lucide-react';

export const TrendMetrics: React.FC = () => {
  const { aiClusters } = useApp();

  return (
    <Card className="border-slate-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200/60">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base sm:text-lg">Emerging Consumer Demand Signals</CardTitle>
              <CardDescription>
                Real-time algorithmic clustering of consumer pain points and surging category interest
              </CardDescription>
            </div>
          </div>
          <Badge variant="purple" size="sm" className="hidden sm:inline-flex gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Demand Intelligence</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiClusters.map((cluster) => (
            <div
              key={cluster.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="neutral" size="sm">
                    {cluster.category}
                  </Badge>
                  <span className="flex items-center text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                    {cluster.statusTag}
                  </span>
                </div>
                <h4 className="font-semibold text-sm text-slate-900 mb-1">
                  {cluster.title}
                </h4>
              </div>

              <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400 mt-3">
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {cluster.interactionsCount} interactions
                </span>
                <span className="font-semibold text-indigo-700">
                  AI Synthesized
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
