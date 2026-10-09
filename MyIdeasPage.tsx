import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { ShareIdeaModal } from '@/components/common/ShareIdeaModal';
import { PlusCircle, X } from 'lucide-react';
import { Idea } from '@/types/idea';

type MyIdeasTab = 'All' | 'Drafts' | 'Submitted' | 'Shortlisted' | 'Saved' | 'Implemented';

export const MyIdeasPage: React.FC = () => {
  const { ideas, draftIdeas, submitDraftIdea } = useApp();
  const [currentTab, setCurrentTab] = useState<MyIdeasTab>('All');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState<Idea | null>(null);

  const shortlistedIdeas = ideas.filter((i) => i.status === 'Shortlisted');
  const counts = {
    All: ideas.length + draftIdeas.length,
    Drafts: draftIdeas.length,
    Submitted: ideas.length,
    Shortlisted: shortlistedIdeas.length,
    Saved: ideas.filter((i) => i.hasUpvoted).length || 4,
    Implemented: ideas.filter((i) => i.status === 'Implemented' || i.status === 'Launched').length || 1,
  };

  const tabs: MyIdeasTab[] = ['All', 'Drafts', 'Submitted', 'Shortlisted', 'Saved', 'Implemented'];

  const handleSubmitDraft = (draftId: string) => {
    submitDraftIdea(draftId);
    setSelectedDraft(null);
    setCurrentTab('Submitted');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            My Ideas
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Track drafts, submissions, validation and company progress.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsShareModalOpen(true)}
          leftIcon={<PlusCircle className="w-4 h-4" />}
          className="font-bold self-start sm:self-auto"
        >
          ＋ New Idea
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setCurrentTab(tab)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              currentTab === tab
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300'
            }`}
          >
            {tab} · {counts[tab]}
          </button>
        ))}
      </div>

      {/* Table Card matching prototype */}
      <Card className="p-0 overflow-x-auto border-slate-200 bg-white">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
            <tr>
              <th className="py-3 px-5">Idea</th>
              <th className="py-3 px-4">Company</th>
              <th className="py-3 px-4">Validation</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Action / Last update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {currentTab === 'Drafts' && (
              <>
                {draftIdeas.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-400">
                      No draft ideas currently. Click ＋ New Idea to create one.
                    </td>
                  </tr>
                ) : (
                  draftIdeas.map((draft) => (
                    <tr
                      key={draft.id}
                      onClick={() => setSelectedDraft(draft)}
                      className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-5">
                        <b className="text-slate-900 hover:text-indigo-600 transition-colors">{draft.title}</b>
                        <div className="text-[11px] text-slate-400">{draft.cat}</div>
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-800">{draft.company}</td>
                      <td className="py-3.5 px-4 text-slate-400">—</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 font-bold border border-amber-200">
                          Draft
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <span className="text-indigo-600 font-bold hover:underline">Review & Submit →</span>
                      </td>
                    </tr>
                  ))
                )}
              </>
            )}

            {currentTab === 'Shortlisted' &&
              shortlistedIdeas.map((i, idx) => (
                <tr key={i.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-5">
                    <Link to={`/ideas/${i.id}`} className="font-bold text-slate-900 hover:text-indigo-600 block">
                      {i.title}
                    </Link>
                    <div className="text-[11px] text-slate-400">{i.cat}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{i.company}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{i.score}/100</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      Shortlisted
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400">{idx + 1} day ago</td>
                </tr>
              ))}

            {currentTab === 'Implemented' && (
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-5">
                  <b className="text-slate-900">Peanut Butter Crunch Protein Bar</b>
                  <div className="text-[11px] text-slate-400">Food & Beverage</div>
                </td>
                <td className="py-3.5 px-4 font-semibold text-slate-800">Nuvie</td>
                <td className="py-3.5 px-4 font-bold text-emerald-700">96/100</td>
                <td className="py-3.5 px-4">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                    Implemented
                  </span>
                </td>
                <td className="py-3.5 px-5 text-right text-slate-400">18 days ago</td>
              </tr>
            )}

            {currentTab === 'Saved' &&
              ideas.slice(2, 7).map((i, idx) => (
                <tr key={i.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-5">
                    <Link to={`/ideas/${i.id}`} className="font-bold text-slate-900 hover:text-indigo-600 block">
                      {i.title}
                    </Link>
                    <div className="text-[11px] text-slate-400">{i.cat}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{i.company}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{i.score}/100</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                      Saved
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400">{idx + 2} days ago</td>
                </tr>
              ))}

            {currentTab === 'Submitted' &&
              ideas.slice(0, 7).map((i, idx) => (
                <tr key={i.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-5">
                    <Link to={`/ideas/${i.id}`} className="font-bold text-slate-900 hover:text-indigo-600 block">
                      {i.title}
                    </Link>
                    <div className="text-[11px] text-slate-400">{i.cat}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{i.company}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{i.score}/100</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 font-bold border border-indigo-100">
                      {i.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400">{idx + 1} day ago</td>
                </tr>
              ))}

            {currentTab === 'All' &&
              ideas.map((i, idx) => (
                <tr key={i.id} className="hover:bg-slate-50/60">
                  <td className="py-3.5 px-5">
                    <Link to={`/ideas/${i.id}`} className="font-bold text-slate-900 hover:text-indigo-600 block">
                      {i.title}
                    </Link>
                    <div className="text-[11px] text-slate-400">{i.cat}</div>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{i.company}</td>
                  <td className="py-3.5 px-4 font-bold text-slate-900">{i.score}/100</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold border ${
                        i.status === 'Shortlisted' || i.status === 'Implemented'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border-indigo-100'
                      }`}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right text-slate-400">{idx + 1} day ago</td>
                </tr>
              ))}
          </tbody>
        </table>
      </Card>

      <ShareIdeaModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Draft Review & Submit Modal */}
      {selectedDraft && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-scale-up space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Draft Idea Review
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                  {selectedDraft.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">{selectedDraft.company}</span>
                  <span>·</span>
                  <span>{selectedDraft.cat}</span>
                  <span>·</span>
                  <span className="font-semibold text-indigo-600">{selectedDraft.price}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDraft(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-slate-700 leading-relaxed">
              <div>
                <b className="text-slate-900 block font-bold mb-0.5">Problem Statement:</b>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-100">{selectedDraft.problemStatement}</p>
              </div>

              <div>
                <b className="text-slate-900 block font-bold mb-0.5">Proposed Product Concept:</b>
                <p className="p-3 bg-slate-50 rounded-xl border border-slate-100">{selectedDraft.proposedSolution || selectedDraft.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <b className="text-slate-900 block font-bold mb-1">Target Audience:</b>
                  <span>{selectedDraft.targetAudience}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <b className="text-slate-900 block font-bold mb-1">Expected Retail Price:</b>
                  <span>{selectedDraft.price}</span>
                </div>
              </div>

              {selectedDraft.keyBenefits && (
                <div>
                  <b className="text-slate-900 block font-bold mb-1.5">Key Consumer Benefits:</b>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600">
                    {selectedDraft.keyBenefits.map((b: string, idx: number) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDraft(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => handleSubmitDraft(selectedDraft.id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
              >
                Submit Idea to Community →
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
