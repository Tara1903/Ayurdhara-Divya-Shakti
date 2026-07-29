# Database Architecture

The application uses PostgreSQL (via Supabase) with a highly optimized schema.

## Core Principles

1. **Initialization Metadata:** The `app_metadata` table is the single source of truth for the environment's initialization state. If `database_initialized` is false, the Data Access Layer (DAL) seamlessly falls back to static hardcoded files. An empty `products` table does *not* trigger the fallback—an empty store is treated as a valid state.
2. **Stateless Fallback:** The application never crashes if the database goes down. Connection failures route to the static fallback logic with a logged warning.
3. **Idempotency:** Seeding scripts use UPSERT logic (`ON CONFLICT`). This guarantees you can run scripts infinitely without duplicating records.
4. **Caching Layer:** Database queries are wrapped in Next.js `unstable_cache`. Tags are assigned (e.g., `['products']`), allowing on-demand revalidation when an admin makes an update, removing the need to fetch from the DB on every page load.

## Key Tables

- `app_metadata`: System tracking, versioning, and seed history.
- `products`: Base catalog items.
- `product_variants`: Pricing, sizing, and gold member pricing.
- `categories`: Taxonomy structure.
