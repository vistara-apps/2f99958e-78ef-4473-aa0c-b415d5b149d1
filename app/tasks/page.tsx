'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '../components/AppShell';
import { TaskCard } from '../components/TaskCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { mockTasks, mockBids } from '@/lib/mockData';
import { Task, Bid } from '@/lib/types';
import { Search, Filter, Plus } from 'lucide-react';
import Link from 'next/link';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [bids, setBids] = useState<Bid[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  // Simulate loading tasks
  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks(mockTasks);
      setBids(mockBids);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.requiredSkills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !statusFilter || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleTaskClick = (task: Task) => {
    // In a real app, this would navigate to task detail page
    console.log('View task details:', task.title);
  };

  const getTaskBids = (taskId: string) => {
    return bids.filter(bid => bid.taskId === taskId);
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-fg">Available Tasks</h1>
            <p className="text-text-secondary">Find tasks that match your skills</p>
          </div>
          <Link href="/post-task">
            <PrimaryButton size="sm">
              <Plus className="w-4 h-4 mr-1" />
              Post Task
            </PrimaryButton>
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass-card border border-border rounded-lg bg-surface text-fg placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-text-secondary" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="flex-1 px-3 py-2 glass-card border border-border rounded-lg bg-surface text-fg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-4">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="glass-card rounded-lg p-4 animate-pulse">
                <div className="space-y-3">
                  <div className="h-6 bg-border rounded w-3/4" />
                  <div className="h-4 bg-border rounded w-full" />
                  <div className="h-4 bg-border rounded w-2/3" />
                  <div className="flex space-x-2">
                    <div className="h-6 bg-border rounded w-16" />
                    <div className="h-6 bg-border rounded w-20" />
                    <div className="h-6 bg-border rounded w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskCard
                key={task.taskId}
                task={task}
                variant="withBidInfo"
                bids={getTaskBids(task.taskId)}
                onClick={() => handleTaskClick(task)}
              />
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-text-secondary">No tasks found matching your criteria</p>
              <PrimaryButton
                onClick={() => {
                  setSearchQuery('');
                  setStatusFilter('');
                }}
                className="mt-4"
              >
                Clear Filters
              </PrimaryButton>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {!loading && tasks.length > 0 && (
          <div className="glass-card rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-accent">
                  {tasks.filter(t => t.status === 'open').length}
                </div>
                <div className="text-sm text-text-secondary">Open Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {tasks.filter(t => t.status === 'in_progress').length}
                </div>
                <div className="text-sm text-text-secondary">In Progress</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">
                  {bids.length}
                </div>
                <div className="text-sm text-text-secondary">Total Bids</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
