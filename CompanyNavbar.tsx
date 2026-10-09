import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import {
  Building2,
  LayoutDashboard,
  ShieldCheck,
  LogIn,
  Compass,
  Layers,
  TrendingUp,
  Briefcase,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const CompanyNavbar: React.FC = () => {
  const { startupUser, setStartupUser, selectedStartup } = useApp();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { label: 'Overview', path: '/company' },
    { label: 'Dashboard', path: '/company/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Consumer Ideas', path: '/company/discover', icon: <Compass className="w-4 h-4" /> },
    { label: 'Pipeline', path: '/company/shortlist', icon: <Layers className="w-4 h-4" /> },
    { label: 'Market Intelligence', path: '/company/intelligence', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Startup Profile', path: '/company/profile', icon: <Briefcase className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Portal Type */}
          <div className="flex items-center gap-6">
            <Link to="/company" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-white leading-tight">
                    Idea<span className="text-emerald-400">Bridge</span>
                  </span>
                  <Badge
                    variant="enterprise"
                    size="sm"
                    className="bg-emerald-950/80 text-emerald-300 border-emerald-800/80"
                  >
                    Startup Portal
                  </Badge>
                </div>
                <span className="text-[10px] text-slate-400 tracking-wider uppercase">
                  Consumer Innovation Engine
                </span>
              </div>
            </Link>

            {/* Nav Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {links.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors',
                      isActive
                        ? 'bg-slate-800 text-emerald-400 shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Action Bar & Startup Selector */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Active Authenticated Startup Context Display */}
            <div className="flex items-center gap-1.5 bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-700 text-xs">
              <span className="text-slate-400 text-[11px]">Brand:</span>
              <span className="text-emerald-400 font-bold text-xs">{selectedStartup.name}</span>
            </div>

            {startupUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                <Link
                  to="/company/profile"
                  className="flex items-center gap-2 text-right hover:opacity-90 transition-opacity"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-900 text-emerald-300 flex items-center justify-center font-bold text-xs">
                    {startupUser.name.charAt(0)}
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-semibold text-white leading-tight flex items-center gap-1">
                      {startupUser.name}
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    </p>
                    <p className="text-[10px] text-slate-400 leading-tight">
                      {startupUser.startupName}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => setStartupUser(null)}
                  className="text-xs text-slate-400 hover:text-rose-400 px-2 py-1 ml-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/company/auth">
                <Button
                  variant="enterprise"
                  size="sm"
                  leftIcon={<LogIn className="w-4 h-4" />}
                >
                  Startup Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle startup menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-1.5 animate-slide-up">
          <div className="pb-2 mb-2 border-b border-slate-800 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">Authenticated Brand:</span>
            <span className="text-emerald-400 font-bold">{selectedStartup.name}</span>
          </div>

          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 text-sm font-medium"
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
          {startupUser ? (
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-emerald-400">{startupUser.startupName}</span>
              <button
                onClick={() => {
                  setStartupUser(null);
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-rose-400"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/company/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="block pt-2"
            >
              <Button variant="enterprise" size="sm" className="w-full">
                Startup Sign In
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
