import React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'enterprise' | 'neutral' | 'success' | 'warning' | 'purple' | 'outline';
  size?: 'sm' | 'md';
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'brand',
  size = 'md',
  dot = false,
  ...props
}) => {
  const variants = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200/60',
    enterprise: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-green-50 text-green-700 border-green-200/60',
    warning: 'bg-amber-50 text-amber-700 border-amber-200/60',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/60',
    outline: 'bg-white text-slate-600 border-slate-200',
  };

  const dotColors = {
    brand: 'bg-brand-500',
    enterprise: 'bg-emerald-500',
    neutral: 'bg-slate-400',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    purple: 'bg-purple-500',
    outline: 'bg-slate-400',
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border tracking-wide transition-colors',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {children}
    </span>
  );
};
