import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { useApp } from '@/context/AppContext';
import { Sparkles } from 'lucide-react';

interface ShareIdeaModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStartup?: string;
  defaultCategory?: string;
}

export const ShareIdeaModal: React.FC<ShareIdeaModalProps> = ({
  isOpen,
  onClose,
  defaultStartup = 'Nuvie',
  defaultCategory = 'Food & Beverage',
}) => {
  const { submitIdea, showToast, startups, updateDraftIdea, consumerUser } = useApp();

  const [category, setCategory] = useState(defaultCategory);
  const [company, setCompany] = useState(defaultStartup);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [why, setWhy] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please provide a title for your concept');
      return;
    }

    submitIdea({
      title,
      company,
      cat: category,
      price: price || 'To be validated',
      desc: desc || 'Customer-submitted concept awaiting community validation.',
      why,
    });

    onClose();
    setTitle('');
    setPrice('');
    setDesc('');
    setWhy('');
  };

  const handleSaveDraft = () => {
    if (!title.trim()) {
      showToast('Please enter a concept title before saving as draft');
      return;
    }
    const newDraft = {
      id: `draft-${Date.now()}`,
      title: title.trim(),
      company,
      targetStartupName: company,
      category,
      cat: category,
      tagline: desc || 'Draft concept awaiting submission.',
      desc: desc || 'Draft concept awaiting submission.',
      problemStatement: why || 'Customer problem to be validated.',
      proposedSolution: desc || 'Proposed concept design.',
      targetAudience: 'Everyday consumers',
      keyBenefits: ['Fresh consumer proposal'],
      tags: [category.replace(/\s+/g, ''), company],
      author: consumerUser
        ? { id: consumerUser.id, name: consumerUser.name, username: consumerUser.username, reputationScore: consumerUser.reputationScore, badge: 'Innovator' }
        : { id: 'usr-innovator', name: 'Community Innovator', username: 'innovator', reputationScore: 842, badge: 'Innovator' },
      score: 0,
      buy: 0,
      opp: 0,
      status: 'Draft' as const,
      commentsCount: 0,
      upvotesCount: 0,
      viewsCount: 0,
      price: price || 'To be validated',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      validation: {
        viewsCount: 0,
        supportersCount: 0,
        wouldTryPercentage: 0,
        topConsumerPreferences: [],
        targetPriceRange: price || 'To be validated',
        engagementRate: '0%',
        categoryInterestScore: 0,
      },
    };
    updateDraftIdea(newDraft);
    showToast(`Draft "${title}" saved to My Ideas`);
    onClose();
    setTitle('');
    setPrice('');
    setDesc('');
    setWhy('');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="lg"
      title={
        <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xl">
          <span>💡</span>
          <span>Share an Idea</span>
        </div>
      }
      description="Propose a new physical product or packaging concept to an emerging startup."
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-1">
        {/* Prototype AI Clustering Notice */}
        <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            AI clusters your submission with similar customer ideas. Startups see aggregated validation, purchase intent, and opportunity signals—not your private profile.
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 focus:ring-indigo-500"
            >
              <option>Food & Beverage</option>
              <option>Packaging</option>
              <option>Sneakers</option>
              <option>Clothing</option>
              <option>Technology</option>
              <option>Fragrances</option>
              <option>Gifting</option>
              <option>Crockery</option>
              <option>Handbags</option>
              <option>Accessories</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Startup Partner
            </label>
            <select
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full text-xs font-semibold rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 focus:ring-indigo-500"
            >
              {startups.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name} ({s.category.split(' · ')[0]})
                </option>
              ))}
              <option value="Hocco">Hocco (Desserts & Ice Cream)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="sm:col-span-2">
            <Input
              label="Product / Concept Title"
              placeholder="e.g. Peanut Butter Crunch Protein Bar"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Input
              label="Suggested Price Range"
              placeholder="e.g. ₹45–₹55"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <Textarea
          label="Description"
          placeholder="What should it contain, taste like, look like, or improve?"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={3}
          required
        />

        <Textarea
          label="Why would customers want it?"
          placeholder="Describe the customer problem, use case, or purchase reason."
          value={why}
          onChange={(e) => setWhy(e.target.value)}
          rows={2}
        />

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
          <Button type="button" variant="outline" size="sm" onClick={handleSaveDraft}>
            Save Draft
          </Button>
          <Button type="submit" variant="primary" size="sm">
            Submit Idea →
          </Button>
        </div>
      </form>
    </Modal>
  );
};
