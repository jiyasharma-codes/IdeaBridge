import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { cn } from '@/lib/utils';
import { LogOut, Sun, Moon } from 'lucide-react';

interface CompanySidebarProps {
  className?: string;
  onNavigate?: () => void;
}

const SECTIONS = [
  { path: '/startup', exact: true, label: 'Overview', icon: '▦' },
  { path: '/startup/ideas', label: 'Consumer Ideas', icon: '♧' },
  { path: '/startup/challenges', label: 'Challenges', icon: '♜' },
  { path: '/startup/market', label: 'Market Insights', icon: '✦' },
  { path: '/startup/concept', label: 'Concept Lab', icon: '⚗' },
  { path: '/startup/marketing', label: 'Marketing Intelligence', icon: '⌁' },
  { path: '/startup/financial', label: 'Financial Intelligence', icon: '₹' },
  { path: '/startup/analytics', label: 'Analytics', icon: '▥' },
  { path: '/startup/settings', label: 'Settings', icon: '⚙' },
];

export const CompanySidebar: React.FC<CompanySidebarProps> = ({ className, onNavigate }) => {
  const navigate = useNavigate();
  const { selectedStartup, logout, isDarkMode, toggleDarkMode } = useApp();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className={cn('w-64 bg-white border-r border-slate-200/90 flex flex-col p-4 shadow-sm shrink-0 min-h-[calc(100vh-72px)]', className)}>
      {/* Startup Profile Header in Sidebar */}
      <div className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 mb-5 space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white font-black text-sm flex items-center justify-center shadow-xs">
            {selectedStartup.avatar || 'NV'}
          </div>
          <div className="min-w-0">
            <div className="font-extrabold text-slate-900 text-sm truncate">
              {selectedStartup.name}
            </div>
            <div className="text-[11px] text-slate-500 truncate">
              {selectedStartup.category}
            </div>
          </div>
        </div>

        {/* Authenticated Brand Status (Cross-company switching removed) */}
        <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Brand Account
          </span>
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
            Verified Partner
          </span>
        </div>
      </div>

      {/* 7 Prototype Sections */}
      <nav className="space-y-1 flex-1">
        {SECTIONS.map((sec) => (
          <NavLink
            key={sec.path}
            to={sec.path}
            end={sec.exact}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all',
                isActive
                  ? 'bg-indigo-50 text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              )
            }
          >
            <span className="text-base leading-none">{sec.icon}</span>
            <span>{sec.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Controls: Theme Toggle & Logout Button */}
      <div className="pt-3 border-t border-slate-100 space-y-1">
        <button
          type="button"
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-2xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
          </span>
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
            {isDarkMode ? 'Dark' : 'Light'}
          </span>
        </button>

        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
