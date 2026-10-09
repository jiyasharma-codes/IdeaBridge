import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/features/ideas/StatusBadge';
import { BookmarkCheck, ArrowRight, ThumbsUp, Building2, Trash2 } from 'lucide-react';

export const ShortlistBoard: React.FC = () => {
  const { ideas, toggleShortlist } = useApp();

  const shortlistedIdeas = ideas.filter((i) => i.isShortlisted);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <BookmarkCheck className="w-5 h-5 text-emerald-600" />
            Company Innovation Pipeline
          </h3>
          <p className="text-xs sm:text-sm text-slate-500">
            Ideas flagged by your enterprise scouting team for feasibility analysis and consumer co-creation.
          </p>
        </div>
        <Badge variant="enterprise" size="md">
          {shortlistedIdeas.length} Shortlisted Concepts
        </Badge>
      </div>

      {shortlistedIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortlistedIdeas.map((idea) => (
            <Card key={idea.id} className="p-5 flex flex-col justify-between border-slate-200 hover:border-emerald-300 transition-colors">
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="neutral" size="sm">
                      {idea.category}
                    </Badge>
                    <StatusBadge status={idea.status} size="sm" />
                  </div>
                  {idea.validation && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200/60">
                      {idea.validation.wouldTryPercentage}% would try
                    </span>
                  )}
                </div>

                <Link
                  to={`/ideas/${idea.id}`}
                  className="font-bold text-slate-900 hover:text-emerald-700 transition-colors line-clamp-1 text-base"
                >
                  {idea.title}
                </Link>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 mb-3">
                  {idea.tagline}
                </p>

                {idea.targetStartupName && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mb-3">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span>Targeted Startup: {idea.targetStartupName}</span>
                  </div>
                )}

                <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1 text-slate-600 border border-slate-100">
                  <div className="font-semibold text-slate-700">Author:</div>
                  <div className="flex items-center justify-between">
                    <span>{idea.author.name} (@{idea.author.username})</span>
                    <span className="text-slate-400">Karma: {idea.author.reputationScore}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <ThumbsUp className="w-3.5 h-3.5 text-brand-600" />
                    {idea.upvotesCount}
                  </span>
                  {idea.validation && (
                    <span>Price: <strong className="text-slate-800">{idea.validation.targetPriceRange}</strong></span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleShortlist(idea.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Remove from shortlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <Link to={`/ideas/${idea.id}`}>
                    <Button variant="outline" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                      Review Detail
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
          <p className="text-sm text-slate-600 font-medium">No ideas currently shortlisted.</p>
          <p className="text-xs text-slate-400 mt-1">
            Browse the public innovation feed and click the bookmark icon on any idea card to evaluate it here.
          </p>
        </div>
      )}
    </div>
  );
};
