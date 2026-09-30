-- RunwaySnap Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Users table
create table if not exists public.users (
  id text primary key,          -- Clerk user ID
  email text not null default '',
  credits_remaining integer not null default 3,
  plan_type text not null default 'free',
  stripe_customer_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.users is 'RunwaySnap users synced from Clerk';

-- Plans reference table
create table if not exists public.plans (
  id text primary key,
  name text not null,
  credits integer not null,
  price_usd numeric(10,2) not null,
  stripe_price_id text,
  created_at timestamptz not null default now()
);

-- Seed plans
insert into public.plans (id, name, credits, price_usd) values
  ('free', 'Free', 3, 0),
  ('pay_per_generation', 'Pay per use', 1, 1.00),
  ('starter', 'Starter', 25, 19.00),
  ('pro', 'Pro', 80, 49.00),
  ('agency', 'Agency', 300, 149.00)
on conflict (id) do nothing;

-- Generations table
create table if not exists public.generations (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null references public.users(id) on delete cascade,
  input_image_url text not null,
  output_image_urls text[] not null default '{}',
  settings jsonb not null default '{}',
  created_at timestamptz not null default now()
);

comment on table public.generations is 'AI generation records';

-- Indexes
create index if not exists generations_user_id_idx on public.generations(user_id);
create index if not exists generations_created_at_idx on public.generations(created_at desc);
create index if not exists users_email_idx on public.users(email);

-- Updated_at trigger for users
create or replace function public.update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_users_updated_at on public.users;
create trigger set_users_updated_at
  before update on public.users
  for each row execute function public.update_updated_at_column();

-- Row Level Security
alter table public.users enable row level security;
alter table public.generations enable row level security;
alter table public.plans enable row level security;

-- Allow service role full access (used by API routes)
create policy "Service role has full access to users"
  on public.users for all
  using (true)
  with check (true);

create policy "Service role has full access to generations"
  on public.generations for all
  using (true)
  with check (true);

create policy "Plans are publicly readable"
  on public.plans for select
  using (true);
