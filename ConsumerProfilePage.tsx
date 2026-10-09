import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Button } from '@/components/ui/Button';
import { IdeaCard } from '@/features/ideas/IdeaCard';
import { Link } from 'react-router-dom';
import { Award, Lightbulb, ThumbsUp, PlusCircle, Sparkles, Settings, Moon, Sun } from 'lucide-react';

export const ConsumerProfilePage: React.FC = () => {
  const { consumerUser, ideas, isDarkMode, toggleDarkMode, selectedAvatar } = useApp();
  const [activeTab, setActiveTab] = useState<'submitted' | 'upvoted' | 'settings'>('submitted');

  if (!consumerUser) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Please Sign In to View Your Portfolio</h2>
        <p className="text-sm text-slate-500">Access your submitted concepts, track upvotes, and monitor company engagement.</p>
        <Link to="/auth/consumer">
          <Button variant="primary">
            Sign In
          </Button>
        </Link>
      </div>
    );
  }

  const myIdeas = ideas.filter(
    (i) => i.author.id === consumerUser.id || i.author.name === consumerUser.name
  );
  const upvotedIdeas = ideas.filter((i) => i.hasUpvoted);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Profile Header */}
      <Card className="p-6 sm:p-8 border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {consumerUser.avatarUrl ? (
              <img
                src={consumerUser.avatarUrl}
                alt={consumerUser.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-brand-100 shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold text-2xl">
                {consumerUser.name.charAt(0)}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{consumerUser.name}</h1>
                <Badge variant="brand" size="sm">Innovator</Badge>
              </div>
              <p className="text-xs text-slate-400">@{consumerUser.username} • {consumerUser.email}</p>
              {consumerUser.bio && (
                <p className="text-xs text-slate-600 mt-2 max-w-lg leading-relaxed">{consumerUser.bio}</p>
              )}
            </div>
          </div>

          {/* Karma & Stats */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="px-4 py-2.5 rounded-xl bg-brand-50 border border-brand-100 text-center flex-1 sm:flex-initial">
              <span className="text-xs text-brand-600 font-medium">Reputation Karma</span>
              <p className="text-xl font-bold text-brand-700">{consumerUser.reputationScore}</p>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-center flex-1 sm:flex-initial">
              <span className="text-xs text-slate-500 font-medium">Pitches</span>
              <p className="text-xl font-bold text-slate-800">{myIdeas.length}</p>
            </div>
          </div>
        </div>

        {/* Badges Strip */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1 mr-2">
            <Award className="w-3.5 h-3.5" /> Badges:
          </span>
          {consumerUser.badges.map((b) => (
            <Badge key={b} variant="purple" size="sm">
              <Sparkles className="w-3 h-3 mr-1" />
              {b}
            </Badge>
          ))}
        </div>
      </Card>

      {/* Tabs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Tabs
            tabs={[
              { id: 'submitted', label: `My Pitches (${myIdeas.length})`, icon: <Lightbulb className="w-4 h-4" /> },
              { id: 'upvoted', label: `Supported Concepts (${upvotedIdeas.length})`, icon: <ThumbsUp className="w-4 h-4" /> },
              { id: 'settings', label: 'Preferences & Theme', icon: <Settings className="w-4 h-4" /> },
            ]}
            activeTab={activeTab}
            onChange={(id) => setActiveTab(id as 'submitted' | 'upvoted' | 'settings')}
          />

          <Link to="/submit">
            <Button variant="primary" size="sm" leftIcon={<PlusCircle className="w-4 h-4" />}>
              New Pitch
            </Button>
          </Link>
        </div>

        {/* Grid display */}
        {activeTab === 'submitted' && (
          <div>
            {myIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center text-slate-500 border-dashed">
                <p className="text-sm">You have not submitted any product ideas yet.</p>
                <Link to="/submit" className="mt-3 inline-block">
                  <Button variant="outline" size="sm">Submit Your First Idea</Button>
                </Link>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'upvoted' && (
          <div>
            {upvotedIdeas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upvotedIdeas.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center text-slate-500 border-dashed">
                <p className="text-sm">You haven't upvoted any ideas yet.</p>
                <Link to="/explore" className="mt-3 inline-block">
                  <Button variant="outline" size="sm">Explore Ideas Feed</Button>
                </Link>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card className="p-6 border-slate-200 bg-white space-y-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900">Theme & Visual Appearance</h3>
                <p className="text-xs text-slate-500">Configure your viewing mode. Preference is saved and persisted across visits.</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs text-slate-700">
                    {isDarkMode ? <Moon className="w-5 h-5 text-indigo-600" /> : <Sun className="w-5 h-5 text-amber-500" />}
                  </div>
                  <div>
                    <b className="text-sm font-bold text-slate-900 block">
                      {isDarkMode ? 'Dark Mode Active' : 'Light Mode Active'}
                    </b>
                    <span className="text-xs text-slate-500">
                      {isDarkMode ? 'Comfortable soft dark palette enabled' : 'Clean light workspace active'}
                    </span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleDarkMode}
                  className="font-bold flex items-center gap-1.5"
                >
                  {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  <span>{isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}</span>
                </Button>
              </div>
            </Card>

            <Card className="p-6 border-slate-200 bg-white space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Community Avatar</h3>
                  <p className="text-xs text-slate-500">Your avatar displayed on pitches and comments</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-2xl shadow-xs">
                  {selectedAvatar}
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};
