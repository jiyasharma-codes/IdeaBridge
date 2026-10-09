import React from 'react';
import { Link } from 'react-router-dom';
import { Idea } from '@/types/idea';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { StatusBadge } from './StatusBadge';
import { UpvoteButton } from './UpvoteButton';
import { useApp } from '@/context/AppContext';
import { MessageSquare, Building2, Bookmark, Trophy, CheckCircle2 } from 'lucide-react';
import { timeAgo } from '@/lib/utils';

export interface IdeaCardProps {
  idea: Idea;
  showStartupActions?: boolean;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, showStartupActions = false }) => {
  const { upvoteIdea, toggleShortlist } = useApp();

  return (
    <Card hoverEffect className="flex flex-col justify-between h-full p-0 overflow-hidden transition-all border-slate-200/90 shadow-sm bg-white">
      {/* Supporting image if provided */}
      {idea.imageUrl && (
        <Link to={`/ideas/${idea.id}`} className="block relative h-44 overflow-hidden bg-slate-100 group">
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <Badge variant="brand" size="sm" className="bg-white/95 backdrop-blur-sm shadow-sm font-semibold">
              {idea.category}
            </Badge>
            {idea.challengeName && (
              <Badge variant="warning" size="sm" className="bg-amber-500/95 text-white border-transparent backdrop-blur-sm">
                <Trophy className="w-3 h-3 mr-1" />
                Challenge
              </Badge>
            )}
          </div>
        </Link>
      )}

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Card Header if no image */}
          {!idea.imageUrl && (
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="brand" size="sm">
                  {idea.category}
                </Badge>
                {idea.challengeName && (
                  <Badge variant="warning" size="sm">
                    <Trophy className="w-3 h-3 mr-1" />
                    Challenge
                  </Badge>
                )}
                <StatusBadge status={idea.status} size="sm" />
              </div>

              {(idea.targetStartupName) && (
                <div className="flex items-center gap-1 text-xs text-slate-600 font-semibold bg-slate-100/90 px-2.5 py-0.5 rounded-md">
                  <Building2 className="w-3 h-3 text-emerald-600" />
                  <span>{idea.targetStartupName}</span>
                </div>
              )}
            </div>
          )}

          {idea.imageUrl && (
            <div className="flex items-center justify-between gap-2 mb-3">
              <StatusBadge status={idea.status} size="sm" />
              {(idea.targetStartupName) && (
                <div className="flex items-center gap-1 text-xs text-slate-600 font-semibold bg-slate-100/90 px-2.5 py-0.5 rounded-md">
                  <Building2 className="w-3 h-3 text-emerald-600" />
                  <span>{idea.targetStartupName}</span>
                </div>
              )}
            </div>
          )}

          {/* Title & Tagline */}
          <Link to={`/ideas/${idea.id}`} className="group block mb-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors line-clamp-2 leading-snug">
              {idea.title}
            </h3>
          </Link>
          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-3.5 leading-relaxed">
            {idea.tagline}
          </p>

          {/* Community Validation Mini Signal Bar */}
          {idea.validation && (
            <div className="mb-4 p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
              <div className="flex items-center gap-1 font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{idea.validation.wouldTryPercentage}% would try</span>
              </div>
              <span className="text-slate-400">•</span>
              <span className="font-medium text-slate-700">
                Target: {idea.validation.targetPriceRange}
              </span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {idea.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium text-slate-500 bg-slate-50 border border-slate-200/60 px-2 py-0.5 rounded-md"
              >
                #{tag}
              </span>
            ))}
            {idea.tags.length > 3 && (
              <span className="text-[11px] font-medium text-slate-400 self-center">
                +{idea.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Card Footer: Metadata & Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 mt-2">
          {/* Author clean initials avatar */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] border border-slate-200 shrink-0">
              {idea.author.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-800 truncate">{idea.author.name}</p>
              <p className="text-[10px] text-slate-400">{timeAgo(idea.createdAt)}</p>
            </div>
          </div>

          {/* Engagement and Actions */}
          <div className="flex items-center gap-2">
            {/* Startup Shortlist Button when in startup view */}
            {showStartupActions && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleShortlist(idea.id);
                }}
                title={idea.isShortlisted ? 'Remove from shortlist' : 'Shortlist idea'}
                className={`p-2 rounded-xl border transition-all ${
                  idea.isShortlisted
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${idea.isShortlisted ? 'fill-emerald-600 text-emerald-600' : ''}`} />
              </button>
            )}

            {/* Comment Count */}
            <Link
              to={`/ideas/${idea.id}#comments`}
              className="flex items-center gap-1 px-2 py-1.5 text-xs text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="font-semibold">{idea.commentsCount}</span>
            </Link>

            {/* Upvote Button */}
            <UpvoteButton
              count={idea.upvotesCount}
              hasUpvoted={idea.hasUpvoted}
              onUpvote={() => upvoteIdea(idea.id)}
              size="sm"
              layout="horizontal"
            />
          </div>
        </div>
      </div>
    </Card>
  );
};
