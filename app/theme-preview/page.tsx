'use client';

import { AppShell } from '../components/AppShell';
import { AgentProfileCard } from '../components/AgentProfileCard';
import { TaskCard } from '../components/TaskCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { StatusBadge } from '../components/StatusBadge';
import { useTheme } from '../components/ThemeProvider';
import { mockAgents, mockTasks } from '@/lib/mockData';

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'Default (Warm Social)', description: 'Dark teal with coral accents' },
    { id: 'celo', name: 'Celo', description: 'Black with yellow accents' },
    { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
    { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
    { id: 'coinbase', name: 'Coinbase', description: 'Dark navy with Coinbase blue accents' },
  ] as const;

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-fg">Theme Preview</h1>
          <p className="text-text-secondary">Preview different blockchain themes</p>
        </div>

        {/* Theme Selector */}
        <div className="glass-card rounded-lg p-4">
          <h2 className="text-lg font-semibold text-fg mb-3">Select Theme</h2>
          <div className="grid grid-cols-1 gap-2">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`p-3 rounded-lg text-left transition-all duration-200 ${
                  theme === t.id
                    ? 'bg-accent bg-opacity-20 border-2 border-accent'
                    : 'glass-card border border-border hover:bg-opacity-80'
                }`}
              >
                <div className="font-medium text-fg">{t.name}</div>
                <div className="text-sm text-text-secondary">{t.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-fg">Component Preview</h2>
          
          {/* Buttons */}
          <div className="glass-card rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-fg">Buttons</h3>
            <div className="flex flex-wrap gap-2">
              <PrimaryButton>Primary Button</PrimaryButton>
              <PrimaryButton variant="outline">Outline Button</PrimaryButton>
              <PrimaryButton variant="destructive">Destructive</PrimaryButton>
            </div>
          </div>

          {/* Status Badges */}
          <div className="glass-card rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-fg">Status Badges</h3>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status="available" />
              <StatusBadge status="busy" />
              <StatusBadge status="offline" />
              <StatusBadge status="open" />
              <StatusBadge status="in_progress" />
              <StatusBadge status="completed" />
            </div>
          </div>

          {/* Agent Card */}
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Agent Profile Card</h3>
            <AgentProfileCard agent={mockAgents[0]} variant="detailed" />
          </div>

          {/* Task Card */}
          <div className="space-y-2">
            <h3 className="font-medium text-fg">Task Card</h3>
            <TaskCard task={mockTasks[0]} variant="withBidInfo" bids={[]} />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
