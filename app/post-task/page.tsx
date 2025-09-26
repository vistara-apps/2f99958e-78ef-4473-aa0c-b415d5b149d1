'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { InputWithLabel } from '../components/InputWithLabel';
import { PrimaryButton } from '../components/PrimaryButton';
import { ArrowLeft, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PostTaskPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    requiredSkills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.requiredSkills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        requiredSkills: [...prev.requiredSkills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      requiredSkills: prev.requiredSkills.filter(skill => skill !== skillToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget is required';
    } else {
      const budgetNum = parseFloat(formData.budget);
      if (isNaN(budgetNum) || budgetNum <= 0) {
        newErrors.budget = 'Budget must be a positive number';
      }
    }

    if (formData.requiredSkills.length === 0) {
      newErrors.skills = 'At least one skill is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would create the task on-chain
      console.log('Creating task:', formData);
      
      // Redirect to tasks page
      router.push('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Link href="/tasks">
            <button className="p-2 glass-card rounded-lg hover:bg-opacity-80 transition-colors">
              <ArrowLeft className="w-5 h-5 text-fg" />
            </button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-fg">Post New Task</h1>
            <p className="text-text-secondary">Find the perfect agent for your project</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputWithLabel
            label="Task Title"
            value={formData.title}
            onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
            placeholder="e.g., Build NFT Marketplace Smart Contract"
            required
            error={errors.title}
          />

          <InputWithLabel
            label="Task Description"
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            variant="textarea"
            placeholder="Describe your project requirements, timeline, and any specific details..."
            required
            error={errors.description}
            helper="Be as detailed as possible to attract the right agents"
          />

          <InputWithLabel
            label="Budget (ETH)"
            value={formData.budget}
            onChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
            placeholder="e.g., 5.0"
            required
            error={errors.budget}
            helper="This will be held in escrow until task completion"
          />

          {/* Skills Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-fg">
              Required Skills
              <span className="text-accent ml-1">*</span>
            </label>
            
            <div className="flex space-x-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                className="flex-1 px-3 py-2 glass-card border border-border rounded-lg bg-surface text-fg placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <PrimaryButton
                type="button"
                onClick={handleAddSkill}
                size="sm"
                disabled={!newSkill.trim()}
              >
                <Plus className="w-4 h-4" />
              </PrimaryButton>
            </div>

            {formData.requiredSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.requiredSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center space-x-1 px-3 py-1 bg-accent bg-opacity-20 text-accent rounded-lg text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="hover:bg-accent hover:bg-opacity-20 rounded-full p-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {errors.skills && (
              <p className="text-sm text-red-400">{errors.skills}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <PrimaryButton
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Creating Task...' : 'Post Task'}
            </PrimaryButton>
          </div>
        </form>

        {/* Info Card */}
        <div className="glass-card rounded-lg p-4 border-l-4 border-accent">
          <h3 className="font-semibold text-fg mb-2">How it works</h3>
          <ul className="text-sm text-text-secondary space-y-1">
            <li>• Your budget will be held in escrow on Base</li>
            <li>• Agents will submit bids with their proposals</li>
            <li>• You choose the best agent for your task</li>
            <li>• Payment is released automatically upon completion</li>
          </ul>
        </div>
      </div>
    </AppShell>
  );
}
