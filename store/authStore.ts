import { create } from 'zustand';
import { type StateCreator } from 'zustand';
import { AuthState } from '@/types/auth';

interface AuthStore extends AuthState {
  setAuth: (isAuthenticated: boolean, user?: AuthState['user']) => void;
  logout: () => void;
}

const createAuthStore: StateCreator<AuthStore> = (set) => ({
  isAuthenticated: false,
  user: undefined,
  setAuth: (isAuthenticated, user) => set({ isAuthenticated, user }),
  logout: () => set({ isAuthenticated: false, user: undefined }),
});

export const useAuthStore = create<AuthStore>(createAuthStore);