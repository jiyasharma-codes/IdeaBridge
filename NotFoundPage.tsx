import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Lightbulb, Compass, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-16 h-16 rounded-3xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 shadow-sm">
        <Lightbulb className="w-8 h-8" />
      </div>
      <div className="space-y-2 max-w-md">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed">
          The concept or destination you are searching for does not exist or has been moved.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link to="/">
          <Button variant="outline" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Home
          </Button>
        </Link>
        <Link to="/explore">
          <Button variant="primary" leftIcon={<Compass className="w-4 h-4" />}>
            Explore Concepts
          </Button>
        </Link>
      </div>
    </div>
  );
};
