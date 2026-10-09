import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { IdeaStatus } from '@/types/idea';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Textarea } from '@/components/ui/Textarea';
import { Input } from '@/components/ui/Input';
import {
  Layers,
  Building2,
  ThumbsUp,
  Trash2,
  FileEdit,
  Compass,
  TrendingUp,
  Tag,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

const PIPELINE_COLUMNS: { id: IdeaStatus; label: string; desc: string; color: string; badgeBg: string }[] = [
  {
    id: 'Shortlisted',
    label: '1. Review & Feasibility',
    desc: 'Evaluating ingredient sourcing & concept fit',
    color: 'border-blue-400',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'Testing',
    label: '2. Testing & Prototyping',
    desc: 'Recipe formulation & batch tasting trials',
    color: 'border-amber-400',
    badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'Prototype',
    label: '3. Validated Demand',
    desc: 'High trial intent & target pricing confirmed',
    color: 'border-teal-400',
    badgeBg: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    id: 'Launched',
    label: '4. Launch Candidate',
    desc: 'Packaging label finalization & retail prep',
    color: 'border-emerald-500',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
];

export const CompanyShortlistPage: React.FC = () => {
  const { ideas, selectedStartup, toggleShortlist, updateIdeaStatus } = useApp();

  const [editingIdeaId, setEditingIdeaId] = useState<string | null>(null);
  const [targetStage, setTargetStage] = useState<IdeaStatus>('Shortlisted');
  const [targetPriority, setTargetPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [notes, setNotes] = useState('');
  const [testingDetails, setTestingDetails] = useState('');
  const [filterStartupOnly, setFilterStartupOnly] = useState(false);

  // Ideas that are shortlisted or in active pipeline
  const pipelineIdeas = ideas.filter((i) => {
    const inPipeline =
      i.isShortlisted ||
      ['Shortlisted', 'Testing', 'Prototype', 'Launched'].includes(i.status);

    if (!inPipeline) return false;
    if (filterStartupOnly && i.targetStartupName !== selectedStartup.name) return false;
    return true;
  });

  const handleOpenEdit = (ideaId: string) => {
    const idea = ideas.find((i) => i.id === ideaId);
    if (!idea) return;
    setEditingIdeaId(ideaId);
    const stage = (
      ['Shortlisted', 'Testing', 'Prototype', 'Launched', 'Implemented'].includes(idea.status)
        ? idea.status
        : 'Shortlisted'
    ) as IdeaStatus;
    setTargetStage(stage);
    setTargetPriority(idea.shortlistPriority || 'medium');
    setNotes(idea.startupReviewNotes || '');
    setTestingDetails(idea.testingPhaseDetails || '');
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingIdeaId) return;
    updateIdeaStatus(editingIdeaId, targetStage);
    setEditingIdeaId(null);
  };

  const handleQuickAdvance = (ideaId: string, currentStage: IdeaStatus) => {
    const stageFlow: IdeaStatus[] = ['Shortlisted', 'Testing', 'Prototype', 'Launched', 'Implemented'];
    const currentIndex = stageFlow.indexOf(currentStage);
    if (currentIndex >= 0 && currentIndex < stageFlow.length - 1) {
      const nextStage = stageFlow[currentIndex + 1];
      updateIdeaStatus(ideaId, nextStage);
    }
  };


  const activeEditingIdea = ideas.find((i) => i.id === editingIdeaId);

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="enterprise" size="sm" className="gap-1 font-bold">
              <Layers className="w-3.5 h-3.5" />
              <span>Pipeline & Innovation Kanban</span>
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Shortlisted R&D Innovation Pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Track, formulate, and advance community co-creation concepts from initial feasibility
            review into batch tasting trials, validated demand, and retail launch readiness.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStartupOnly(!filterStartupOnly)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
              filterStartupOnly
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            {filterStartupOnly ? `Showing ${selectedStartup.name} Only` : 'Showing All Startups'}
          </button>

          <Link to="/company/discover">
            <Button variant="outline" size="sm" leftIcon={<Compass className="w-4 h-4" />}>
              + Scout More
            </Button>
          </Link>
        </div>
      </div>

      {/* 4-Column Pipeline Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {PIPELINE_COLUMNS.map((col) => {
          const colIdeas = pipelineIdeas.filter((i) => {
            if (col.id === 'Shortlisted') {
              // Include unassigned shortlisted ideas here as default initial intake
              return i.status === 'Shortlisted' || i.status === 'New' || i.status === 'Under Review';
            }
            return i.status === col.id;
          });

          return (
            <div
              key={col.id}
              className={`rounded-2xl bg-slate-100/80 p-4 flex flex-col justify-between min-h-[520px] border-t-4 ${col.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    {col.label}
                  </h3>
                  <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full border border-slate-200 text-slate-700">
                    {colIdeas.length}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mb-4 leading-snug">{col.desc}</p>

                {/* Ideas in this column */}
                <div className="space-y-3">
                  {colIdeas.map((idea) => (
                    <Card
                      key={idea.id}
                      className="p-4 space-y-3 border-slate-200 bg-white hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-1">
                        <Badge variant="neutral" size="sm">
                          {idea.category}
                        </Badge>
                        <span
                          className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                            idea.shortlistPriority === 'high'
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : idea.shortlistPriority === 'low'
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {idea.shortlistPriority || 'medium'}
                        </span>
                      </div>

                      <Link to={`/ideas/${idea.id}`} className="block">
                        <h4 className="font-bold text-sm text-slate-900 hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                          {idea.title}
                        </h4>
                      </Link>

                      {/* Validation Signal Mini Strip */}
                      <div className="flex items-center justify-between text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                        <span className="font-extrabold text-emerald-700 flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {idea.validation.wouldTryPercentage}% would try
                        </span>
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <Tag className="w-3 h-3 text-slate-400" />
                          {idea.validation.targetPriceRange}
                        </span>
                      </div>

                      {idea.targetStartupName && (
                        <div className="text-[11px] text-slate-500 font-semibold flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400" />
                          <span>{idea.targetStartupName}</span>
                        </div>
                      )}

                      {/* Notes / Testing Details Preview */}
                      {(idea.testingPhaseDetails || idea.startupReviewNotes) && (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 italic line-clamp-3">
                          "{idea.testingPhaseDetails || idea.startupReviewNotes}"
                        </div>
                      )}

                      {/* Card Footer Actions */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
                          {idea.upvotesCount}
                        </span>

                        <div className="flex items-center gap-1.5">
                          {col.id !== 'Launched' && (
                            <button
                              onClick={() => handleQuickAdvance(idea.id, col.id)}
                              className="p-1 px-1.5 text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded flex items-center gap-0.5 font-bold"
                              title="Advance to Next Stage"
                            >
                              <span>Advance</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenEdit(idea.id)}
                            className="p-1 text-slate-400 hover:text-emerald-600 rounded"
                            title="Edit Stage & Notes"
                          >
                            <FileEdit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => toggleShortlist(idea.id)}
                            className="p-1 text-slate-400 hover:text-rose-600 rounded"
                            title="Remove from Pipeline"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}

                  {colIdeas.length === 0 && (
                    <div className="p-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white/60">
                      No concepts currently in this stage.
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Pipeline Stage & Notes Modal */}
      {editingIdeaId && activeEditingIdea && (
        <Modal
          isOpen={Boolean(editingIdeaId)}
          onClose={() => setEditingIdeaId(null)}
          maxWidth="lg"
          title={
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Update Innovation Pipeline Stage & Notes</span>
            </div>
          }
          description={`Formulation, testing and stage management for "${activeEditingIdea.title}"`}
        >
          <form onSubmit={handleSaveEdit} className="space-y-4">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Target Partner:</span>
                <strong className="text-slate-800">{activeEditingIdea.targetStartupName || 'General Market'}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Validation Signals:</span>
                <strong className="text-emerald-700">
                  {activeEditingIdea.validation.wouldTryPercentage}% would try • {activeEditingIdea.validation.targetPriceRange}
                </strong>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Pipeline Stage
                </label>
                <select
                  value={targetStage}
                  onChange={(e) => setTargetStage(e.target.value as IdeaStatus)}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-semibold text-slate-800 focus:ring-emerald-500"
                >
                  <option value="startup_review">1. Review & Feasibility</option>
                  <option value="testing">2. Testing & Prototyping (Bench Trial)</option>
                  <option value="validated">3. Validated Demand (Consumer Confirmed)</option>
                  <option value="launch_candidate">4. Launch Candidate (Final Packaging)</option>
                  <option value="implemented">5. Implemented / Commercial Launch</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Priority
                </label>
                <select
                  value={targetPriority}
                  onChange={(e) => setTargetPriority(e.target.value as 'high' | 'medium' | 'low')}
                  className="w-full text-xs rounded-xl border border-slate-200 p-2.5 font-semibold text-slate-800 focus:ring-emerald-500"
                >
                  <option value="high">High Priority (Lab Fast-Track)</option>
                  <option value="medium">Medium Priority (Standard Schedule)</option>
                  <option value="low">Low Priority (Passive Observation)</option>
                </select>
              </div>
            </div>

            <Textarea
              label="Startup Review & Feasibility Notes"
              placeholder="e.g. Conducted ingredient supplier check; shelf-life targets aligned with current packaging line..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />

            <Input
              label="Testing & Formulation Details (Visible to creator on idea page)"
              placeholder="e.g. Batch #1 sensory testing with 30-member panel scored 4.7/5 on taste balance..."
              value={testingDetails}
              onChange={(e) => setTestingDetails(e.target.value)}
            />

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button variant="ghost" size="sm" onClick={() => setEditingIdeaId(null)}>
                Cancel
              </Button>
              <Button variant="enterprise" size="sm" type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
