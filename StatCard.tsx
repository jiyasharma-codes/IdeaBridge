import React from 'react';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  variant?: 'brand' | 'enterprise' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  variant = 'neutral',
}) => {
  const iconVariants = {
    brand: 'bg-brand-50 text-brand-600 border-brand-100',
    enterprise: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    neutral: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <Card className="relative overflow-hidden">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
        </div>
        <div className={cn('p-3 rounded-xl border', iconVariants[variant])}>
          {icon}
        </div>
      </div>

      {(subtitle || trend) && (
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
          {trend && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-semibold px-1.5 py-0.5 rounded-md',
                trend.isPositive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              )}
            >
              {trend.isPositive ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {trend.value}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </Card>
  );
};
