import { ApiDetails, ApiEndpoint } from './api';

export interface TestResult {
  id: string;
  apiId: string;
  endpointId: string;
  timestamp: string;
  duration: number;
  success: boolean;
  statusCode: number;
  request: {
    method: string;
    url: string;
    headers: Record<string, string>;
    body?: any;
  };
  response: {
    statusCode: number;
    headers: Record<string, string>;
    body?: any;
    error?: string;
  };
  environment: {
    name: string;
    variables: Record<string, string>;
  };
}

export interface TestReport {
  id: string;
  name: string;
  createdAt: string;
  apiId: string;
  endpointId: string;
  results: TestResult[];
  summary: {
    totalTests: number;
    successCount: number;
    failureCount: number;
    averageDuration: number;
    startTime: string;
    endTime: string;
  };
  charts: {
    responseTimeDistribution: {
      labels: string[];
      data: number[];
    };
    successRateOverTime: {
      labels: string[];
      data: number[];
    };
    statusCodeDistribution: {
      labels: string[];
      data: number[];
    };
  };
}

export interface TestRun {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  schedule?: {
    enabled: boolean;
    interval: number; // minutes
    lastRun?: string;
    nextRun?: string;
  };
  environment: {
    name: string;
    variables: Record<string, string>;
  };
  tests: Array<{
    apiId: string;
    endpointId: string;
    request: {
      method: string;
      url: string;
      headers: Record<string, string>;
      body?: any;
    };
    assertions: Array<{
      type: 'status' | 'body' | 'header' | 'responseTime';
      path?: string;
      operator: 'equals' | 'contains' | 'exists' | 'lessThan' | 'greaterThan';
      expected: any;
    }>;
  }>;
}