create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.products (
  id text primary key,
  slug text not null unique,
  name text not null,
  short_benefit text not null default '',
  description text not null default '',
  category text not null,
  image text not null default '',
  problem_statement text not null default '',
  benefits text[] not null default '{}',
  ingredients_feel text[] not null default '{}',
  usage_method text[] not null default '{}',
  who_should_use text[] not null default '{}',
  expected_timeline text[] not null default '{}',
  whats_inside jsonb not null default '[]'::jsonb,
  faqs jsonb not null default '[]'::jsonb,
  price integer not null default 2499,
  original_price integer not null default 4100,
  duration_label text not null default 'Complete 30-60 Day Healing System',
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique,
  customer_name text not null,
  phone text not null,
  address text not null,
  total_price integer not null,
  status text not null default 'pending' check (status in ('pending', 'shipped', 'delivered')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  unit_price integer not null check (unit_price >= 0),
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists products_created_at_idx on public.products (created_at asc);
create index if not exists products_active_idx on public.products (is_active, created_at asc);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_idx on public.orders (status, created_at desc);
create index if not exists order_items_order_idx on public.order_items (order_id);

drop trigger if exists set_products_updated_at on public.products;
create trigger set_products_updated_at
before update on public.products
for each row
execute function public.set_updated_at();

drop trigger if exists set_orders_updated_at on public.orders;
create trigger set_orders_updated_at
before update on public.orders
for each row
execute function public.set_updated_at();

alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'products'
      and policyname = 'public_read_active_products'
  ) then
    create policy public_read_active_products
      on public.products
      for select
      using (is_active = true);
  end if;
end
$$;
