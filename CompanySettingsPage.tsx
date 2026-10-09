import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/context/AppContext';
import { Moon, Sun, Shield, Bell, Check } from 'lucide-react';

export const CompanySettingsPage: React.FC = () => {
  const { selectedStartup, isDarkMode, toggleDarkMode, showToast } = useApp();

  return (
    <div className="space-y-6 max-w-4xl animate-fade-in">
      {/* Pagehead */}
      <div className="border-b border-slate-200/80 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Startup Settings
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage brand configuration, notifications, and portal appearance.
        </p>
      </div>

      {/* Brand Identity Card */}
      <Card className="p-6 border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-base flex items-center justify-center shadow-xs">
              {selectedStartup.avatar || 'NV'}
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">{selectedStartup.name}</h3>
              <p className="text-xs text-slate-500">{selectedStartup.category} · {selectedStartup.stage}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5" />
            Verified Startup
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
          <b className="block font-bold text-slate-900 mb-0.5">Brand Tagline & Mission:</b>
          <p>{selectedStartup.tagline}</p>
        </div>
      </Card>

      {/* Theme & Display Preferences (Startup Dark Mode) */}
      <Card className="p-6 border-slate-200 bg-white space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Portal Display & Theme</h3>
          <p className="text-xs text-slate-500">Configure theme appearance across the IdeaBridge Startup experience.</p>
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
                {isDarkMode ? 'High-contrast dark palette enabled' : 'Clean light workspace enabled'}
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
            <span>{isDarkMode ? 'Switch to Light' : 'Switch to Dark'}</span>
          </Button>
        </div>
      </Card>

      {/* Notification Signals */}
      <Card className="p-6 border-slate-200 bg-white space-y-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900">Innovation Alert Thresholds</h3>
          <p className="text-xs text-slate-500">Configure when the IdeaBridge AI engine alerts your R&D leadership team.</p>
        </div>

        <div className="space-y-2 text-xs">
          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-800">Alert when a concept crosses 80% purchase intent</span>
            </div>
            <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">
              <Check className="w-3.5 h-3.5" />
            </span>
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-800">Alert on high-density emerging cluster formation</span>
            </div>
            <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">
              <Check className="w-3.5 h-3.5" />
            </span>
          </label>

          <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Bell className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-slate-800">Weekly innovation digest email</span>
            </div>
            <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-xs">
              <Check className="w-3.5 h-3.5" />
            </span>
          </label>
        </div>

        <div className="pt-2 flex justify-end">
          <Button
            variant="primary"
            size="sm"
            onClick={() => showToast('Settings preferences saved')}
          >
            Save Preferences
          </Button>
        </div>
      </Card>
    </div>
  );
};
