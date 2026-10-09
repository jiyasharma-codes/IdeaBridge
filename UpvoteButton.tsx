import React from 'react';
import { ChevronUp } from 'lucide-react';
import { cn, formatNumber } from '@/lib/utils';

export interface UpvoteButtonProps {
  count: number;
  hasUpvoted?: boolean;
  onUpvote: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md' | 'lg';
  layout?: 'vertical' | 'horizontal';
}

export const UpvoteButton: React.FC<UpvoteButtonProps> = ({
  count,
  hasUpvoted = false,
  onUpvote,
  size = 'md',
  layout = 'vertical',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpvote(e);
  };

  const isVertical = layout === 'vertical';

  const sizeClasses = {
    sm: isVertical ? 'w-10 py-1 text-xs' : 'px-2.5 py-1 text-xs gap-1',
    md: isVertical ? 'w-12 py-1.5 text-xs' : 'px-3 py-1.5 text-xs gap-1.5',
    lg: isVertical ? 'w-14 py-2 text-sm' : 'px-4 py-2 text-sm gap-2',
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={hasUpvoted ? 'Remove upvote' : 'Upvote idea'}
      className={cn(
        'group flex items-center justify-center rounded-xl border transition-all duration-150 select-none active:scale-95',
        isVertical ? 'flex-col' : 'flex-row font-medium',
        hasUpvoted
          ? 'bg-brand-50 border-brand-300 text-brand-700 shadow-sm'
          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50',
        sizeClasses[size]
      )}
    >
      <ChevronUp
        className={cn(
          'w-4 h-4 transition-transform group-hover:-translate-y-0.5',
          hasUpvoted ? 'text-brand-600 stroke-[2.5]' : 'text-slate-400 group-hover:text-slate-600'
        )}
      />
      <span
        className={cn(
          'font-semibold tabular-nums',
          hasUpvoted ? 'text-brand-700' : 'text-slate-800'
        )}
      >
        {formatNumber(count)}
      </span>
    </button>
  );
};
