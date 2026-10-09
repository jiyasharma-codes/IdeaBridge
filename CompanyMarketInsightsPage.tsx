import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Zap, BarChart2 } from 'lucide-react';

export const CompanyMarketInsightsPage: React.FC = () => {
  const { aiClusters, ideas, selectedStartup, activeEmergingTrends, showToast } = useApp();
  const [hasSynthesized, setHasSynthesized] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [synthesisStep, setSynthesisStep] = useState(0);

  const startupIdeas = ideas
    .filter((i) => i.company.toLowerCase() === selectedStartup.name.toLowerCase())
    .sort((a, b) => b.score - a.score);

  const handleGenerateAI = () => {
    setIsGenerating(true);
    setSynthesisStep(1);
    setTimeout(() => setSynthesisStep(2), 350);
    setTimeout(() => setSynthesisStep(3), 700);
    setTimeout(() => {
      setIsGenerating(false);
      setHasSynthesized(true);
      showToast('AI demand clustering synthesized from community submissions');
    }, 1000);
  };

  const totalValidations = startupIdeas.reduce((sum, i) => sum + i.upvotesCount, 0) || 3842;

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Market Insights & AI Clustering
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            AI-clustered consumer demand, confidence scores, and strategic product signals for {selectedStartup.name}.
          </p>
        </div>

        {hasSynthesized && (
          <Button
            variant="primary"
            size="sm"
            onClick={handleGenerateAI}
            disabled={isGenerating}
            leftIcon={<Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />}
            className="font-bold self-start sm:self-auto bg-indigo-600 hover:bg-indigo-700 shadow-sm"
          >
            {isGenerating ? 'Analyzing Signals...' : '↻ Re-synthesize Signals'}
          </Button>
        )}
      </div>

      {/* Initial Empty / Prompt State: AI does NOT appear automatically on page load */}
      {!hasSynthesized && !isGenerating && (
        <Card className="p-8 sm:p-10 text-center border-dashed border-2 border-indigo-200 bg-gradient-to-b from-indigo-50/40 via-white to-white space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 mx-auto flex items-center justify-center text-2xl shadow-xs">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto space-y-1.5">
            <h2 className="text-xl font-extrabold text-slate-900">
              Run AI Market Demand Synthesis
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Detect high-conviction product opportunities for {selectedStartup.name} by clustering {startupIdeas.length} community concepts and {totalValidations.toLocaleString()} consumer validations into actionable R&D signals.
            </p>
          </div>
          <div className="pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleGenerateAI}
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="font-bold bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-100 px-6 py-2.5 cursor-pointer"
            >
              ✨ Generate AI Insight
            </Button>
          </div>
        </Card>
      )}

      {/* Realistic Generating Progress Loader */}
      {isGenerating && (
        <Card className="p-8 text-center border border-indigo-200 bg-indigo-50/40 space-y-4 animate-pulse">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-md">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-base font-extrabold text-indigo-950">
              Synthesizing Consumer Demand Signals...
            </h3>
            <p className="text-xs font-semibold text-indigo-700">
              {synthesisStep === 1 && 'Ingesting community idea submissions and voting momentum...'}
              {synthesisStep === 2 && 'Clustering semantic features, packaging types, and price thresholds...'}
              {synthesisStep >= 3 && 'Formulating strategic recommendation and confidence scores...'}
            </p>
          </div>
        </Card>
      )}

      {/* Revealed Results (Only shown after user clicks Generate AI Insight) */}
      {hasSynthesized && (
        <>
          {/* AI Idea Clustering Summary Pills */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-900 text-xs font-bold">
              <Zap className="w-3.5 h-3.5 text-indigo-600" />
              <span>{aiClusters.length} Active AI Clusters</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs font-bold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>{totalValidations.toLocaleString()} Validations Aggregated</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-900 text-xs font-bold">
              <BarChart2 className="w-3.5 h-3.5 text-purple-600" />
              <span>91% Clustering Confidence</span>
            </div>
          </div>

          {/* Dark AI Strategic Recommendation Box (Screenshot 4 Reference) */}
          <div className="rounded-3xl bg-slate-900 text-white p-6 sm:p-8 shadow-xl border border-slate-800 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-indigo-400 font-extrabold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>AI Strategic Formulation Recommendation</span>
              </div>
              <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
                Real-time Synthesis
              </span>
            </div>

            <p className="text-sm sm:text-base font-medium text-slate-200 leading-relaxed">
              "{selectedStartup.aiInsightQuote || 'Across recent consumer interactions, high-density demand centers on clean ingredients, transparent protein per serving, and sub-₹55 single-serve packaging formats.'}"
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-400 font-semibold border-t border-slate-800">
              <span>Target Window: <b>Next 60 Days</b></span>
              <span>·</span>
              <span>Recommended Retail Price: <b>₹45–₹55</b></span>
              <span>·</span>
              <span>Risk Profile: <b>Low (High Repeat Intent)</b></span>
            </div>
          </div>

          {/* 3 AI Cluster Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {aiClusters.map((cl) => (
              <Card key={cl.id} className="p-5 border-slate-200 bg-white space-y-2 shadow-xs hover:shadow-md transition-all">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  AI CLUSTER
                </span>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">{cl.title}</h3>
                <div className="text-2xl font-black text-indigo-600">{cl.interactionsCount}</div>
                <p className="text-xs text-slate-500 font-medium">validated consumer interactions</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {cl.statusTag}
                </span>
              </Card>
            ))}
          </div>

          {/* Age Demographic Distribution Card */}
          <Card className="p-6 border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Demographic & Age Groups</h3>
                <p className="text-xs text-slate-500">Distribution of verified consumer responses</p>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                1,248 Verified Voters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
              <div className="flex items-center justify-center py-2">
                <div className="relative w-44 h-44 flex items-center justify-center">
                  <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
                    {[
                      { range: '18–24', pct: 34, color: '#4f46e5' },
                      { range: '25–30', pct: 28, color: '#06b6d4' },
                      { range: '31–40', pct: 22, color: '#10b981' },
                      { range: '41+', pct: 16, color: '#f59e0b' },
                    ].map((ag, idx, arr) => {
                      const r = 58;
                      const circ = 2 * Math.PI * r;
                      const strokeDasharray = `${(ag.pct / 100) * circ} ${circ}`;
                      const prevPctSum = arr.slice(0, idx).reduce((sum, g) => sum + g.pct, 0);
                      const strokeDashoffset = -((prevPctSum / 100) * circ);
                      return (
                        <circle
                          key={ag.range}
                          cx="80"
                          cy="80"
                          r={r}
                          fill="transparent"
                          stroke={ag.color}
                          strokeWidth="20"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total</span>
                    <b className="text-lg font-black text-slate-900 dark:text-white">1,248</b>
                    <span className="text-[10px] text-slate-500">Respondents</span>
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { range: '18–24', pct: '34%', count: '424', color: '#4f46e5' },
                  { range: '25–30', pct: '28%', count: '349', color: '#06b6d4' },
                  { range: '31–40', pct: '22%', count: '275', color: '#10b981' },
                  { range: '41+', pct: '16%', count: '200', color: '#f59e0b' },
                ].map((ag) => (
                  <div key={ag.range} className="p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: ag.color }} />
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{ag.range}</span>
                    </div>
                    <b className="text-xs font-black text-slate-900 dark:text-white">{ag.pct}</b>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </>
      )}

      {/* Emerging Market Trends Grid (Active Startup Data) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-extrabold text-slate-900">
              Emerging Consumer Trends · {selectedStartup.name}
            </h2>
            <p className="text-xs text-slate-500">
              Data signals extracted from verified community feedback and price acceptance polls.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400">
            {activeEmergingTrends.length} Key Trends
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {activeEmergingTrends.map((trend) => (
            <Card key={trend.id} className="p-5 border-slate-200 bg-white space-y-3.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                  Trend #{trend.trendNumber}
                </span>
                <span className="text-xs font-black text-emerald-700">
                  {trend.confidence}% Confidence
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 leading-tight">
                {trend.title}
              </h3>

              <div className="space-y-1 text-xs text-slate-500 font-medium">
                <span>Based on {trend.responsesCount.toLocaleString()} consumer responses</span>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${trend.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                {trend.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-indigo-600 font-bold">•</span>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Most Validated Opportunities Card */}
      <Card className="p-6 border-slate-200 bg-white space-y-4">
        <h3 className="text-base font-extrabold text-slate-900">Most validated opportunities</h3>

        <div className="divide-y divide-slate-100">
          {startupIdeas.map((i) => (
            <div key={i.id} className="py-3.5 flex items-center justify-between gap-4">
              <div>
                <Link to={`/ideas/${i.id}`} className="font-bold text-sm text-slate-900 hover:text-indigo-600 block line-clamp-1">
                  {i.title}
                </Link>
                <span className="text-xs text-slate-400">
                  {i.cat} · {i.commentsCount} discussion threads · {i.upvotesCount} community votes
                </span>
              </div>
              <div className="text-right shrink-0">
                <b className="text-xl font-black text-indigo-600">{i.score}</b>
                <span className="text-xs text-slate-400 font-medium"> /100</span>
              </div>
            </div>
          ))}

          {startupIdeas.length === 0 && (
            <div className="py-6 text-center text-slate-400 text-xs">
              No ideas submitted for {selectedStartup.name} yet.
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
