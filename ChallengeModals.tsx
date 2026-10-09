import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Challenge } from '@/types/challenge';
import { useApp } from '@/context/AppContext';
import { Trophy, CheckCircle2, ArrowRight } from 'lucide-react';

interface ViewChallengeModalProps {
  challenge: Challenge | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenParticipate: () => void;
}

export const ViewChallengeModal: React.FC<ViewChallengeModalProps> = ({
  challenge,
  isOpen,
  onClose,
  onOpenParticipate,
}) => {
  if (!challenge) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-indigo-600">{challenge.company}</span>
            <Badge variant="neutral" size="sm">{challenge.cat}</Badge>
          </div>
          <h2 className="text-xl font-bold text-slate-900">{challenge.title}</h2>
        </div>
      }
      description="Startup Innovation Challenge Brief"
    >
      <div className="space-y-5 pt-2">
        <p className="text-sm text-slate-600 leading-relaxed">
          {challenge.desc}
        </p>

        {/* Prototype Price Range Box */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Price Range the Startup is Seeking
            </span>
            <b className="text-xl font-black text-indigo-700">{challenge.price}</b>
          </div>
          <div className="text-right">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Time Left</span>
            <b className="text-sm font-bold text-slate-800">{challenge.left}</b>
          </div>
        </div>

        {/* What the startup is looking for */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2.5">
          <b className="text-xs font-bold uppercase tracking-wider text-slate-800 block">
            What the startup is looking for
          </b>
          <ul className="space-y-1.5 text-xs text-slate-600">
            {challenge.criteria?.map((cr, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{cr}</span>
              </li>
            )) || (
              <>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Practical product idea for Indian consumers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Suggested price that can work at startup scale</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Regional flavour / cultural relevance is a plus</span>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Non-monetary Reward */}
        <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-center gap-2.5">
          <Trophy className="w-4 h-4 text-amber-600 shrink-0" />
          <div>
            <b>Co-Creation Reward:</b> <span>{challenge.reward}</span>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              onClose();
              onOpenParticipate();
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Participate in this challenge →
          </Button>
        </div>
      </div>
    </Modal>
  );
};

interface ParticipateModalProps {
  challenge: Challenge | null;
  challengeIndex: number;
  isOpen: boolean;
  onClose: () => void;
}

export const ParticipateChallengeModal: React.FC<ParticipateModalProps> = ({
  challenge,
  challengeIndex,
  isOpen,
  onClose,
}) => {
  const { submitChallengeIdea, showToast } = useApp();

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [problem, setProblem] = useState('');
  const [targetCustomer, setTargetCustomer] = useState('');
  const [price, setPrice] = useState('');
  const [whyBuy, setWhyBuy] = useState('');

  if (!challenge) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please give your concept a title');
      return;
    }

    submitChallengeIdea(challengeIndex, {
      title,
      desc,
      problem,
      targetCustomer: targetCustomer || 'Everyday consumers',
      price: price || challenge.price,
      whyBuy,
    });

    onClose();
    setTitle('');
    setDesc('');
    setProblem('');
    setTargetCustomer('');
    setPrice('');
    setWhyBuy('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={`Participate · ${challenge.company}`}
      description={challenge.title}
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        <Input
          label="Idea Title"
          placeholder="Give your concept a clear name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          label="Idea Description"
          placeholder="What are you proposing? Describe taste, materials, or form factor."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          required
        />

        <Textarea
          label="What problem does it solve?"
          placeholder="Customer problem / unmet need"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          rows={2}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <Input
            label="Target Customer"
            placeholder="e.g. College students, 18–25"
            value={targetCustomer}
            onChange={(e) => setTargetCustomer(e.target.value)}
          />
          <Input
            label="Suggested Price"
            placeholder="e.g. ₹40"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <Textarea
          label="Why would people buy it?"
          placeholder="Your strongest purchase reason"
          value={whyBuy}
          onChange={(e) => setWhyBuy(e.target.value)}
          rows={2}
        />

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Submit Challenge Idea →
          </Button>
        </div>
      </form>
    </Modal>
  );
};
