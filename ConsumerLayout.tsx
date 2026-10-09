import React from 'react';
import { Outlet } from 'react-router-dom';
import { ConsumerNavbar } from '@/components/layout/ConsumerNavbar';
import { Footer } from '@/components/layout/Footer';
import { ConsumerAuthModal } from '@/features/auth/ConsumerAuthModal';

export const ConsumerLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <ConsumerNavbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Outlet />
      </main>
      <Footer />
      <ConsumerAuthModal />
    </div>
  );
};
