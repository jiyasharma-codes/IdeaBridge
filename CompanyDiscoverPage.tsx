import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { IdeaCategory, IdeaStatus } from '@/types/idea';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/common/SearchBar';
import { StatusBadge } from '@/features/ideas/StatusBadge';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import { CATEGORIES } from '@/components/common/FilterBar';
import {
  Compass,
  Building2,
  Bookmark,
  ThumbsUp,
  SlidersHorizontal,
  Table as TableIcon,
  LayoutGrid,
  TrendingUp,
  Tag,
  CheckCircle2,
} from 'lucide-react';

const STATUS_FILTER_OPTIONS: { value: IdeaStatus | 'All'; label: string }[] = [
  { value: 'All', label: 'All Lifecycle Stages' },
  { value: 'New', label: '1. New Submissions' },
  { value: 'Under Review', label: '2. Under Review' },
  { value: 'Shortlisted', label: '3. Shortlisted & Feasibility' },
  { value: 'Testing', label: '4. Testing & Prototyping' },
  { value: 'Prototype', label: '5. Validated Demand' },
  { value: 'Launched', label: '6. Launch Candidate' },
  { value: 'Implemented', label: '7. Implemented Products' },
];

export const CompanyDiscoverPage: React.FC = () => {
  const { ideas, selectedStartup, toggleShortlist, updateIdeaStatus } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<IdeaCategory | 'All'>('All');
  const [selectedStatus, setSelectedStatus] = useState<IdeaStatus | 'All'>('All');
  const [startupFilter, setStartupFilter] = useState<string>('all'); // 'all' | 'my_startup'
  const [minDemandPercentage, setMinDemandPercentage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Evaluation Modal
  const [evaluatingIdeaId, setEvaluatingIdeaId] = useState<string | null>(null);
  const [evalStatus, setEvalStatus] = useState<IdeaStatus>('Shortlisted');
  const [evalPriority, setEvalPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [evalNotes, setEvalNotes] = useState('');
  const [evalTestingDetails, setEvalTestingDetails] = useState('');

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      if (selectedCategory !== 'All' && idea.category !== selectedCategory) return false;
      if (selectedStatus !== 'All' && idea.status !== selectedStatus) return false;

      if (startupFilter === 'my_startup') {
        if (idea.targetStartupName !== selectedStartup.name) return false;
      } else if (startupFilter !== 'all') {
        if (idea.targetStartupName !== startupFilter) return false;
      }

      if (minDemandPercentage > 0 && (idea.validation?.wouldTryPercentage || 0) < minDemandPercentage) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = idea.title.toLowerCase().includes(q);
        const matchTagline = idea.tagline.toLowerCase().includes(q);
        const matchStartup = idea.targetStartupName?.toLowerCase().includes(q);
        const matchTags = idea.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchTagline && !matchStartup && !matchTags) return false;
      }

      return true;
    });
  }, [ideas, selectedCategory, selectedStatus, startupFilter, selectedStartup.name, minDemandPercentage, searchQuery]);

  const activeEvaluatingIdea = ideas.find((i) => i.id === evaluatingIdeaId);

  const handleOpenEvalModal = (ideaId: string) => {
    const idea = ideas.find((i) => i.id === ideaId);
    if (!idea) return;
    setEvaluatingIdeaId(ideaId);
    setEvalStatus(idea.status);
    setEvalPriority(idea.shortlistPriority || 'medium');
    setEvalNotes(idea.startupReviewNotes || '');
    setEvalTestingDetails(idea.testingPhaseDetails || '');
  };

  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!evaluatingIdeaId) return;
    updateIdeaStatus(evaluatingIdeaId, evalStatus);
    setEvaluatingIdeaId(null);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="enterprise" size="sm" className="gap-1 font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Startup Scouting & Evaluation Engine</span>
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Verified Consumer Product Concepts
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Evaluate organic community submissions, review willingness-to-try signals (% would try, target ₹ price points),
            and transition high-potential ideas through testing and commercialization.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'table' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TableIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Data Table</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <Card className="p-5 space-y-4 border-slate-200/80 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search concepts, target startups (e.g. Nuvie, Desi Go), tags..."
            />
          </div>

          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as IdeaCategory | 'All')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-emerald-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  Category: {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as IdeaStatus | 'All')}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-medium text-slate-800 focus:ring-emerald-500"
            >
              {STATUS_FILTER_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Quick Filter Pills */}
        <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100 flex-wrap text-xs text-slate-500">
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">Demand Signal Filter:</span>
            <button
              onClick={() => setMinDemandPercentage(0)}
              className={`px-2.5 py-1 rounded-lg border text-xs transition-all ${
                minDemandPercentage === 0
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              All Demand
            </button>
            <button
              onClick={() => setMinDemandPercentage(70)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                minDemandPercentage === 70
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-emerald-700 border-emerald-200 hover:bg-emerald-50'
              }`}
            >
              &gt; 70% Would Try
            </button>
            <button
              onClick={() => setMinDemandPercentage(80)}
              className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                minDemandPercentage === 80
                  ? 'bg-teal-600 text-white border-teal-600'
                  : 'bg-white text-teal-700 border-teal-200 hover:bg-teal-50'
              }`}
            >
              &gt; 80% Would Try (High Demand)
            </button>
          </div>

          {/* Startup Target Filter */}
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-500">Startup Focus:</span>
            <select
              value={startupFilter}
              onChange={(e) => setStartupFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
            >
              <option value="all">All Startups</option>
              <option value="my_startup">Targeting {selectedStartup.name} Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>
          Showing <strong className="text-slate-800">{filteredIdeas.length}</strong> concepts
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {selectedStatus !== 'All' && ` (${selectedStatus})`}
        </span>
        {filteredIdeas.length === 0 && (
          <span className="text-amber-600 font-medium">Try clearing filters or search terms.</span>
        )}
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <Card
              key={idea.id}
              className="p-5 flex flex-col justify-between border-slate-200/90 hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="brand" size="sm">
                    {idea.category}
                  </Badge>
                  <StatusBadge status={idea.status} size="sm" />
                </div>

                <Link
                  to={`/ideas/${idea.id}`}
                  className="font-bold text-base text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2 mb-1.5"
                >
                  {idea.title}
                </Link>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                  {idea.tagline}
                </p>

                {/* Validation Signal Strip */}
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-2 mb-3">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Demand Signal</span>
                    <span className="text-xs font-extrabold text-emerald-700 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {idea.validation.wouldTryPercentage}% would try
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-semibold block uppercase">Target Price</span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                      <Tag className="w-3 h-3 text-slate-400" />
                      {idea.validation.targetPriceRange}
                    </span>
                  </div>
                </div>

                {idea.targetStartupName && (
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 font-semibold mb-3">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Targeted: <strong className="text-slate-800">{idea.targetStartupName}</strong></span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 mb-3">
                  {idea.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200/50">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                    {idea.upvotesCount}
                  </span>
                  <span>{idea.commentsCount} comments</span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenEvalModal(idea.id)}
                    className="text-xs font-semibold"
                  >
                    Evaluate
                  </Button>
                  <Button
                    variant={idea.isShortlisted ? 'enterprise' : 'outline'}
                    size="sm"
                    onClick={() => toggleShortlist(idea.id)}
                    leftIcon={<Bookmark className="w-3.5 h-3.5" />}
                    className="text-xs"
                  >
                    {idea.isShortlisted ? 'Shortlisted' : 'Shortlist'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <Card className="p-0 overflow-x-auto border-slate-200">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Concept Title & Category</th>
                <th className="py-3 px-4">Target Startup</th>
                <th className="py-3 px-4">Willingness to Try</th>
                <th className="py-3 px-4">Target Price</th>
                <th className="py-3 px-4">Lifecycle Stage</th>
                <th className="py-3 px-4 text-right">Scouting Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredIdeas.map((idea) => (
                <tr key={idea.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 max-w-xs">
                    <Link to={`/ideas/${idea.id}`} className="font-bold text-slate-900 hover:text-emerald-700 block line-clamp-1">
                      {idea.title}
                    </Link>
                    <span className="text-[11px] text-slate-400">{idea.category}</span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-700">
                    {idea.targetStartupName || 'General Market'}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {idea.validation.wouldTryPercentage}% would try
                    </span>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap font-semibold text-slate-800">
                    {idea.validation.targetPriceRange}
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={idea.status} size="sm" />
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleOpenEvalModal(idea.id)}
                      className="text-xs px-2.5 py-1 rounded-lg border border-slate-300 font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      Evaluate
                    </button>
                    <button
                      onClick={() => toggleShortlist(idea.id)}
                      className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                        idea.isShortlisted
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-700'
                          : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {idea.isShortlisted ? 'Shortlisted' : '+ Shortlist'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Scout / Evaluation Modal */}
      {evaluatingIdeaId && activeEvaluatingIdea && (
        <Modal
          isOpen={Boolean(evaluatingIdeaId)}
          onClose={() => setEvaluatingIdeaId(null)}
          maxWidth="lg"
          title={
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Evaluate & Advance Concept Stage</span>
            </div>
          }
          description={`Update lifecycle stage and internal formulation/review notes for "${activeEvaluatingIdea.title}"`}
        >
          <form onSubmit={handleSaveEvaluation} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Startup:</span>
                <strong className="text-slate-800">{activeEvaluatingIdea.targetStartupName || 'Open Market'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Validation Signals:</span>
                <strong className="text-emerald-700">
                  {activeEvaluatingIdea.validation.wouldTryPercentage}% would try • {activeEvaluatingIdea.validation.targetPriceRange}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Lifecycle Stage
                </label>
                <select
                  value={evalStatus}
                  onChange={(e) => setEvalStatus(e.target.value as IdeaStatus)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-semibold text-slate-800 focus:ring-emerald-500"
                >
                  <option value="new">1. New Submission</option>
                  <option value="community_validation">2. Community Validation</option>
                  <option value="startup_review">3. Startup Review & Feasibility</option>
                  <option value="testing">4. Testing & Prototyping (Recipe / Bench)</option>
                  <option value="validated">5. Validated Demand</option>
                  <option value="launch_candidate">6. Launch Candidate</option>
                  <option value="implemented">7. Implemented / Commercial Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Priority
                </label>
                <select
                  value={evalPriority}
                  onChange={(e) => setEvalPriority(e.target.value as 'high' | 'medium' | 'low')}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-semibold text-slate-800 focus:ring-emerald-500"
                >
                  <option value="high">High Priority (Urgent Pipeline)</option>
                  <option value="medium">Medium Priority (Standard Review)</option>
                  <option value="low">Low Priority (Passive Monitoring)</option>
                </select>
              </div>
            </div>

            <Textarea
              label="Startup Review & Feasibility Notes"
              placeholder="e.g. Evaluated ingredient availability, packaging barrier requirements, and targeted shelf-life..."
              value={evalNotes}
              onChange={(e) => setEvalNotes(e.target.value)}
              rows={3}
            />

            <Input
              label="Testing & Prototyping Phase Details (if in Testing/Validation)"
              placeholder="e.g. Batch #2 pilot tasting completed; 82% sensory approval rating..."
              value={evalTestingDetails}
              onChange={(e) => setEvalTestingDetails(e.target.value)}
            />

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  toggleShortlist(evaluatingIdeaId);
                }}
                className="text-xs text-slate-600 hover:text-slate-900"
              >
                {activeEvaluatingIdea.isShortlisted ? 'Remove from Shortlist' : 'Add to Shortlist'}
              </button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => setEvaluatingIdeaId(null)}>
                  Cancel
                </Button>
                <Button variant="enterprise" size="sm" type="submit">
                  Save Evaluation
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
