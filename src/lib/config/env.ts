import { ConfigurationError } from '../errors';

export interface AppConfig {
  supabase: {
    url: string;
    anonKey: string;
  };
  isProduction: boolean;
}

export function validateEnv(): AppConfig {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || supabaseUrl === 'https://placeholder.supabase.co') {
    throw new ConfigurationError('NEXT_PUBLIC_SUPABASE_URL is missing or invalid.');
  }

  if (!supabaseAnonKey || supabaseAnonKey === 'placeholder') {
    throw new ConfigurationError('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing or invalid.');
  }

  return {
    supabase: {
      url: supabaseUrl,
      anonKey: supabaseAnonKey
    },
    isProduction: process.env.NODE_ENV === 'production'
  };
}

export function safeGetConfig(): AppConfig | null {
  try {
    return validateEnv();
  } catch (err) {
    return null;
  }
}
