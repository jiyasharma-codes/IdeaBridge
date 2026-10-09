import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/context/AppContext';
import { Idea, IdeaStatus } from '@/types/idea';
import { X } from 'lucide-react';

const TABS: (IdeaStatus | 'All')[] = [
  'All',
  'New',
  'Under Review',
  'Testing',
  'Shortlisted',
  'Prototype',
  'Launched',
  'Rejected',
];

export const CompanyConsumerIdeasPage: React.FC = () => {
  const { ideas, selectedStartup, updateIdeaStatus } = useApp();
  const [currentTab, setCurrentTab] = useState<IdeaStatus | 'All'>('All');
  const [selectedIdeaForModal, setSelectedIdeaForModal] = useState<Idea | null>(null);

  // Filter ideas belonging to the selected startup
  const startupIdeas = ideas.filter(
    (i) => i.company.toLowerCase() === selectedStartup.name.toLowerCase()
  );

  const displayedIdeas = startupIdeas.filter((i) => {
    if (currentTab === 'All') return true;
    return i.status.toLowerCase() === currentTab.toLowerCase();
  });

  const getCount = (tab: IdeaStatus | 'All') => {
    if (tab === 'All') return startupIdeas.length;
    return startupIdeas.filter((i) => i.status.toLowerCase() === tab.toLowerCase()).length;
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Consumer Ideas
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Review and manage every idea submitted to {selectedStartup.name}.
        </p>
      </div>

      {/* Tabs matching prototype */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map((tab) => {
          const isActive = currentTab === tab;
          const count = getCount(tab);
          return (
            <button
              key={tab}
              type="button"
              onClick={() => setCurrentTab(tab)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 ring-2 ring-indigo-500 ring-offset-2'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span>{tab}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Table Card matching prototype */}
      <Card className="p-0 overflow-x-auto border-slate-200 bg-white">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 uppercase font-bold text-[11px] tracking-wider">
            <tr>
              <th className="py-3 px-5">Idea</th>
              <th className="py-3 px-4">Validation</th>
              <th className="py-3 px-4">Purchase intent</th>
              <th className="py-3 px-4">Opportunity</th>
              <th className="py-3 px-4">Financial potential</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {displayedIdeas.map((i) => {
              const finPotential = i.opp > 80 ? 'High' : i.opp > 70 ? 'Medium' : 'Low';

              return (
                <tr key={i.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 px-5 max-w-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedIdeaForModal(i)}
                      className="font-bold text-slate-900 hover:text-indigo-600 block line-clamp-1 text-left cursor-pointer transition-colors"
                    >
                      {i.title}
                    </button>
                    <span className="text-[11px] text-slate-400">
                      {i.author.name} · {i.cat}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900">{i.score}</td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">{i.buy}%</td>
                  <td className="py-3.5 px-4 font-bold text-indigo-600">{i.opp}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        finPotential === 'High'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : finPotential === 'Medium'
                          ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {finPotential}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        i.status === 'Shortlisted' || i.status === 'Launched'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                      }`}
                    >
                      {i.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedIdeaForModal(i)}
                        className="px-2 py-1 rounded-lg text-xs font-bold text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer"
                      >
                        Review
                      </button>
                      <select
                        value={i.status}
                        onChange={(e) => updateIdeaStatus(i.id, e.target.value as IdeaStatus)}
                        className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-2 py-1 text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500 cursor-pointer"
                      >
                        <option value="New">New</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Testing">Testing</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Prototype">Prototype</option>
                        <option value="Launched">Launched</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}

            {displayedIdeas.length === 0 && (
              <tr>
                <td colSpan={7} className="p-8 text-center text-slate-400">
                  No {currentTab.toLowerCase()} ideas for {selectedStartup.name} yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Idea Detail Modal (Opens inside company portal) */}
      {selectedIdeaForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-scale-up space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
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
                <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">Submitted by {selectedIdeaForModal.author.name}</span>
                  <span>·</span>
                  <span>Validation Score: <strong className="text-indigo-600">{selectedIdeaForModal.score}/100</strong></span>
                  <span>·</span>
                  <span>Status: <strong className="text-slate-800">{selectedIdeaForModal.status}</strong></span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIdeaForModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div>
                <b className="text-slate-900 block font-bold mb-1">Concept Summary:</b>
                <p className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  {selectedIdeaForModal.desc || selectedIdeaForModal.tagline}
                </p>
              </div>

              {selectedIdeaForModal.problemStatement && (
                <div>
                  <b className="text-slate-900 block font-bold mb-1">Customer Problem Identified:</b>
                  <p className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {selectedIdeaForModal.problemStatement}
                  </p>
                </div>
              )}

              {selectedIdeaForModal.proposedSolution && (
                <div>
                  <b className="text-slate-900 block font-bold mb-1">Proposed Solution & Formulation:</b>
                  <p className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {selectedIdeaForModal.proposedSolution}
                  </p>
                </div>
              )}

              {/* Validation & Telemetry Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Validations</span>
                  <b className="text-base font-black text-slate-900 block mt-0.5">{selectedIdeaForModal.upvotesCount}</b>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Purchase Intent</span>
                  <b className="text-base font-black text-emerald-700 block mt-0.5">{selectedIdeaForModal.buy}%</b>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Opportunity</span>
                  <b className="text-base font-black text-indigo-600 block mt-0.5">{selectedIdeaForModal.opp}</b>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Target Price</span>
                  <b className="text-base font-black text-slate-800 block mt-0.5">{selectedIdeaForModal.price}</b>
                </div>
              </div>

              {/* Status Update Control inside Modal */}
              <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between gap-3">
                <div>
                  <b className="text-xs font-bold text-indigo-900 block">Manage Lifecycle State:</b>
                  <span className="text-[11px] text-indigo-700">Move this idea through your innovation pipeline</span>
                </div>
                <select
                  value={selectedIdeaForModal.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value as IdeaStatus;
                    updateIdeaStatus(selectedIdeaForModal.id, nextStatus);
                    setSelectedIdeaForModal({ ...selectedIdeaForModal, status: nextStatus });
                  }}
                  className="text-xs font-bold bg-white border border-indigo-200 rounded-xl px-3 py-1.5 text-indigo-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
                >
                  <option value="New">New</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Testing">Testing</option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Prototype">Prototype</option>
                  <option value="Launched">Launched</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
