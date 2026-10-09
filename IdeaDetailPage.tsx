import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/features/ideas/StatusBadge';
import { UpvoteButton } from '@/features/ideas/UpvoteButton';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Textarea } from '@/components/ui/Textarea';
import {
  ArrowLeft,
  Building2,
  Calendar,
  Share2,
  CheckCircle,
  MessageSquare,
  ShieldCheck,
  Send,
  Trophy,
} from 'lucide-react';
import { formatDate, timeAgo } from '@/lib/utils';

const STAGES = [
  { id: 'New', label: '1. New' },
  { id: 'Under Review', label: '2. Under Review' },
  { id: 'Shortlisted', label: '3. Shortlisted' },
  { id: 'Testing', label: '4. Testing' },
  { id: 'Prototype', label: '5. Prototype' },
  { id: 'Launched', label: '6. Launched' },
  { id: 'Implemented', label: '7. Implemented' },
];

export const IdeaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { ideas, comments, upvoteIdea, addComment, consumerUser } = useApp();

  const [newCommentText, setNewCommentText] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const idea = ideas.find((i) => i.id === id);
  const ideaComments = id ? comments[id] || [] : [];

  if (!idea) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Product Concept Not Found</h2>
        <p className="text-sm text-slate-500">The idea you are searching for does not exist or was removed.</p>
        <Button variant="outline" onClick={() => navigate('/explore')}>
          Back to Explore
        </Button>
      </div>
    );
  }

  const normalize = (s: string) => {
    const map: Record<string, string> = {
      new: 'New',
      community_validation: 'Under Review',
      under_review: 'Under Review',
      startup_review: 'Shortlisted',
      shortlisted: 'Shortlisted',
      testing: 'Testing',
      prototype: 'Prototype',
      validated: 'Prototype',
      launch_candidate: 'Launched',
      launched: 'Launched',
      implemented: 'Implemented',
    };
    return map[s.toLowerCase()] || s;
  };

  const currentStageIndex = Math.max(0, STAGES.findIndex((s) => s.id.toLowerCase() === normalize(idea.status).toLowerCase()));


  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    if (!consumerUser) {
      navigate('/auth/consumer');
      return;
    }

    addComment(idea.id, newCommentText.trim());
    setNewCommentText('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all ideas</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 transition-all"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{copiedLink ? 'Link Copied!' : 'Share Concept'}</span>
        </button>
      </div>

      {/* Supporting image banner if present */}
      {idea.imageUrl && (
        <div className="rounded-3xl overflow-hidden h-64 sm:h-80 w-full relative shadow-md bg-slate-900">
          <img
            src={idea.imageUrl}
            alt={idea.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
          {idea.challengeName && (
            <div className="absolute top-4 left-4">
              <Badge variant="warning" size="md" className="bg-amber-500/90 text-white border-transparent backdrop-blur-sm shadow-md">
                <Trophy className="w-3.5 h-3.5 mr-1" />
                Linked to {idea.challengeName}
              </Badge>
            </div>
          )}
        </div>
      )}

      {/* Idea Hero Header */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="brand" size="md">
            {idea.category}
          </Badge>
          <StatusBadge status={idea.status} size="md" />

          {idea.targetStartupName && (
            <div className="flex items-center gap-1.5 text-xs text-slate-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Targeted Startup: {idea.targetStartupName}</span>
            </div>
          )}

          {!idea.imageUrl && idea.challengeName && (
            <Badge variant="warning" size="sm" className="gap-1">
              <Trophy className="w-3 h-3 text-amber-600" />
              <span>Challenge: {idea.challengeName}</span>
            </Badge>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          {idea.title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
          {idea.tagline}
        </p>

        {/* Author info & date */}
        <div className="flex items-center gap-3 pt-2">
          {idea.author.avatarUrl ? (
            <img
              src={idea.author.avatarUrl}
              alt={idea.author.name}
              className="w-10 h-10 rounded-full object-cover border border-slate-200"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-sm">
              {idea.author.name.charAt(0)}
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900">{idea.author.name}</span>
              {idea.author.badge && (
                <Badge variant="purple" size="sm" className="text-[10px] py-0 px-1.5">
                  {idea.author.badge}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>@{idea.author.username}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(idea.createdAt)}
              </span>
            </div>
          </div>

          <div className="ml-auto">
            <UpvoteButton
              count={idea.upvotesCount}
              hasUpvoted={idea.hasUpvoted}
              onUpvote={() => upvoteIdea(idea.id)}
              size="lg"
              layout="horizontal"
            />
          </div>
        </div>
      </div>

      {/* Contributor Reward & Recognition Banner */}
      {idea.contributorRecognition && (
        <div className="rounded-2xl p-4 sm:p-5 bg-amber-50/90 border border-amber-300 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>Founding Contributor Recognition & Reward</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
            {idea.contributorRecognition}
          </p>
        </div>
      )}

      {/* Startup Testing Phase or Review Update */}
      {(idea.testingPhaseDetails || idea.startupReviewNotes) && (
        <div className="rounded-2xl p-4 sm:p-5 bg-emerald-50/90 border border-emerald-200/80 shadow-sm space-y-1.5">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Verified Startup Innovation Update ({idea.targetStartupName || 'Partner Startup'})</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
            "{idea.testingPhaseDetails || idea.startupReviewNotes}"
          </p>
        </div>
      )}

      {/* Lifecycle Stage Tracker */}
      <Card className="p-6 border-slate-200/80 bg-white">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
          Innovation Commercialization Pipeline
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx <= currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            return (
              <div
                key={stage.id}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isCurrent
                    ? 'border-brand-500 bg-brand-50/70 shadow-sm ring-2 ring-brand-500/20 text-brand-900'
                    : isCompleted
                    ? 'border-emerald-200 bg-emerald-50/50 text-emerald-800'
                    : 'border-slate-100 bg-slate-50 text-slate-400'
                }`}
              >
                <div className="text-[10px] font-semibold flex items-center justify-center gap-1">
                  {isCompleted && <CheckCircle className="w-3 h-3 text-emerald-600 shrink-0" />}
                  <span className="truncate">{stage.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Main Content Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Detailed Descriptions (2 cols) */}
        <div className="md:col-span-2 space-y-6">
          {/* Problem Statement */}
          <Card className="p-6 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              The Consumer Problem
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {idea.problemStatement}
            </p>
          </Card>

          {/* Proposed Solution */}
          <Card className="p-6 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              The Proposed Solution
            </h3>
            <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {idea.proposedSolution}
            </p>
          </Card>

          {/* Key Benefits */}
          <Card className="p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Key Consumer Benefits & Value
            </h3>
            <ul className="space-y-2">
              {idea.keyBenefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Comments & Community Feedback Thread */}
          <section id="comments" className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-brand-600" />
                Community & Corporate Discussion ({ideaComments.length})
              </h3>
            </div>

            {/* Comment submission form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3">
              <Textarea
                placeholder={
                  consumerUser
                    ? 'Share feedback, suggest flavor or packaging tweaks, or explain why you would buy this...'
                    : 'Sign in to participate in the product discussion...'
                }
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                rows={3}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="sm"
                  rightIcon={<Send className="w-3.5 h-3.5" />}
                  disabled={!newCommentText.trim()}
                >
                  Post Comment
                </Button>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-3 pt-2">
              {ideaComments.map((comment) => (
                <Card
                  key={comment.id}
                  className={`p-4 transition-all ${
                    comment.isStartupFeedback
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">
                        {comment.author.name}
                      </span>
                      {comment.isStartupFeedback && (
                        <Badge variant="enterprise" size="sm" className="gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>{comment.startupName ? `${comment.startupName} Founder / Lead` : 'Verified Startup'}</span>
                        </Badge>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {timeAgo(comment.createdAt)}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {comment.content}
                  </p>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info & Community Validation Signals (1 col) */}
        <div className="space-y-6">
          {/* Community Validation Card */}
          <Card className="p-5 space-y-4 border-slate-200 bg-white shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Community Validation Signals</span>
            </h4>

            {idea.validation && (
              <div className="space-y-3.5">
                <div className="p-3 bg-emerald-50/80 rounded-xl border border-emerald-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">Purchase Intent</span>
                    <p className="text-xl font-extrabold text-emerald-950">{idea.validation.wouldTryPercentage}%</p>
                  </div>
                  <span className="text-xs text-emerald-800 font-medium">Would Buy / Try</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Price</span>
                    <span className="font-bold text-slate-800 text-xs">{idea.validation.targetPriceRange}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Supporters</span>
                    <span className="font-bold text-slate-800 text-xs">{idea.validation.supportersCount} verified</span>
                  </div>
                </div>

                {idea.validation.topConsumerPreferences && idea.validation.topConsumerPreferences.length > 0 && (
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Top Consumer Preferences
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {idea.validation.topConsumerPreferences.map((pref, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{pref}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                    Category Interest Score
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-slate-100 rounded-full h-2">
                      <div
                        className="bg-emerald-600 h-2 rounded-full"
                        style={{ width: `${idea.validation.categoryInterestScore}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-emerald-700">
                      {idea.validation.categoryInterestScore}/100
                    </span>
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Concept Insights */}
          {idea.insights && (
            <Card className="p-5 space-y-3 border-slate-200 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Concept Insights
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {idea.insights.summary}
              </p>
              <div className="pt-2 border-t border-slate-200/60 text-xs space-y-1.5">
                <div>
                  <span className="text-slate-400 font-medium">Consumer Sentiment: </span>
                  <strong className="text-emerald-700">{idea.insights.consumerSentiment}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Key Opportunity: </span>
                  <span className="text-slate-700">{idea.insights.keyOpportunity}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Target Audience & Keywords */}
          <Card className="p-5 space-y-3 border-slate-200">
            <div>
              <span className="text-xs text-slate-400 font-medium">Target Audience</span>
              <p className="text-xs font-semibold text-slate-800 mt-0.5">
                {idea.targetAudience}
              </p>
            </div>

            <div>
              <span className="text-xs text-slate-400 font-medium">Keywords</span>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
