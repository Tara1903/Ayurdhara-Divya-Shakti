// AuthService — Phase 7 (Supabase Exclusive)
// Handles secure authentication exclusively via Supabase.

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
  role?: string;
  avatarUrl?: string;
}

export interface Session {
  access_token: string;
  user: User;
}

export const authService = {
  /**
   * Get current session
   */
  async getSession(): Promise<Session | null> {
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
        goldMemberSince: profile?.gold_member_since || undefined,
        role: profile?.role || 'customer',
        avatarUrl: profile?.avatar_url || undefined
      }
    };
  },

  /**
   * Register a new user
   */
  async signUp(data: { email: string; fullName: string; mobile: string; password?: string }): Promise<{ user: User | null; error: string | null }> {
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
    
    // Trigger welcome email via subscription endpoint
    if (authData.user?.email) {
      try {
        fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authData.user.email })
        }).catch(err => console.error('Failed to trigger welcome email on signup:', err));
      } catch (e) {
        // Ignore failures in welcome email trigger
      }
    }

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
  },

  /**
   * Sign in an existing user
   */
  async signIn(email: string, password?: string): Promise<{ session: Session | null; error: string | null }> {
    if (!password) return { session: null, error: 'Password is required' };
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) return { session: null, error: error.message };

    const sessionData = await this.getSession();
    return { session: sessionData, error: null };
  },

  /**
   * Sign out the user
   */
  async signOut(): Promise<{ error: string | null }> {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    return { error: error ? error.message : null };
  },

  /**
   * Send Email OTP for sign in / sign up
   */
  async sendEmailOtp(email: string): Promise<{ error: string | null }> {
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });
    return { error: error ? error.message : null };
  },

  /**
   * Verify Email OTP
   */
  async verifyEmailOtp(email: string, token: string): Promise<{ session: Session | null; error: string | null }> {
    const supabase = createClient();
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) return { session: null, error: error.message };

    const sessionData = await this.getSession();
    return { session: sessionData, error: null };
  },

  /**
   * Update User Profile
   */
  async updateProfile(userId: string, data: Partial<User>): Promise<{ user: User | null; error: string | null }> {
    const supabase = createClient();
    
    const updateData: any = {};
    if (data.fullName !== undefined) updateData.full_name = data.fullName;
    if (data.mobile !== undefined) updateData.mobile = data.mobile;
    if (data.avatarUrl !== undefined) updateData.avatar_url = data.avatarUrl;

    const { data: updatedProfile, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select()
      .single();

    if (error) return { user: null, error: error.message };

    const user = await this.getSession();
    return { user: user?.user || null, error: null };
  }
};
