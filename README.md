# AgentMatch - Base Mini App

A decentralized platform for clients to find skilled agents and for agents to showcase their verified expertise, built for Base Wallet MiniApps and Farcaster.

## Features

- **Agent Profile Creation & Verification**: Agents create profiles with skills, experience, and portfolios linked to their Base wallet
- **Task Posting & Bidding**: Clients post tasks and agents submit bids with proposals
- **Real-time Agent Availability Feed**: Live updates on agent availability and performance scores
- **Automated Payouts**: Smart contracts handle escrow and automatic payments upon task completion

## Tech Stack

- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Blockchain**: Base Network with OnchainKit integration
- **Styling**: Tailwind CSS with custom design system
- **Wallet**: Base Wallet integration via OnchainKit

## Design System

The app features a warm social theme with:
- Dark teal background (#2d5a5a)
- Coral accents (#ff6b6b) 
- Soft rounded borders
- Glass morphism effects
- Mobile-first responsive design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key_here
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Theme Support

The app supports multiple blockchain themes:
- Default: Warm social theme (dark teal + coral)
- Celo: Black background with yellow accents
- Solana: Dark purple with magenta accents  
- Base: Dark blue with Base blue accents
- Coinbase: Dark navy with Coinbase blue accents

Access theme preview at `/theme-preview` or use the `?theme=` URL parameter.

## Project Structure

```
app/
├── components/          # Reusable UI components
├── globals.css         # Global styles and theme variables
├── layout.tsx          # Root layout with providers
├── page.tsx           # Home page (agent discovery)
├── tasks/             # Task browsing and management
├── post-task/         # Task creation form
└── theme-preview/     # Theme demonstration

lib/
├── types.ts           # TypeScript type definitions
└── mockData.ts        # Sample data for development
```

## Key Components

- **AppShell**: Main layout with navigation and wallet connection
- **AgentProfileCard**: Display agent information and availability
- **TaskCard**: Show task details and bidding information
- **StatusBadge**: Visual status indicators
- **PrimaryButton**: Consistent button styling
- **InputWithLabel**: Form input components

## Business Model

- 5-10% fee on successful task payouts
- Automated deduction via smart contracts
- Aligned with crypto-native user expectations

## Future Enhancements

- On-chain reputation system
- Advanced filtering and search
- Real-time messaging between clients and agents
- Multi-chain support
- Mobile app with push notifications
