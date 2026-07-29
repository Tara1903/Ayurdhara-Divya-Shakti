# Supabase Setup Guide

## 1. Create a Supabase Project
1. Go to [Supabase](https://supabase.com) and create a new project.
2. Navigate to your Project Settings > API.
3. Copy the **Project URL** and **anon public** key.

## 2. Environment Variables
Add these to your `.env.local` file for local development, and to Vercel for production:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key # (Only required for the seed script)
```

## 3. Database Initialization
Go to your Supabase Dashboard > **SQL Editor** and run the contents of `supabase/full_database_setup.sql`.

This creates all the necessary tables, including the `app_metadata` table which dictates whether the app loads from the database or uses static fallback.

## 4. Seeding Data
Run the following command in your terminal to insert products into your live database:
```bash
npm run seed
```
This script will output a report of insertions and updates. Once seeded, `app_metadata.database_initialized` is set to `true`, and the application will start reading live data!
