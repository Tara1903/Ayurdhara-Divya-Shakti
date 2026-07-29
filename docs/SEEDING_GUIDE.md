# Seeding Guide

The database seeding mechanism is designed to be idempotent and completely safe to run in production.

## Running the Seed

```bash
npm run seed
```

## How It Works

1. The script reads static data from `src/data/productData.ts`.
2. It attempts an `UPSERT` on the `categories` table.
3. It attempts an `UPSERT` on the `products` table matching by `slug`.
4. If variants exist, it deletes existing variants and inserts fresh ones (to prevent stale sizing/pricing data while retaining idempotency).
5. It sets `app_metadata.database_initialized = true` to instruct the application to disable the static fallback and begin serving live database content.

## Diagnostics

The script ends with a summary block:
```
==============================
         SEED REPORT          
==============================
Inserted : 24
Updated  : 0
Skipped  : 0
Errors   : 0

Completed in 1.8s
==============================
```
If errors occur, detailed logs are printed inline to assist with debugging.
