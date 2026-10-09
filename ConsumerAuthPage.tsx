import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';

export const ConsumerAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setConsumerUser, showToast } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast('Please enter your email and password');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        showToast('Please enter your name');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match');
        return;
      }
    }

    const displayName = mode === 'signup' && name.trim() ? name.trim() : email.split('@')[0] || 'Innovator';

    setConsumerUser({
      id: `usr-${Date.now()}`,
      email,
      name: displayName,
      username: displayName.toLowerCase().replace(/\s+/g, '_'),
      reputationScore: 842,
      submittedIdeasCount: 12,
      upvotedIdeasCount: 1284,
      badges: ['Trend Spotter', 'Early Innovator', 'Community Builder'],
      rewardsEarned: [
        { id: 'r1', title: 'Nuvie Summer Taste Kit', fromStartup: 'Nuvie', date: 'Yesterday', rewardType: 'Product Hamper' },
      ],
      createdAt: new Date().toISOString(),
    });

    showToast(`Welcome, ${displayName}!`);
    navigate('/consumer');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 sm:p-10 border-slate-200 shadow-xl rounded-3xl text-center space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-2xl font-black text-slate-900 tracking-tight">
            <span className="text-indigo-600">⌘</span> IdeaBridge
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Consumer / Innovator Portal
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {mode === 'signup' ? 'Create your innovator account' : 'Welcome back, Innovator'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'signup'
              ? 'Join the community to pitch ideas and validate products.'
              : 'Enter your email and password to access your dashboard.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          {mode === 'signup' && (
            <Input
              label="Your Name"
              type="text"
              placeholder="e.g. Alex Morgan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
          />

          {mode === 'signup' && (
            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          )}

          <Button type="submit" variant="primary" className="w-full py-3 mt-2 font-bold shadow-md shadow-indigo-100">
            {mode === 'signup' ? 'Create Account →' : 'Log In →'}
          </Button>
        </form>

        <div className="pt-2 text-xs text-slate-500">
          {mode === 'signup' ? 'Already have an account?' : 'New to IdeaBridge?'}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="font-bold text-indigo-600 hover:underline"
          >
            {mode === 'signup' ? 'Log in' : 'Sign up'}
          </button>
        </div>

        <div className="pt-2 border-t border-slate-100">
          <Link to="/" className="text-xs text-slate-400 hover:text-slate-600 font-medium">
            ← Back to role selection
          </Link>
        </div>
      </Card>
    </div>
  );
};
