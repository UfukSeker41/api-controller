import {
  ApiPricing,
  ApiStatus,
  ApiStats,
  ApiDocument,
  RateLimit,
  ApiTestResult
} from './apiTypes';

export interface Api {
  id: string;
  name: string;
  description: string;
  method: string;
  path: string;
  parameters: ApiParameter[];
  tags: string[];
  body?: any;
}

export interface ApiParameter {
  name: string;
  type: string;
  required: boolean;
  description: string;
  options?: string[];
  default?: string;
}

export interface ApiResponse {
  code: number;
  description: string;
  example?: any;
}

export interface ApiEndpoint {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  parameters: ApiParameter[];
  responses: Record<number, ApiResponse>;
  examples: Array<{
    title: string;
    request: {
      url: string;
      headers?: Record<string, string>;
    };
    response: any;
  }>;
}

export interface ApiAuthentication {
  type: 'apiKey' | 'OAuth' | 'none';
  location?: 'query' | 'header';
  paramName?: string;
  instructions?: string;
}

export interface ApiDetails {
  id: string;
  name: string;
  version: string;
  baseUrl: string;
  description: string;
  categories: string[];
  logo?: string;
  provider: {
    name: string;
    website: string;
    email?: string;
  };
  authentication: ApiAuthentication;
  endpoints: ApiEndpoint[];
  pricing: ApiPricing;
  status: ApiStatus;
  stats: ApiStats;
  documentation: ApiDocument;
  rateLimit: RateLimit;
  tags: string[];
  lastUpdated: string;
  popularity: number; // 0-100 score based on usage and ratings
  rating: {
    score: number; // 0-5
    count: number;
    reviews: {
      user: string;
      rating: number;
      comment: string;
      date: string;
    }[];
  };
}