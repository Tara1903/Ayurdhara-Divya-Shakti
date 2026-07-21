import { create } from 'zustand';
import { authService, User, Session } from '@/services/authService';

interface AuthState {
  user: User | null;
  session: Session | null;
  isInitialized: boolean;
  isLoading: boolean;
  
  // Actions
  initialize: () => Promise<void>;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isInitialized: false,
  isLoading: true,

  initialize: async () => {
    try {
      const session = await authService.getSession();
      set({
        session,
        user: session?.user || null,
        isInitialized: true,
        isLoading: false,
      });
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ isInitialized: true, isLoading: false, user: null, session: null });
    }
  },

  setUser: (user) => set({ user }),
  
  setSession: (session) => {
    set({ session, user: session?.user || null });
  },

  signOut: async () => {
    set({ isLoading: true });
    await authService.signOut();
    set({ user: null, session: null, isLoading: false });
  }
}));
