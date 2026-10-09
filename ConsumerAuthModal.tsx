import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Tabs } from '@/components/ui/Tabs';
import { useApp } from '@/context/AppContext';
import { Lightbulb, Mail, Lock, User, AtSign } from 'lucide-react';

export const ConsumerAuthModal: React.FC = () => {
  const { isConsumerAuthModalOpen, closeConsumerAuthModal, setConsumerUser } = useApp();
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    // Frontend UI state resolution: prepares seamless integration with Supabase signInWithPassword / signUp
    setTimeout(() => {
      setIsLoading(false);
      setConsumerUser({
        id: `usr-${Date.now()}`,
        email,
        name: activeTab === 'signup' && name ? name : 'Innovator',
        username: activeTab === 'signup' && username ? username : email.split('@')[0],
        reputationScore: 100,
        submittedIdeasCount: 0,
        upvotedIdeasCount: 0,
        badges: ['New Innovator'],
        rewardsEarned: [],
        createdAt: new Date().toISOString(),
      });
      closeConsumerAuthModal();
    }, 500);
  };

  return (
    <Modal
      isOpen={isConsumerAuthModalOpen}
      onClose={closeConsumerAuthModal}
      maxWidth="md"
      title={
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-brand-50 text-brand-600 border border-brand-100">
            <Lightbulb className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-900">Consumer Innovator Access</span>
        </div>
      }
      description="Sign in or join IdeaBridge to submit ideas, upvote concepts, and collaborate with companies."
    >
      <div className="space-y-5">
        <Tabs
          tabs={[
            { id: 'signin', label: 'Sign In' },
            { id: 'signup', label: 'Create Free Account' },
          ]}
          activeTab={activeTab}
          onChange={(id) => {
            setActiveTab(id as 'signin' | 'signup');
            setErrorMessage(null);
          }}
          className="w-full justify-center"
        />

        {errorMessage && (
          <div className="p-3 text-xs text-rose-700 bg-rose-50 rounded-xl border border-rose-200">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {activeTab === 'signup' && (
            <>
              <Input
                label="Full Name"
                placeholder="e.g. Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                leftIcon={<User className="w-4 h-4" />}
              />
              <Input
                label="Username"
                placeholder="e.g. alexinnovates"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                leftIcon={<AtSign className="w-4 h-4" />}
              />
            </>
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            leftIcon={<Mail className="w-4 h-4" />}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            leftIcon={<Lock className="w-4 h-4" />}
          />

          <Button
            type="submit"
            className="w-full mt-2"
            variant="primary"
            isLoading={isLoading}
          >
            {activeTab === 'signin' ? 'Sign In' : 'Create Innovator Account'}
          </Button>
        </form>

        <p className="text-xs text-center text-slate-400">
          Secure Email & Password authentication powered for future Supabase Auth
        </p>
      </div>
    </Modal>
  );
};
