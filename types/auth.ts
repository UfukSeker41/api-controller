export interface AuthState {
  isAuthenticated: boolean;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
}

export interface StoredAPIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
}

export interface APIKeyStorage {
  [apiId: string]: StoredAPIKey[];
}