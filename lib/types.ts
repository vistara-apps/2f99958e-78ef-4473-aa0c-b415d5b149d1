export interface User {
  walletAddress: string;
  displayName: string;
  avatarUrl?: string;
  accountType: 'client' | 'agent';
  skills: string[];
  portfolio: PortfolioItem[];
  availabilityStatus: 'available' | 'busy' | 'offline';
  reputationScore: number;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  completedAt: string;
}

export interface Task {
  taskId: string;
  clientId: string;
  title: string;
  description: string;
  requiredSkills: string[];
  budget: string;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  bids?: Bid[];
}

export interface Bid {
  bidId: string;
  taskId: string;
  agentId: string;
  proposal: string;
  bidAmount: string;
  status: 'active' | 'accepted' | 'rejected';
  createdAt: string;
  agent?: User;
}

export interface CompletionProof {
  proofId: string;
  taskId: string;
  agentId: string;
  submissionUrl: string;
  submittedAt: string;
  verifiedByClientAt?: string;
  txHash?: string;
}
