import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  icon: LucideIcon;
  href: string;
}

export interface Tenant {
  id: string;
  name: string;
  ownerEmail: string;
  agentStatus: 'online' | 'offline';
  systemPrompt: string;
}

export interface MetricData {
  date: string;
  conversations: number;
  conversions: number;
  avgResponseTime: number;
}
