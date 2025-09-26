'use client';

import { User } from '@/lib/types';
import { Star, MapPin, Clock } from 'lucide-react';
import { StatusBadge } from './StatusBadge';

interface AgentProfileCardProps {
  agent: User;
  variant?: 'compact' | 'detailed' | 'skeleton';
  onClick?: () => void;
}

export function AgentProfileCard({ agent, variant = 'compact', onClick }: AgentProfileCardProps) {
  if (variant === 'skeleton') {
    return (
      <div className="glass-card rounded-lg p-4 animate-pulse">
        <div className="flex items-start space-x-3">
          <div className="w-12 h-12 bg-border rounded-full" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-border rounded w-3/4" />
            <div className="h-3 bg-border rounded w-1/2" />
            <div className="flex space-x-2">
              <div className="h-6 bg-border rounded w-16" />
              <div className="h-6 bg-border rounded w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`glass-card rounded-lg p-4 hover:bg-opacity-80 transition-all duration-200 cursor-pointer ${
        variant === 'detailed' ? 'space-y-4' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <img
            src={agent.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${agent.walletAddress}`}
            alt={agent.displayName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1">
            <StatusBadge status={agent.availabilityStatus} size="sm" />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-fg truncate">
              {agent.displayName}
            </h3>
            <div className="flex items-center space-x-1 text-yellow-400">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-medium">{agent.reputationScore}</span>
            </div>
          </div>
          
          <p className="text-sm text-text-secondary truncate">
            {agent.walletAddress.slice(0, 6)}...{agent.walletAddress.slice(-4)}
          </p>
          
          <div className="flex flex-wrap gap-1 mt-2">
            {agent.skills.slice(0, variant === 'detailed' ? agent.skills.length : 2).map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 text-xs bg-accent bg-opacity-20 text-accent rounded-md"
              >
                {skill}
              </span>
            ))}
            {variant === 'compact' && agent.skills.length > 2 && (
              <span className="px-2 py-1 text-xs bg-border text-text-secondary rounded-md">
                +{agent.skills.length - 2}
              </span>
            )}
          </div>
          
          {variant === 'detailed' && (
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-text-secondary">
                <MapPin className="w-4 h-4 mr-1" />
                <span>Available globally</span>
              </div>
              <div className="flex items-center text-sm text-text-secondary">
                <Clock className="w-4 h-4 mr-1" />
                <span>Usually responds within 2 hours</span>
              </div>
              
              {agent.portfolio.length > 0 && (
                <div className="mt-3">
                  <h4 className="text-sm font-medium text-fg mb-2">Recent Work</h4>
                  <div className="space-y-2">
                    {agent.portfolio.slice(0, 2).map((item) => (
                      <div key={item.id} className="text-sm">
                        <p className="font-medium text-fg">{item.title}</p>
                        <p className="text-text-secondary text-xs">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
