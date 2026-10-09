import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { IdeaCategory } from '@/types/idea';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CATEGORIES } from '@/components/common/FilterBar';
import {
  Lightbulb,
  Plus,
  Trash2,
  ArrowRight,
  Image as ImageIcon,
  Trophy,
} from 'lucide-react';

const SAMPLE_IMAGES = [
  {
    label: 'Sparkling Beverage Can',
    url: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Crisp Snack Packaging',
    url: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Single-Serve Espresso Pod',
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Condiment & Sauce Bottle',
    url: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?w=800&auto=format&fit=crop&q=80',
  },
  {
    label: 'Wellness & Daily Lifestyle',
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
  },
];

export const SubmitIdeaPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { submitIdea, consumerUser, startups, challenges } = useApp();

  const challengeParam = searchParams.get('challenge');
  const matchedChallenge = challenges.find((c) => c.id === challengeParam);

  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<IdeaCategory>('Food & Beverage');
  const [targetStartupName, setTargetStartupName] = useState(matchedChallenge?.company || 'Nuvie');
  const [targetPriceRange, setTargetPriceRange] = useState('₹40–₹60');
  const [targetAudience, setTargetAudience] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [proposedSolution, setProposedSolution] = useState('');
  const [benefits, setBenefits] = useState<string[]>(['']);
  const [tagsInput, setTagsInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(challengeParam || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (matchedChallenge) {
      setTargetStartupName(matchedChallenge.company);
      setCategory(matchedChallenge.cat);
    }
  }, [matchedChallenge]);


  const categoryOptions = CATEGORIES.filter((c) => c !== 'All').map((c) => ({
    value: c,
    label: c,
  }));

  const handleAddBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updated = [...benefits];
    updated[index] = value;
    setBenefits(updated);
  };

  const handleRemoveBenefit = (index: number) => {
    if (benefits.length === 1) return;
    setBenefits(benefits.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!consumerUser) {
      navigate('/auth/consumer');
      return;
    }

    setIsSubmitting(true);

    const newIdea = submitIdea({
      title: title.trim(),
      company: targetStartupName.trim() || 'Nuvie',
      cat: category,
      price: targetPriceRange.trim() || '₹40–₹60',
      desc: tagline.trim() || proposedSolution.trim(),
      why: `${problemStatement.trim()}. ${proposedSolution.trim()}`,
    });


    setIsSubmitting(false);
    navigate(`/ideas/${newIdea.id}`);
  };


  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="space-y-2 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2">
          <Badge variant="brand" size="sm" className="gap-1">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Product Innovation Pitch</span>
          </Badge>
          {matchedChallenge && (
            <Badge variant="warning" size="sm" className="gap-1">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Challenge Submission: {matchedChallenge.company}</span>
            </Badge>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pitch a Consumer Product Concept
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          Submit a structured idea for a new functional drink, wholesome meal bowl, snack, or lifestyle item.
          Verified consumer startup founders review and validate submissions directly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Linked Challenge Selector */}
        <Card className="p-5 space-y-3 bg-slate-50/50 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Trophy className="w-4 h-4 text-amber-500" />
              Link to Startup Challenge (Optional)
            </span>
            {selectedChallengeId && (
              <button
                type="button"
                onClick={() => setSelectedChallengeId('')}
                className="text-[11px] text-slate-400 hover:text-rose-600"
              >
                Clear Link
              </button>
            )}
          </div>
          <select
            value={selectedChallengeId}
            onChange={(e) => {
              setSelectedChallengeId(e.target.value);
              const chal = challenges.find((c) => c.id === e.target.value);
              if (chal) {
                setTargetStartupName(chal.company);
              }
            }}
            className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 focus:ring-brand-500"
          >
            <option value="">None (Open Consumer Pitch to Community)</option>
            {challenges.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} — {c.company} (Reward: {c.reward})
              </option>
            ))}
          </select>

        </Card>

        {/* 1. Core Pitch */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">1. Product Pitch & Positioning</h3>

          <Input
            label="Product Title"
            placeholder="e.g. Sparkling Digestive Cooler with Mint & Cumin"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            helperText="Clear, memorable product concept name."
          />

          <Input
            label="Elevator Pitch / Tagline"
            placeholder="e.g. Lightly effervescent botanical cooler brewed with roasted jeera and pudina, zero refined sugar."
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            required
            helperText="One compelling sentence summarizing the consumer value."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Primary Category"
              options={categoryOptions}
              value={category}
              onChange={(e) => setCategory(e.target.value as IdeaCategory)}
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Startup Partner
              </label>
              <select
                value={targetStartupName}
                onChange={(e) => setTargetStartupName(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 bg-white p-2.5 text-slate-800 font-medium focus:ring-brand-500"
              >
                {startups.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.category})
                  </option>
                ))}
                <option value="General Consumer Market">General Consumer Market (Open)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Target Audience"
              placeholder="e.g. Busy urban office workers, wellness enthusiasts"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              required
            />

            <Input
              label="Expected Retail Price Range (₹)"
              placeholder="e.g. ₹40–₹60, ₹150–₹220"
              value={targetPriceRange}
              onChange={(e) => setTargetPriceRange(e.target.value)}
              helperText="What consumers would be willing to pay."
              required
            />
          </div>
        </Card>

        {/* 2. Supporting Image */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-600" />
              2. Supporting Prototype Image (Optional)
            </h3>
            <span className="text-xs text-slate-400">Mockup, sketch, or render</span>
          </div>

          <Input
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            helperText="Paste an image link or select a sample prototype below."
          />

          {/* Sample quick picker */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-slate-500">
              Or pick a sample category mockup:
            </span>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_IMAGES.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => setImageUrl(sample.url)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                    imageUrl === sample.url
                      ? 'bg-brand-50 border-brand-500 text-brand-700 font-semibold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image preview */}
          {imageUrl && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-slate-200 h-44 bg-slate-100 relative">
              <img
                src={imageUrl}
                alt="Product preview"
                className="w-full h-full object-cover"
                onError={() => {}}
              />
              <div className="absolute bottom-2 right-2 bg-slate-900/70 text-white text-[10px] px-2 py-0.5 rounded-md backdrop-blur-sm">
                Preview
              </div>
            </div>
          )}
        </Card>

        {/* 3. The Problem and Solution */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900">3. Problem Statement & Proposed Innovation</h3>

          <Textarea
            label="Problem Statement"
            placeholder="What exact consumer pain point, inconvenience, or market gap does this solve? (e.g. snack bags going stale, too much sugar in drinks...)"
            value={problemStatement}
            onChange={(e) => setProblemStatement(e.target.value)}
            rows={4}
            required
          />

          <Textarea
            label="Proposed Solution & How It Works"
            placeholder="Describe the product form, materials, ingredients, or mechanism that resolves the problem..."
            value={proposedSolution}
            onChange={(e) => setProposedSolution(e.target.value)}
            rows={4}
            required
          />
        </Card>

        {/* 4. Key Benefits and Tags */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">4. Key Consumer Benefits & Tags</h3>
              <p className="text-xs text-slate-500">Provide 2 to 4 tangible reasons consumers would buy this.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              leftIcon={<Plus className="w-3.5 h-3.5" />}
              onClick={handleAddBenefit}
            >
              Add Benefit
            </Button>
          </div>

          <div className="space-y-2.5">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Input
                  placeholder={`Key benefit #${idx + 1}`}
                  value={benefit}
                  onChange={(e) => handleBenefitChange(idx, e.target.value)}
                  required={idx === 0}
                />
                {benefits.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveBenefit(idx)}
                    className="p-2.5 text-slate-400 hover:text-rose-600 rounded-xl hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <Input
            label="Keywords & Tags (Comma separated)"
            placeholder="e.g. FunctionalBeverages, LowSugar, Probiotics, CleanLabel"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
          />
        </Card>

        {/* Submit action */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            size="lg"
            variant="primary"
            isLoading={isSubmitting}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Publish Pitch for Corporate Review
          </Button>
        </div>
      </form>
    </div>
  );
};
