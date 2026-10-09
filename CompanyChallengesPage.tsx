import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useApp } from '@/context/AppContext';
import { PlusCircle, X, Award, CheckCircle2 } from 'lucide-react';
import { Challenge } from '@/types/challenge';

export const CompanyChallengesPage: React.FC = () => {
  const { challenges, selectedStartup, addChallenge } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallengeForView, setSelectedChallengeForView] = useState<Challenge | null>(null);

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [reward, setReward] = useState('');

  const startupChallenges = challenges.filter(
    (c) => c.company.toLowerCase() === selectedStartup.name.toLowerCase()
  );

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    addChallenge({
      title,
      desc,
      price: price || '₹40–₹60',
      reward: reward || 'Product hamper + 20% discount coupon',
      cat: selectedStartup.category.split(' · ')[0],
    });

    setIsModalOpen(false);
    setTitle('');
    setDesc('');
    setPrice('');
    setReward('');
  };

  return (
    <div className="space-y-6 max-w-5xl animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Challenges
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Innovation challenges you've launched to the community.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          leftIcon={<PlusCircle className="w-4 h-4" />}
          className="font-bold self-start sm:self-auto"
        >
          ＋ New Challenge
        </Button>
      </div>

      {/* Grid 2 matching prototype */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {startupChallenges.map((c) => (
          <Card
            key={c.id}
            onClick={() => setSelectedChallengeForView(c)}
            className="p-6 border-slate-200 bg-white space-y-3.5 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                  {c.cat}
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  ⏱ {c.left} left
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 leading-snug hover:text-indigo-600 transition-colors">
                {c.title}
              </h3>

              <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                <span>♜ {c.people} participants</span>
                <span>♧ {c.ideas} ideas submitted</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                {c.desc}
              </p>

              <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900 leading-snug">
                <b>Reward:</b> {c.reward}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Target: {c.price}</span>
              <span className="text-indigo-600 font-bold hover:underline">
                View Full Brief & Rewards →
              </span>
            </div>
          </Card>
        ))}

        {startupChallenges.length === 0 && (
          <div className="col-span-2 p-10 text-center text-slate-400 border border-dashed border-slate-200 rounded-2xl bg-white">
            No active challenges launched for {selectedStartup.name} yet. Click "＋ New Challenge" to post your first brief!
          </div>
        )}
      </div>

      {/* New Challenge Composer Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maxWidth="md"
        title={`Launch New Challenge · ${selectedStartup.name}`}
        description="Invite community co-creators to propose products for your brand."
      >
        <form onSubmit={handleCreate} className="space-y-4 pt-1">
          <Input
            label="Challenge Title"
            placeholder="e.g. Reinvent the Everyday Protein Snack"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="Challenge Brief & Description"
            placeholder="Describe what product format, taste profile, or problem you are seeking..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
            required
          />

          <Input
            label="Target Price Range"
            placeholder="e.g. ₹40–₹60 per pack"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Input
            label="Community Reward"
            placeholder="e.g. Protein hamper + 20% product discount"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
          />

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Launch Challenge →
            </Button>
          </div>
        </form>
      </Modal>

      {/* Detailed Challenge View Modal */}
      {selectedChallengeForView && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-scale-up space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                    {selectedChallengeForView.company} Challenge
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-slate-500">{selectedChallengeForView.cat}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-bold text-amber-600">⏱ {selectedChallengeForView.left} left</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
                  {selectedChallengeForView.title}
                </h2>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-slate-500 font-semibold">
                  <span>♜ {selectedChallengeForView.people} participants</span>
                  <span>·</span>
                  <span>♧ {selectedChallengeForView.ideas} ideas submitted</span>
                  <span>·</span>
                  <span className="text-indigo-600">Target: {selectedChallengeForView.price}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedChallengeForView(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Sections */}
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              {/* Problem Solved */}
              <div>
                <b className="text-slate-900 block font-bold mb-1">Problem to be Solved:</b>
                <p className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  {selectedChallengeForView.problemSolved || selectedChallengeForView.desc}
                </p>
              </div>

              {/* Why Interested */}
              <div>
                <b className="text-slate-900 block font-bold mb-1">Why {selectedChallengeForView.company} is Interested:</b>
                <p className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  {selectedChallengeForView.whyInterested || 'Direct strategic pipeline initiative for our upcoming quarterly launch.'}
                </p>
              </div>

              {/* Target Audience & Expected Use Case */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <b className="text-slate-900 block font-bold mb-1">Target Audience:</b>
                  <span>{selectedChallengeForView.targetAudience || 'Everyday consumers and students'}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <b className="text-slate-900 block font-bold mb-1">Expected Use Case:</b>
                  <span>{selectedChallengeForView.expectedUseCase || 'Daily consumer lifestyle application'}</span>
                </div>
              </div>

              {/* Requirements */}
              {selectedChallengeForView.requirements && (
                <div>
                  <b className="text-slate-900 block font-bold mb-1.5">Specific Submission Requirements:</b>
                  <div className="space-y-1.5">
                    {selectedChallengeForView.requirements.map((req: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Explicit Winner Rewards */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/80 space-y-2.5">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-600" />
                  <b className="text-sm font-extrabold text-amber-900">Winner Rewards & Recognition Package:</b>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {selectedChallengeForView.winnerRewards ? (
                    <>
                      {selectedChallengeForView.winnerRewards.cashReward && (
                        <div className="p-2.5 rounded-xl bg-white/90 border border-amber-200/60">
                          <b className="text-amber-800 block text-[11px] uppercase font-bold">Cash Innovation Bounty</b>
                          <span className="font-extrabold text-slate-900 text-xs">{selectedChallengeForView.winnerRewards.cashReward}</span>
                        </div>
                      )}
                      {selectedChallengeForView.winnerRewards.hamper && (
                        <div className="p-2.5 rounded-xl bg-white/90 border border-amber-200/60">
                          <b className="text-amber-800 block text-[11px] uppercase font-bold">Product Hamper</b>
                          <span className="font-bold text-slate-800 text-xs">{selectedChallengeForView.winnerRewards.hamper}</span>
                        </div>
                      )}
                      {selectedChallengeForView.winnerRewards.earlyAccess && (
                        <div className="p-2.5 rounded-xl bg-white/90 border border-amber-200/60">
                          <b className="text-amber-800 block text-[11px] uppercase font-bold">Exclusive Access</b>
                          <span className="font-medium text-slate-700 text-xs">{selectedChallengeForView.winnerRewards.earlyAccess}</span>
                        </div>
                      )}
                      {selectedChallengeForView.winnerRewards.collaboration && (
                        <div className="p-2.5 rounded-xl bg-white/90 border border-amber-200/60">
                          <b className="text-amber-800 block text-[11px] uppercase font-bold">Co-Creation Credit</b>
                          <span className="font-medium text-slate-700 text-xs">{selectedChallengeForView.winnerRewards.collaboration}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-white/90 border border-amber-200/60 col-span-2">
                      <span className="font-bold text-slate-800">{selectedChallengeForView.reward}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setSelectedChallengeForView(null)}
              >
                Close Brief
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
