'use client';

import { ReactNode } from 'react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Users, Briefcase, Plus } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface AppShellProps {
  children: ReactNode;
  variant?: 'default' | 'gradientBackground';
}

export function AppShell({ children, variant = 'default' }: AppShellProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Users, label: 'Agents' },
    { href: '/tasks', icon: Briefcase, label: 'Tasks' },
    { href: '/post-task', icon: Plus, label: 'Post Task' },
  ];

  return (
    <div className={`min-h-screen ${variant === 'gradientBackground' ? 'bg-gradient-to-br from-bg via-surface to-bg' : 'bg-bg'}`}>
      {/* Header */}
      <header className="glass-card border-b sticky top-0 z-50">
        <div className="w-full max-w-xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-fg">AgentMatch</span>
            </Link>
            
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center space-x-2 px-3 py-2 glass-card rounded-lg">
                  <Avatar className="w-6 h-6" />
                  <Name className="text-sm font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card border-t">
        <div className="w-full max-w-xl mx-auto px-4">
          <div className="flex items-center justify-around py-2">
            {navItems.map(({ href, icon: Icon, label }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'text-accent bg-accent bg-opacity-10' 
                      : 'text-text-secondary hover:text-fg'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Bottom padding to account for fixed nav */}
      <div className="h-20" />
    </div>
  );
}
