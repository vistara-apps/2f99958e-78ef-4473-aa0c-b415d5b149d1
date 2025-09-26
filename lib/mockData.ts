import { User, Task, Bid } from './types';

export const mockAgents: User[] = [
  {
    walletAddress: '0x1234567890123456789012345678901234567890',
    displayName: 'Sarah Chen',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    accountType: 'agent',
    skills: ['Smart Contracts', 'Solidity', 'Web3 Development'],
    portfolio: [
      {
        id: '1',
        title: 'DeFi Protocol Development',
        description: 'Built a lending protocol with $2M TVL',
        completedAt: '2024-01-15'
      }
    ],
    availabilityStatus: 'available',
    reputationScore: 4.8
  },
  {
    walletAddress: '0x2345678901234567890123456789012345678901',
    displayName: 'Marcus Rodriguez',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    accountType: 'agent',
    skills: ['UI/UX Design', 'Frontend Development', 'React'],
    portfolio: [
      {
        id: '2',
        title: 'Mobile DApp Interface',
        description: 'Designed user-friendly crypto wallet interface',
        completedAt: '2024-02-01'
      }
    ],
    availabilityStatus: 'busy',
    reputationScore: 4.6
  },
  {
    walletAddress: '0x3456789012345678901234567890123456789012',
    displayName: 'Elena Vasquez',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    accountType: 'agent',
    skills: ['Content Writing', 'Marketing', 'Community Management'],
    portfolio: [
      {
        id: '3',
        title: 'Crypto Project Launch',
        description: 'Managed community growth from 0 to 10k members',
        completedAt: '2024-01-30'
      }
    ],
    availabilityStatus: 'available',
    reputationScore: 4.9
  }
];

export const mockTasks: Task[] = [
  {
    taskId: 'task-1',
    clientId: '0x4567890123456789012345678901234567890123',
    title: 'Build NFT Marketplace Smart Contract',
    description: 'Need an experienced Solidity developer to create a gas-optimized NFT marketplace with royalty support and batch operations.',
    requiredSkills: ['Solidity', 'Smart Contracts', 'Gas Optimization'],
    budget: '5000000000000000000', // 5 ETH in wei
    status: 'open',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-01T10:00:00Z'
  },
  {
    taskId: 'task-2',
    clientId: '0x5678901234567890123456789012345678901234',
    title: 'Design DeFi Dashboard UI',
    description: 'Looking for a talented designer to create an intuitive dashboard for our DeFi protocol. Must have experience with financial interfaces.',
    requiredSkills: ['UI/UX Design', 'Figma', 'DeFi Experience'],
    budget: '2000000000000000000', // 2 ETH in wei
    status: 'open',
    createdAt: '2024-03-02T14:30:00Z',
    updatedAt: '2024-03-02T14:30:00Z'
  },
  {
    taskId: 'task-3',
    clientId: '0x6789012345678901234567890123456789012345',
    title: 'Write Technical Documentation',
    description: 'Need comprehensive documentation for our new blockchain protocol. Must be able to explain complex concepts clearly.',
    requiredSkills: ['Technical Writing', 'Blockchain Knowledge', 'Documentation'],
    budget: '1500000000000000000', // 1.5 ETH in wei
    status: 'in_progress',
    createdAt: '2024-02-28T09:15:00Z',
    updatedAt: '2024-03-01T16:20:00Z'
  }
];

export const mockBids: Bid[] = [
  {
    bidId: 'bid-1',
    taskId: 'task-1',
    agentId: '0x1234567890123456789012345678901234567890',
    proposal: 'I have 5+ years of Solidity experience and have built similar marketplaces. I can deliver this in 2 weeks with full testing suite.',
    bidAmount: '4500000000000000000', // 4.5 ETH in wei
    status: 'active',
    createdAt: '2024-03-01T12:00:00Z'
  },
  {
    bidId: 'bid-2',
    taskId: 'task-2',
    agentId: '0x2345678901234567890123456789012345678901',
    proposal: 'I specialize in DeFi interfaces and have designed dashboards for 3 major protocols. Can provide mockups within 3 days.',
    bidAmount: '1800000000000000000', // 1.8 ETH in wei
    status: 'active',
    createdAt: '2024-03-02T16:45:00Z'
  }
];
