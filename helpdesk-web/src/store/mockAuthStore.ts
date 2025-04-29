import { create } from 'zustand';
import { mockAuthStore } from '@/lib/mockData';

interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: mockAuthStore.isAuthenticated,
  user: mockAuthStore.user,
  login: async (email: string, password: string) => {
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    set({
      isAuthenticated: true,
      user: {
        id: '1',
        name: 'Admin User',
        email: email,
        role: 'admin',
      },
    });
  },
  logout: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
