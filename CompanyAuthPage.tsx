import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';

export const CompanyAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { setStartupUser, showToast, selectedStartup, startups } = useApp();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      showToast('Please enter your work email and password');
      return;
    }

    if (mode === 'signup') {
      if (!companyName.trim()) {
        showToast('Please enter your startup/brand name');
        return;
      }
      if (password !== confirmPassword) {
        showToast('Passwords do not match');
        return;
      }
    }

    const matchedStartup = startups.find((s) =>
      email.toLowerCase().includes(s.name.toLowerCase().replace(/\s+/g, '')) ||
      (companyName.trim() && s.name.toLowerCase() === companyName.trim().toLowerCase())
    ) || selectedStartup;

    const startupTitle = mode === 'signup' && companyName.trim() ? companyName.trim() : matchedStartup.name;
    const startupCat = matchedStartup?.category || 'Consumer Innovation';
    const startupId = matchedStartup?.id || `startup-${startupTitle.toLowerCase().replace(/\s+/g, '-')}`;

    setStartupUser({
      id: `rep-${Date.now()}`,
      workEmail: email,
      name: `${startupTitle} Innovation Team`,
      title: 'Head of Product & R&D',
      startupId: startupId,
      startupName: startupTitle,
      startupCategory: startupCat,
      isVerified: true,
      createdAt: new Date().toISOString(),
    });

    showToast(`Welcome to ${startupTitle} Innovation Portal!`);
    navigate('/startup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 sm:p-10 border-slate-200 shadow-xl rounded-3xl text-center space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-2xl font-black text-slate-900 tracking-tight">
            <span className="text-emerald-600">⌘</span> IdeaBridge
          </div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Startup & Brand Portal
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            {mode === 'signup' ? 'Register your startup' : 'Startup Team Sign In'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {mode === 'signup'
              ? 'Connect your brand with verified consumer demand.'
              : 'Enter your credentials to access your startup command center.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="text-left space-y-4">
          {mode === 'signup' && (
            <Input
              label="Startup / Brand Name"
              type="text"
              placeholder="e.g. Nuvie or Go Desi"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
            />
          )}

          <Input
            label="Work Email Address"
            type="email"
            placeholder="founder@startup.com"
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

          <Button type="submit" variant="enterprise" className="w-full py-3 mt-2 font-bold shadow-md shadow-emerald-100">
            {mode === 'signup' ? 'Create Startup Account →' : 'Access Startup Portal →'}
          </Button>
        </form>

        <div className="pt-2 text-xs text-slate-500">
          {mode === 'signup' ? 'Already registered?' : 'New brand to IdeaBridge?'}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
            className="font-bold text-emerald-700 hover:underline"
          >
            {mode === 'signup' ? 'Sign in' : 'Register brand'}
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
