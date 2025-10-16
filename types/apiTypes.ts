export interface RateLimit {
  requests: number;
  period: 'second' | 'minute' | 'hour' | 'day' | 'month';
  cost: number;
}

export interface ApiPricing {
  type: 'free' | 'paid' | 'freemium';
  plans?: {
    name: string;
    price: number;
    period: 'monthly' | 'yearly';
    features: string[];
    rateLimit: RateLimit;
  }[];
}

export interface ApiStatus {
  isActive?: boolean;
  uptime: number;
  lastChecked: string;
  responseTime: number;
  incidents: Array<{
    date: string;
    description: string;
    duration: number;
  }>;
}

export interface ApiStats {
  totalCalls: number;
  failureRate: number;
  avgResponseTime: number;
  lastDayUsage?: number;
}

export interface ApiUsage {
  remainingRequests: number;
  resetTime: string;
  currentPlan: string;
}

export interface ApiDocumentSection {
  title: string;
  content: string;
  code?: string;
  language?: string;
}

export interface ApiDocument {
  overview: string;
  gettingStarted: ApiDocumentSection[];
  authentication: ApiDocumentSection[];
  examples: ApiDocumentSection[];
  errors: {
    code: number;
    message: string;
    description: string;
  }[];
  changelog: {
    version: string;
    date: string;
    changes: string[];
  }[];
}

export interface ApiCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  apis: string[]; // API IDs in this category
}

export interface ApiTestResult {
  timestamp: string;
  endpoint: string;
  method: string;
  statusCode: number;
  responseTime: number;
  success: boolean;
  request: {
    headers: Record<string, string>;
    params: Record<string, string>;
    body?: any;
  };
  response: {
    headers: Record<string, string>;
    body: any;
  };
}