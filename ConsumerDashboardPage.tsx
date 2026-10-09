import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { AvatarPickerModal } from '@/components/common/AvatarPickerModal';
import { ShareIdeaModal } from '@/components/common/ShareIdeaModal';

export const ConsumerDashboardPage: React.FC = () => {
  const { consumerUser, selectedAvatar, ideas } = useApp();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const myIdeas = ideas.slice(0, 4);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Pagehead */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Welcome back, {consumerUser?.name?.split(' ')[0] || 'Innovator'} 👋
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Your ideas can move from customer feedback to real products.
          </p>
        </div>
      </div>

      {/* Profile & Stats Card */}
      <Card className="p-6 border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center text-3xl shadow-sm">
              {selectedAvatar}
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-slate-900">{consumerUser?.name || 'Community Innovator'}</h3>
              <p className="text-xs text-slate-500 font-medium">Trend Spotter · Innovation score 842</p>
              <button
                type="button"
                onClick={() => setIsAvatarModalOpen(true)}
                className="mt-1.5 text-xs text-indigo-600 font-bold hover:underline"
              >
                Change avatar
              </button>
            </div>
          </div>

          <Badge variant="success" size="md" className="self-start sm:self-center font-bold">
            Top 8% this month
          </Badge>
        </div>

        {/* Prototype Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-100 text-center sm:text-left">
            <b className="text-2xl font-black text-slate-900">12</b>
            <span className="text-xs text-slate-500 block mt-0.5">Ideas submitted</span>
          </div>
          <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-100 text-center sm:text-left">
            <b className="text-2xl font-black text-slate-900">4</b>
            <span className="text-xs text-slate-500 block mt-0.5">Shortlisted</span>
          </div>
          <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-100 text-center sm:text-left">
            <b className="text-2xl font-black text-emerald-700">1</b>
            <span className="text-xs text-slate-500 block mt-0.5">Implemented</span>
          </div>
          <div className="p-3.5 bg-slate-50/90 rounded-2xl border border-slate-100 text-center sm:text-left">
            <b className="text-2xl font-black text-slate-900">1,284</b>
            <span className="text-xs text-slate-500 block mt-0.5">Votes received</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-slate-100">
          <Badge variant="brand" size="sm">Trend Spotter</Badge>
          <Badge variant="warning" size="sm">Early Innovator</Badge>
          <Badge variant="success" size="sm">Community Builder</Badge>
        </div>
      </Card>

      {/* Hero Open Innovation Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-7 sm:p-9 shadow-lg shadow-indigo-200">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200 block">
          OPEN INNOVATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-black mt-1 mb-2">
          Help build what comes next.
        </h2>
        <p className="text-sm text-indigo-100 max-w-xl leading-relaxed mb-6">
          Your votes, comments, and ideas feed directly into what real companies decide to build.
        </p>
        <Button
          variant="secondary"
          size="md"
          onClick={() => setIsShareModalOpen(true)}
          className="bg-white text-indigo-700 hover:bg-slate-50 font-bold px-6 shadow-sm"
        >
          Share an idea →
        </Button>
      </div>

      {/* Grid 2: Innovation Journey + Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Your Innovation Journey */}
        <Card className="p-6 border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-900">Your innovation journey</h3>
            <Link to="/consumer/my-ideas" className="text-xs font-bold text-indigo-600 hover:underline">
              View all →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {myIdeas.map((i) => (
              <div key={i.id} className="py-3 flex items-center justify-between gap-3">
                <div>
                  <Link to={`/ideas/${i.id}`} className="font-bold text-sm text-slate-900 hover:text-indigo-600 block line-clamp-1">
                    {i.title}
                  </Link>
                  <span className="text-xs text-slate-400 font-medium">
                    {i.company} · {i.status}
                  </span>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                    i.status === 'Shortlisted' || i.status === 'Implemented'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                  }`}
                >
                  {i.score} validation
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Rewards & Recognition */}
        <Card className="p-6 border-slate-200 space-y-4">
          <h3 className="text-base font-extrabold text-slate-900">Rewards & recognition</h3>
          <div>
            <b className="text-3xl font-black text-indigo-600">1,840 pts</b>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Earn points when your ideas are validated, shortlisted or implemented by emerging startups.
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-700">Next badge: Master Creator</span>
              <b className="text-indigo-700">72%</b>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '72%' }}></div>
            </div>
          </div>

          <div className="space-y-2.5 pt-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500 block">Recent Perks & Rewards</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🎁</span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Nuvie Summer Taste Kit</span>
                    <span className="text-[11px] text-slate-500">From Nuvie R&D</span>
                  </div>
                </div>
                <Badge variant="success" size="sm" className="font-bold">Hamper Claimed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">🎟️</span>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Go Desi 25% Founders Voucher</span>
                    <span className="text-[11px] text-slate-500">Discount voucher</span>
                  </div>
                </div>
                <Badge variant="brand" size="sm" className="font-bold">Available in Wallet</Badge>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <AvatarPickerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />
      <ShareIdeaModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};
