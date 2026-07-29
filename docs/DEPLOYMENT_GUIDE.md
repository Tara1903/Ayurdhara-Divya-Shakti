# Deployment Guide

Follow this checklist for a flawless deployment of the Ayurdhara Divya Shakti application to production.

## 1. Initial Setup
- Push code to a central GitHub repository.
- Link the repository to your Vercel project.

## 2. Environment Variables (Vercel)
Ensure the following variables are configured in the Vercel project settings under the Production environment:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (Optional on Vercel, required on local for seeding).

## 3. Database Validation
- Visit your Vercel deployment URL.
- Navigate to `/api/health`.
- Verify that `database: "connected"` and `initialized: true`.
- If `initialized: false`, verify that you have successfully ran `npm run seed` against your production Supabase database.

## 4. Caching & Performance
- The application will utilize Next.js `unstable_cache`.
- Content changes made in Supabase will take effect after 60 seconds.

## Troubleshooting
- **Website looks empty / No Products**: Check `/api/health`. If the database is connected but not initialized, the system falls back to static data. Ensure your static data array isn't empty, or run `npm run seed` to initialize live data.
- **Database Disconnected**: Verify the Supabase URL and Anon Key inside Vercel's Environment Variables. Trigger a Redeploy if you updated variables.
