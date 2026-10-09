import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Building2, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 text-white flex items-center justify-center">
                <Lightbulb className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base tracking-tight text-slate-900">
                Idea<span className="text-brand-600">Bridge</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Empowering consumers to submit breakthrough product ideas and connecting verified enterprises with validated market demand.
            </p>
          </div>

          {/* Innovators Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              For Innovators
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <Link to="/explore" className="hover:text-brand-600 transition-colors">
                  Explore Concepts
                </Link>
              </li>
              <li>
                <Link to="/challenges" className="hover:text-brand-600 transition-colors">
                  Corporate Challenges
                </Link>
              </li>
              <li>
                <Link to="/submit" className="hover:text-brand-600 transition-colors">
                  Pitch a Product Idea
                </Link>
              </li>
              <li>
                <Link to="/my-ideas" className="hover:text-brand-600 transition-colors">
                  Track My Pitches
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-brand-600 transition-colors">
                  Innovator Portfolio
                </Link>
              </li>
            </ul>
          </div>

          {/* Companies Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-emerald-600" />
              For Companies
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li>
                <Link to="/company" className="hover:text-emerald-700 transition-colors">
                  Enterprise Solutions
                </Link>
              </li>
              <li>
                <Link to="/company/dashboard" className="hover:text-emerald-700 transition-colors">
                  Scout Dashboard & Pipeline
                </Link>
              </li>
              <li>
                <Link to="/company/auth" className="hover:text-emerald-700 transition-colors">
                  Scout Authentication
                </Link>
              </li>
            </ul>
          </div>

          {/* Trust & Architecture Col */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-600" />
              Platform Integrity
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Built on scalable frontend architecture ready for Supabase Auth, PostgreSQL relational data, and AI demand clustering.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} IdeaBridge. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Built for scalable consumer-to-business innovation</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
