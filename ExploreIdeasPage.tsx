import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';
import { Idea, IdeaSortOption } from '@/types/idea';
import { CommentModal } from '@/components/common/CommentModal';
import { MessageSquare, ArrowUp, X, ExternalLink } from 'lucide-react';

const SORT_PILLS: IdeaSortOption[] = [
  'Trending',
  'Most Validated',
  'New',
  'Most Discussed',
  'High Purchase Intent',
  'Highest Opportunity',
];

const CATEGORIES = [
  'All',
  'Food & Beverage',
  'Sneakers',
  'Clothing',
  'Technology',
  'Fragrances',
  'Gifting',
  'Accessories',
  'Packaging',
];

export const ExploreIdeasPage: React.FC = () => {
  const { ideas, upvoteIdea, globalConsumerSearch, setGlobalConsumerSearch } = useApp();

  const [selectedSort, setSelectedSort] = useState<IdeaSortOption>('Trending');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>(() => globalConsumerSearch);
  const [activeCommentIdea, setActiveCommentIdea] = useState<Idea | null>(null);
  const [selectedIdeaForModal, setSelectedIdeaForModal] = useState<Idea | null>(null);

  useEffect(() => {
    if (globalConsumerSearch) {
      setSearchQuery(globalConsumerSearch);
    }
  }, [globalConsumerSearch]);

  const effectiveSearch = searchQuery.trim() || globalConsumerSearch.trim();

  const filteredAndSortedIdeas = useMemo(() => {
    let result = [...ideas];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((i) => i.cat === selectedCategory || i.category === selectedCategory);
    }

    // Filter by Search
    if (effectiveSearch) {
      const q = effectiveSearch.toLowerCase();
      result = result.filter((i) =>
        (i.title + i.company + i.cat + i.desc + i.author.name).toLowerCase().includes(q)
      );
    }

    // Sort
    if (selectedSort === 'Most Validated') {
      result.sort((a, b) => b.score - a.score);
    } else if (selectedSort === 'Most Discussed') {
      result.sort((a, b) => b.commentsCount - a.commentsCount);
    } else if (selectedSort === 'High Purchase Intent') {
      result.sort((a, b) => b.buy - a.buy);
    } else if (selectedSort === 'Highest Opportunity') {
      result.sort((a, b) => b.opp - a.opp);
    } else if (selectedSort === 'New') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else {
      // Trending (score * 0.5 + upvotes * 0.5)
      result.sort((a, b) => b.upvotesCount - a.upvotesCount);
    }

    return result;
  }, [ideas, selectedCategory, effectiveSearch, selectedSort]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore Ideas
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Discover what other customers want companies to build.
          </p>
        </div>

        {/* Local search input */}
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search concepts or startups..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setGlobalConsumerSearch(e.target.value);
            }}
            className="w-full bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-xs"
          />
        </div>
      </div>

      {/* Sort Pills */}
      <div className="flex gap-2 flex-wrap items-center">
        {SORT_PILLS.map((pill) => (
          <button
            key={pill}
            onClick={() => setSelectedSort(pill)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedSort === pill
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Category Horizontal Row */}
      <div className="flex gap-4 overflow-x-auto pb-2 border-b border-slate-100 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap pb-1.5 text-xs font-bold transition-colors cursor-pointer border-b-2 ${
              selectedCategory === cat
                ? 'text-indigo-600 border-indigo-600'
                : 'text-slate-500 border-transparent hover:text-slate-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ideas 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedIdeas.map((idea) => {
          const isNuvie = idea.company === 'Nuvie';

          return (
            <Card
              key={idea.id}
              className="p-5 flex flex-col justify-between border-slate-200 bg-white hover:shadow-md transition-all relative group"
            >
              {/* Card Body - Clicking opens details modal */}
              <div
                onClick={() => setSelectedIdeaForModal(idea)}
                className="space-y-3 cursor-pointer"
              >
                {/* Author + Company Top */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-lg shadow-xs">
                      {idea.author.name === 'Aarav' ? '🦊' : idea.author.name === 'Ananya' ? '🌻' : idea.author.name === 'Rohan' ? '🐯' : '🙂'}
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 leading-tight">
                        {idea.author.name}
                      </div>
                      <div className="text-[11px] font-medium text-slate-400">
                        <span className={`font-bold ${isNuvie ? 'text-indigo-600' : 'text-teal-600'}`}>
                          {idea.company}
                        </span>{' '}
                        · {idea.cat}
                      </div>
                    </div>
                  </div>

                  {/* Clean Score Metric */}
                  <div className="text-right shrink-0 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-100">
                    <div className="text-xs font-black text-slate-900">{idea.score}</div>
                    <div className="text-[9px] uppercase font-extrabold tracking-wider text-slate-400">Score</div>
                  </div>
                </div>

                {/* Title & Description */}
                <div
                  onClick={() => setSelectedIdeaForModal(idea)}
                  className="cursor-pointer"
                >
                  <h3 className="font-bold text-base text-slate-900 hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                    {idea.desc}
                  </p>
                </div>

                {/* Status & Opportunity Tag */}
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-bold border border-indigo-100">
                    {idea.status}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-bold">
                    Opportunity {idea.opp}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400 ml-auto">
                    {idea.price}
                  </span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => upvoteIdea(idea.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    idea.hasUpvoted
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <ArrowUp className="w-3.5 h-3.5" />
                  <span>{idea.hasUpvoted ? 'Validated' : 'Validate'} · {idea.upvotesCount}</span>
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setSelectedIdeaForModal(idea)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-50 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Quick Details"
                  >
                    <span>Details</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCommentIdea(idea)}
                    className="p-1.5 text-slate-500 hover:text-indigo-600 rounded-lg hover:bg-slate-50 text-xs font-medium flex items-center gap-1 cursor-pointer"
                    title="Discussion"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{idea.commentsCount}</span>
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredAndSortedIdeas.length === 0 && (
        <div className="p-12 text-center text-slate-400 border border-dashed border-slate-200 rounded-3xl bg-white">
          No concepts match this filter or search term.
        </div>
      )}

      {/* Explore Idea Details Modal */}
      {selectedIdeaForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-scale-up space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    {selectedIdeaForModal.company}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-slate-500">{selectedIdeaForModal.cat}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-extrabold text-emerald-700">{selectedIdeaForModal.price}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {selectedIdeaForModal.title}
                </h2>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span>Proposed by <b>{selectedIdeaForModal.author.name}</b></span>
                  <span>·</span>
                  <span>Community Score: <b>{selectedIdeaForModal.score}/100</b></span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIdeaForModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <b className="text-slate-900 block font-bold mb-1">Problem Statement:</b>
                <p className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  {selectedIdeaForModal.problemStatement}
                </p>
              </div>

              <div>
                <b className="text-slate-900 block font-bold mb-1">Proposed Product Solution:</b>
                <p className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  {selectedIdeaForModal.proposedSolution || selectedIdeaForModal.desc}
                </p>
              </div>

              {/* Validation Signal Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base font-black text-indigo-600">{selectedIdeaForModal.upvotesCount}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Validations</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base font-black text-emerald-600">{selectedIdeaForModal.buy || 78}%</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Would Buy</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base font-black text-purple-600">{selectedIdeaForModal.opp || 82}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Opportunity</div>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <div className="text-base font-black text-slate-800">{selectedIdeaForModal.validation?.engagementRate || '12%'}</div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Engagement</div>
                </div>
              </div>

              {selectedIdeaForModal.keyBenefits && selectedIdeaForModal.keyBenefits.length > 0 && (
                <div>
                  <b className="text-slate-900 block font-bold mb-1">Key Consumer Benefits:</b>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedIdeaForModal.keyBenefits.map((benefit, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                      >
                        ✓ {benefit}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedIdeaForModal.startupReviewNotes && (
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 text-emerald-900">
                  <b className="block font-bold mb-0.5">Startup R&D Review Notes:</b>
                  <p>{selectedIdeaForModal.startupReviewNotes}</p>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <Link
                to={`/ideas/${selectedIdeaForModal.id}`}
                className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
              >
                <span>Full Idea Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    upvoteIdea(selectedIdeaForModal.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                    selectedIdeaForModal.hasUpvoted
                      ? 'bg-teal-50 text-teal-700 border border-teal-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm'
                  }`}
                >
                  <ArrowUp className="w-4 h-4" />
                  <span>
                    {selectedIdeaForModal.hasUpvoted ? 'Validated (+1)' : 'Validate Idea'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const idea = selectedIdeaForModal;
                    setSelectedIdeaForModal(null);
                    setActiveCommentIdea(idea);
                  }}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Comment ({selectedIdeaForModal.commentsCount})</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comment Modal */}
      <CommentModal
        idea={activeCommentIdea}
        isOpen={Boolean(activeCommentIdea)}
        onClose={() => setActiveCommentIdea(null)}
      />
    </div>
  );
};
