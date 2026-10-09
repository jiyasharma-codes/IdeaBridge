import React, { useState, useMemo } from 'react';
import { Idea, IdeaCategory, IdeaSortOption, IdeaStatus } from '@/types/idea';
import { IdeaCard } from './IdeaCard';
import { SearchBar } from '@/components/common/SearchBar';
import { FilterBar } from '@/components/common/FilterBar';
import { EmptyState } from '@/components/common/EmptyState';

export interface IdeaFeedProps {
  ideas: Idea[];
  title?: string;
  subtitle?: string;
  showFilters?: boolean;
  initialCategory?: IdeaCategory | 'All';
  initialStatus?: IdeaStatus | 'All';
  initialSort?: IdeaSortOption;
}

export const IdeaFeed: React.FC<IdeaFeedProps> = ({
  ideas,
  title,
  subtitle,
  showFilters = true,
  initialCategory = 'All',
  initialStatus = 'All',
  initialSort = 'trending',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory | 'All'>(initialCategory);
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus | 'All'>(initialStatus);
  const [sortBy, setSortBy] = useState<IdeaSortOption>(initialSort);

  const filteredIdeas = useMemo(() => {
    return ideas
      .filter((idea) => {
        // Category filter
        if (selectedCategory !== 'All' && idea.category !== selectedCategory) {
          return false;
        }
        // Status filter
        if (selectedStatus !== 'All' && idea.status !== selectedStatus) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = idea.title.toLowerCase().includes(q);
          const matchTagline = idea.tagline.toLowerCase().includes(q);
          const matchTarget = idea.targetStartupName?.toLowerCase().includes(q);
          const matchTags = idea.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchTagline && !matchTarget && !matchTags) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'trending') {
          // Weighted formula for trending (upvotes + comments * 2)
          const scoreA = a.upvotesCount + a.commentsCount * 2;
          const scoreB = b.upvotesCount + b.commentsCount * 2;
          return scoreB - scoreA;
        }
        if (sortBy === 'most_voted') {
          return b.upvotesCount - a.upvotesCount;
        }
        if (sortBy === 'newest') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        return 0;
      });
  }, [ideas, selectedCategory, selectedStatus, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedStatus('All');
    setSortBy('trending');
  };

  return (
    <div className="space-y-6">
      {/* Header and Search */}
      {(title || showFilters) && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {title && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  {title}
                </h2>
                {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
              </div>
            )}
            {showFilters && (
              <div className="w-full sm:max-w-xs">
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search ideas or keywords..."
                />
              </div>
            )}
          </div>

          {showFilters && (
            <FilterBar
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              selectedStatus={selectedStatus}
              onSelectStatus={setSelectedStatus}
              sortBy={sortBy}
              onSortChange={setSortBy}
              showStatusFilter={true}
            />
          )}
        </div>
      )}

      {/* Ideas Grid */}
      {filteredIdeas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredIdeas.map((idea) => (
            <IdeaCard key={idea.id} idea={idea} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No product ideas match your criteria"
          description="Try modifying your category selection, clearing search keywords, or selecting a different status filter."
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
};
