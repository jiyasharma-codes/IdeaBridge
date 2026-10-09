import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/Button';
import { AvatarPickerModal } from '@/components/common/AvatarPickerModal';
import { ShareIdeaModal } from '@/components/common/ShareIdeaModal';
import {
  Search,
  PlusCircle,
  Settings,
  Moon,
  Sun,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConsumerNavbarProps {
  onSearchChange?: (q: string) => void;
  searchQuery?: string;
}

export const ConsumerNavbar: React.FC<ConsumerNavbarProps> = ({
  onSearchChange,
  searchQuery = '',
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    consumerUser,
    selectedAvatar,
    isDarkMode,
    toggleDarkMode,
    logout,
    globalConsumerSearch,
    setGlobalConsumerSearch,
  } = useApp();

  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/consumer', icon: '⌂' },
    { label: 'Explore', path: '/consumer/explore', icon: '◉' },
    { label: 'Challenges', path: '/consumer/challenges', icon: '♜' },
    { label: 'My Ideas', path: '/consumer/my-ideas', icon: '♧' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const currentSearch = searchQuery !== '' ? searchQuery : globalConsumerSearch;
  const handleSearchChange = (val: string) => {
    if (onSearchChange) onSearchChange(val);
    setGlobalConsumerSearch(val);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6">
            <Link to="/consumer" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-indigo-100">
                ⌘
              </div>
              <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">IdeaBridge</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive =
                  location.pathname === link.path ||
                  (link.path === '/consumer' && location.pathname === '/consumer/home');

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all',
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    )}
                  >
                    <span>{link.icon}</span>
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Search, Action Buttons & Menus */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prototype Search Input */}
            <div className="relative hidden md:block w-64 lg:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
              <input
                type="text"
                placeholder="Search ideas, startups, challenges..."
                value={currentSearch}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate('/consumer/explore');
                  }
                }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 rounded-full pl-10 pr-4 py-2 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800"
              />
            </div>

            {/* Share Idea CTA button */}
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsShareModalOpen(true)}
              leftIcon={<PlusCircle className="w-4 h-4" />}
              className="text-xs font-bold rounded-xl shadow-xs"
            >
              Share an Idea
            </Button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full border border-slate-200/90 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Button with Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsSettingsOpen(false);
                }}
                className="w-10 h-10 rounded-full border border-slate-200/90 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                title="Notifications"
              >
                <span>♧</span>
                <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-2 right-2 ring-2 ring-white dark:ring-slate-900"></span>
              </button>

              {isNotifOpen && (
                <div className="absolute right-0 top-12 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 z-50 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2">
                    <b className="text-xs uppercase tracking-wider text-slate-800 dark:text-slate-100">Notifications</b>
                    <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold">3 new</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 leading-snug">
                      <b>Peanut Butter Crunch Protein Bar</b> was shortlisted by Nuvie innovation team.
                    </div>
                    <div className="p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 leading-snug">
                      <b>Go Desi</b> posted a new regional summer flavour challenge.
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 leading-snug">
                      Lemon + Mint Sparkling Cooler crossed 80% community validation.
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Settings & Account Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(!isSettingsOpen);
                  setIsNotifOpen(false);
                }}
                className="w-10 h-10 rounded-full border border-slate-200/90 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Account Settings"
              >
                <Settings className="w-4 h-4" />
              </button>

              {isSettingsOpen && (
                <div className="absolute right-0 top-12 w-72 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 z-50 space-y-3 animate-fade-in">
                  <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
                    <div className="w-11 h-11 rounded-full bg-indigo-50 dark:bg-slate-700 flex items-center justify-center text-xl shadow-xs">
                      {selectedAvatar}
                    </div>
                    <div className="min-w-0">
                      <div className="font-extrabold text-sm text-slate-900 dark:text-white truncate">
                        {consumerUser?.name || 'Community Innovator'}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {consumerUser?.email || 'innovator@ideabridge.io'}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSettingsOpen(false);
                        setIsAvatarModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>◉ Change Avatar</span>
                      <span className="text-base">{selectedAvatar}</span>
                    </button>

                    <button
                      type="button"
                      onClick={toggleDarkMode}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{isDarkMode ? '☼ Switch to Light Mode' : '☾ Dark / Light Mode'}</span>
                      {isDarkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center justify-between"
                    >
                      <span>Log Out</span>
                      <LogOut className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Modals */}
      <AvatarPickerModal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
      />
      <ShareIdeaModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
};
