'use client';

import { Task, Bid } from '@/lib/types';
import { Clock, DollarSign, Users } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface TaskCardProps {
  task: Task;
  variant?: 'basic' | 'withBidInfo';
  bids?: Bid[];
  onClick?: () => void;
}

export function TaskCard({ task, variant = 'basic', bids = [], onClick }: TaskCardProps) {
  const formatBudget = (budget: string) => {
    const eth = parseFloat(budget) / 1e18;
    return `${eth.toFixed(2)} ETH`;
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div 
      className="glass-card rounded-lg p-4 hover:bg-opacity-80 transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-fg mb-1">{task.title}</h3>
          <p className="text-sm text-text-secondary line-clamp-2">{task.description}</p>
        </div>
        <StatusBadge status={task.status} />
      </div>
      
      <div className="flex flex-wrap gap-1 mb-3">
        {task.requiredSkills.map((skill) => (
          <span
            key={skill}
            className="px-2 py-1 text-xs bg-accent bg-opacity-20 text-accent rounded-md"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-text-secondary">
            <DollarSign className="w-4 h-4 mr-1" />
            <span>{formatBudget(task.budget)}</span>
          </div>
          <div className="flex items-center text-text-secondary">
            <Clock className="w-4 h-4 mr-1" />
            <span>{timeAgo(task.createdAt)}</span>
          </div>
        </div>
        
        {variant === 'withBidInfo' && (
          <div className="flex items-center text-text-secondary">
            <Users className="w-4 h-4 mr-1" />
            <span>{bids.length} bids</span>
          </div>
        )}
      </div>
    </div>
  );
}
