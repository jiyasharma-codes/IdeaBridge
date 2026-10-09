import React from 'react';
import { IdeaStatus } from '@/types/idea';
import { Badge } from '@/components/ui/Badge';
import {
  Sparkles,
  Users,
  Search,
  FlaskConical,
  CheckCircle2,
  Rocket,
  Award,
} from 'lucide-react';

interface StatusBadgeProps {
  status: IdeaStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const config: Record<string, { label: string; variant: 'neutral' | 'brand' | 'warning' | 'purple' | 'enterprise' | 'success'; icon: React.ReactNode }> = {
    New: {
      label: 'New Concept',
      variant: 'neutral',
      icon: <Sparkles className="w-3 h-3 shrink-0" />,
    },
    'Under Review': {
      label: 'Under Review',
      variant: 'warning',
      icon: <Search className="w-3 h-3 shrink-0" />,
    },
    Testing: {
      label: 'In Testing',
      variant: 'purple',
      icon: <FlaskConical className="w-3 h-3 shrink-0" />,
    },
    Shortlisted: {
      label: 'Shortlisted',
      variant: 'brand',
      icon: <Users className="w-3 h-3 shrink-0" />,
    },
    Prototype: {
      label: 'Prototype & Lab',
      variant: 'enterprise',
      icon: <CheckCircle2 className="w-3 h-3 shrink-0" />,
    },
    Launched: {
      label: 'Launched Product',
      variant: 'success',
      icon: <Rocket className="w-3 h-3 shrink-0" />,
    },
    Rejected: {
      label: 'Archived',
      variant: 'neutral',
      icon: <Sparkles className="w-3 h-3 shrink-0" />,
    },
    Draft: {
      label: 'Draft',
      variant: 'neutral',
      icon: <Sparkles className="w-3 h-3 shrink-0" />,
    },
    Saved: {
      label: 'Bookmarked',
      variant: 'brand',
      icon: <Users className="w-3 h-3 shrink-0" />,
    },
    Implemented: {
      label: 'Implemented in Market',
      variant: 'success',
      icon: <Award className="w-3 h-3 shrink-0" />,
    },
  };

  const item = config[status] || {
    label: status,
    variant: 'neutral' as const,
    icon: <Sparkles className="w-3 h-3 shrink-0" />,
  };

  return (
    <Badge variant={item.variant} size={size} className="gap-1.5 font-medium">
      {item.icon}
      <span>{item.label}</span>
    </Badge>
  );
};
