# Environment Setup

The application features strict startup environment validation.

## Required Variables

These must be present in your `.env.local` (for development) and Vercel Environment Variables panel (for production).

```env
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhb..."

# Service role key is REQUIRED for the automated seed script to bypass RLS policies
SUPABASE_SERVICE_ROLE_KEY="eyJhb..."
```

## Validation Logic
Located in `src/lib/config/env.ts`, the environment is parsed at runtime. If any keys are missing or invalid, the system catches the `ConfigurationError` and triggers the fallback mode, ensuring that the application will always boot successfully, even in a degraded state.
