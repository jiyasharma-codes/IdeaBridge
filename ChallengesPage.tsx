import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { Challenge } from '@/types/challenge';
import {
  ViewChallengeModal,
  ParticipateChallengeModal,
} from '@/components/common/ChallengeModals';

export const ChallengesPage: React.FC = () => {
  const { challenges } = useApp();

  const [viewingChallenge, setViewingChallenge] = useState<Challenge | null>(null);
  const [participatingChallenge, setParticipatingChallenge] = useState<{
    challenge: Challenge;
    index: number;
  } | null>(null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in">
      {/* Pagehead */}
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Innovation Challenges
        </h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Startups are actively looking for ideas in these briefs.
        </p>
      </div>

      {/* 2-Column Challenge Grid matching prototype */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((c, idx) => {
          const isNuvie = c.company === 'Nuvie';

          return (
            <Card
              key={c.id}
              className="p-6 flex flex-col justify-between border-slate-200 bg-white hover:shadow-md transition-all space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <b className={`text-sm font-extrabold ${isNuvie ? 'text-indigo-600' : 'text-teal-600'}`}>
                    {c.company}
                  </b>
                  <Badge variant="neutral" size="sm">{c.cat}</Badge>
                </div>

                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.desc}
                </p>

                {/* Prototype Price Range Box */}
                <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    TARGET PRICE RANGE
                  </span>
                  <b className="text-base font-extrabold text-indigo-700">{c.price}</b>
                </div>

                {/* Meta stats */}
                <div className="flex items-center gap-4 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1">♜ {c.people}</span>
                  <span className="flex items-center gap-1">♧ {c.ideas} ideas</span>
                  <span className="flex items-center gap-1 text-amber-700 font-semibold">◷ {c.left}</span>
                </div>

                <div className="text-xs text-slate-600 pt-1">
                  <b className="text-slate-800">Reward:</b> {c.reward}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewingChallenge(c)}
                  className="flex-1 text-xs font-bold"
                >
                  View Challenge
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setParticipatingChallenge({ challenge: c, index: idx })}
                  className="flex-1 text-xs font-bold"
                >
                  Participate
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* View Challenge Modal */}
      <ViewChallengeModal
        challenge={viewingChallenge}
        isOpen={Boolean(viewingChallenge)}
        onClose={() => setViewingChallenge(null)}
        onOpenParticipate={() => {
          if (viewingChallenge) {
            const idx = challenges.findIndex((x) => x.id === viewingChallenge.id);
            setParticipatingChallenge({ challenge: viewingChallenge, index: idx >= 0 ? idx : 0 });
          }
        }}
      />

      {/* Participate Challenge Modal */}
      <ParticipateChallengeModal
        challenge={participatingChallenge?.challenge || null}
        challengeIndex={participatingChallenge?.index || 0}
        isOpen={Boolean(participatingChallenge)}
        onClose={() => setParticipatingChallenge(null)}
      />
    </div>
  );
};
