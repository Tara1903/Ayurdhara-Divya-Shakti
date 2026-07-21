// AuthService — Phase 7 (Supabase + Mock Fallback)
// Handles secure authentication. Uses Supabase if configured, otherwise falls back to mock storage.

import { createClient } from '@/lib/supabase/client';

export interface User {
  id: string;
  email: string;
  fullName: string;
  mobile: string;
  createdAt: string;
  isGoldMember?: boolean;
  goldMembershipStatus?: string;
  goldMemberSince?: string;
}

export interface Session {
  access_token: string;
  user: User;
}

// --- MOCK FALLBACK IMPLEMENTATION ---
const MOCK_DB_KEY = 'ayd_mock_users';
const SESSION_KEY = 'ayd_session';

function getMockUsers(): User[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(MOCK_DB_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMockUser(user: User) {
  if (typeof window === 'undefined') return;
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));
}

export const authService = {
  /**
   * Get current session
   */
  async getSession(): Promise<Session | null> {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) return null;
      
      // Fetch profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      return {
        access_token: session.access_token,
        user: {
          id: session.user.id,
          email: session.user.email || '',
          fullName: profile?.full_name || '',
          mobile: profile?.mobile || '',
          createdAt: session.user.created_at,
          isGoldMember: profile?.is_gold_member || false,
          goldMembershipStatus: profile?.gold_membership_status || 'inactive',
          goldMemberSince: profile?.gold_member_since || undefined
        }
      };
    }

    // Mock Fallback
    if (typeof window === 'undefined') return null;
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  },

  /**
   * Register a new user
   */
  async signUp(data: { email: string; fullName: string; mobile: string; password?: string }): Promise<{ user: User | null; error: string | null }> {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (!data.password) return { user: null, error: 'Password is required' };
      const supabase = createClient();
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            mobile: data.mobile
          }
        }
      });

      if (error) return { user: null, error: error.message };
      
      return {
        user: authData.user ? {
          id: authData.user.id,
          email: authData.user.email || '',
          fullName: data.fullName,
          mobile: data.mobile,
          createdAt: authData.user.created_at
        } : null,
        error: null
      };
    }

    // Mock Fallback
    await new Promise((resolve) => setTimeout(resolve, 800));
    const users = getMockUsers();
    if (users.find(u => u.email === data.email)) {
      return { user: null, error: 'A user with this email already exists.' };
    }

    const newUser: User = {
      id: `usr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      email: data.email,
      fullName: data.fullName,
      mobile: data.mobile,
      createdAt: new Date().toISOString(),
    };
    saveMockUser(newUser);

    const session: Session = {
      access_token: `mock_jwt_${Date.now()}`,
      user: newUser,
    };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    return { user: newUser, error: null };
  },

  /**
   * Sign in an existing user
   */
  async signIn(email: string, password?: string): Promise<{ session: Session | null; error: string | null }> {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      if (!password) return { session: null, error: 'Password is required' };
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) return { session: null, error: error.message };

      const sessionData = await this.getSession();
      return { session: sessionData, error: null };
    }

    // Mock Fallback
    await new Promise((resolve) => setTimeout(resolve, 800));
    const users = getMockUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return { session: null, error: 'Invalid login credentials.' };
    }

    const session: Session = {
      access_token: `mock_jwt_${Date.now()}`,
      user: user,
    };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }
    return { session, error: null };
  },

  /**
   * Sign out the user
   */
  async signOut(): Promise<{ error: string | null }> {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      return { error: error ? error.message : null };
    }

    // Mock Fallback
    await new Promise((resolve) => setTimeout(resolve, 400));
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(SESSION_KEY);
    }
    return { error: null };
  },

  /**
   * Update User Profile
   */
  async updateProfile(userId: string, data: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createClient();
      const { data: updatedProfile, error } = await supabase
        .from('profiles')
        .update({
          full_name: data.fullName,
          mobile: data.mobile
        })
        .eq('id', userId)
        .select()
        .single();

      if (error) return { user: null, error: error.message };

      const user = await this.getSession();
      return { user: user?.user || null, error: null };
    }

    // Mock Fallback
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (typeof window === 'undefined') return { user: null, error: 'Server error' };

    const users = getMockUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return { user: null, error: 'User not found.' };
    }

    const updatedUser = { ...users[userIndex], ...data };
    users[userIndex] = updatedUser;
    localStorage.setItem(MOCK_DB_KEY, JSON.stringify(users));

    const sessionStr = sessionStorage.getItem(SESSION_KEY);
    if (sessionStr) {
      const session = JSON.parse(sessionStr);
      session.user = updatedUser;
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
    }

    return { user: updatedUser, error: null };
  }
};
