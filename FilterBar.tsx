import React from 'react';
import { IdeaCategory, IdeaSortOption, IdeaStatus } from '@/types/idea';
import { cn } from '@/lib/utils';
import { SlidersHorizontal, ArrowUpDown } from 'lucide-react';

export const CATEGORIES: (IdeaCategory | 'All')[] = [
  'All',
  'Food & Culinary',
  'Beverages & Drinks',
  'Snacks & Confectionery',
  'Everyday Lifestyle',
  'Home & Kitchen Essentials',
  'Personal Care & Wellness',
];

export interface FilterBarProps {
  selectedCategory: IdeaCategory | 'All';
  onSelectCategory: (category: IdeaCategory | 'All') => void;
  selectedStatus?: IdeaStatus | 'All';
  onSelectStatus?: (status: IdeaStatus | 'All') => void;
  sortBy: IdeaSortOption;
  onSortChange: (sort: IdeaSortOption) => void;
  className?: string;
  showStatusFilter?: boolean;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedStatus = 'All',
  onSelectStatus,
  sortBy,
  onSortChange,
  className,
  showStatusFilter = false,
}) => {
  return (
    <div className={cn('space-y-3.5', className)}>
      {/* Category Pills Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={cn(
                'whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 shrink-0 border',
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
              )}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Secondary Controls: Sort & Status */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
        <div className="flex items-center gap-2">
          {showStatusFilter && onSelectStatus && (
            <div className="flex items-center gap-1.5 text-slate-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Status:</span>
              <select
                value={selectedStatus}
                onChange={(e) => onSelectStatus(e.target.value as IdeaStatus | 'All')}
                className="bg-transparent font-medium text-slate-800 border-none outline-none cursor-pointer focus:ring-0"
              >
                <option value="All">All Stages</option>
                <option value="new">New Pitch</option>
                <option value="community_validation">Community Validation</option>
                <option value="startup_review">Startup Review</option>
                <option value="testing">In Testing</option>
                <option value="validated">Validated</option>
                <option value="launch_candidate">Launch Candidate</option>
                <option value="implemented">Implemented / Launched</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-slate-500 ml-auto">
          <ArrowUpDown className="w-3.5 h-3.5" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as IdeaSortOption)}
            className="bg-transparent font-medium text-slate-800 border-none outline-none cursor-pointer focus:ring-0"
          >
            <option value="trending">🔥 Trending</option>
            <option value="most_voted">⭐ Most Voted</option>
            <option value="newest">🕒 Newest</option>
          </select>
        </div>
      </div>
    </div>
  );
};
