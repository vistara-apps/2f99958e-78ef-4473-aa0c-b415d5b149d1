'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { AgentProfileCard } from './components/AgentProfileCard';
import { PrimaryButton } from './components/PrimaryButton';
import { mockAgents } from '@/lib/mockData';
import { User } from '@/lib/types';
import { Search, Filter } from 'lucide-react';

export default function HomePage() {
  const [agents, setAgents] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState<string>('');

  // Simulate loading agents
  useEffect(() => {
    const timer = setTimeout(() => {
      setAgents(mockAgents);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Get all unique skills for filter
  const allSkills = Array.from(
    new Set(agents.flatMap(agent => agent.skills))
  ).sort();

  // Filter agents based on search and skill
  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSkill = !selectedSkill || agent.skills.includes(selectedSkill);
    return matchesSearch && matchesSkill;
  });

  const handleAgentClick = (agent: User) => {
    // In a real app, this would navigate to agent detail page
    console.log('View agent profile:', agent.displayName);
  };

  return (
    <AppShell variant="gradientBackground">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-fg">Find Perfect Agents</h1>
          <p className="text-text-secondary">
            Discover verified agents ready to help with your tasks
          </p>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search agents or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-card border border-border rounded-lg bg-surface text-fg placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="flex-1 px-3 py-2 glass-card border border-border rounded-lg bg-surface text-fg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">All Skills</option>
              {allSkills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Agents List */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <AgentProfileCard
                key={index}
                agent={{} as User}
                variant="skeleton"
              />
            ))
          ) : filteredAgents.length > 0 ? (
            filteredAgents.map((agent) => (
              <AgentProfileCard
                key={agent.walletAddress}
                agent={agent}
                variant="compact"
                onClick={() => handleAgentClick(agent)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary">No agents found matching your criteria</p>
              <PrimaryButton
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSkill('');
                }}
                className="mt-4"
              >
                Clear Filters
              </PrimaryButton>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {!loading && agents.length > 0 && (
          <div className="glass-card rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">{agents.length}</div>
                <div className="text-sm text-text-secondary">Active Agents</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {agents.filter(a => a.availabilityStatus === 'available').length}
                </div>
                <div className="text-sm text-text-secondary">Available Now</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {allSkills.length}
                </div>
                <div className="text-sm text-text-secondary">Skills Covered</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
