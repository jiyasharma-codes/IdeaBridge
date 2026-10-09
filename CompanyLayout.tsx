import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { CompanySidebar } from '@/components/layout/CompanySidebar';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useApp } from '@/context/AppContext';

export const CompanyLayout: React.FC = () => {
  const { selectedStartup, isDarkMode, toggleDarkMode } = useApp();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Startup Portal Top Bar */}
      <header className="h-16 bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/startup" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-base shadow-xs">
              ⌘
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">IdeaBridge</span>
              <span className="text-xs font-extrabold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                Startup Portal
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <button
            type="button"
            onClick={toggleDarkMode}
            className="w-8 h-8 rounded-xl border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
          <span className="hidden sm:inline-block text-slate-500 font-medium">
            Active Brand:
          </span>
          <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-xl border border-indigo-100">
            {selectedStartup.name}
          </span>
        </div>
      </header>

      {/* Main Container with Sidebar */}
      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <CompanySidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div
              className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <div className="relative z-10 w-64 bg-white h-full shadow-2xl">
              <CompanySidebar onNavigate={() => setMobileSidebarOpen(false)} />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-5 sm:p-8 lg:p-10 max-w-6xl w-full min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
