import { ApiDetails } from './api';

export type ApiDocumentFormat = 'swagger' | 'openapi' | 'postman' | 'json' | 'yaml';

export interface ImportOptions {
  format: ApiDocumentFormat;
  includeTests?: boolean;
  includeHistory?: boolean;
}

export interface ExportOptions {
  format: ApiDocumentFormat;
  includeTests?: boolean;
  includeHistory?: boolean;
  fileName?: string;
}

export interface ApiDocumentMetadata {
  version: string;
  exportDate: string;
  format: ApiDocumentFormat;
  apiCount: number;
}

export interface ApiExportDocument {
  metadata: ApiDocumentMetadata;
  apis: ApiDetails[];
  tests?: ApiTest[];
  history?: ApiTestHistory[];
}

export interface ApiTest {
  id: string;
  apiId: string;
  timestamp: string;
  success: boolean;
  duration: number;
  request: any;
  response: any;
}

export interface ApiTestHistory {
  apiId: string;
  tests: ApiTest[];
}