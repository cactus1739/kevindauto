-- Chay file nay trong Supabase SQL Editor de tao nen tang tim san pham tuong tu bang hinh anh.
-- Giai doan 1 chi luu vector anh san pham; phan tao vector se lam bang script/Edge Function sau.

create extension if not exists vector;

create table if not exists public.product_image_embeddings (
  product_id text primary key,
  code text not null,
  name text not null,
  image_url text not null,
  category text,
  series text,
  tags text[] default '{}',
  embedding vector(512),
  updated_at timestamptz not null default now()
);

alter table public.product_image_embeddings enable row level security;

create index if not exists product_image_embeddings_embedding_idx
  on public.product_image_embeddings
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

create or replace function public.match_products_by_image(
  query_embedding vector(512),
  match_count int default 12
)
returns table (
  product_id text,
  code text,
  name text,
  image_url text,
  category text,
  series text,
  tags text[],
  similarity float
)
language sql
stable
as $$
  select
    product_id,
    code,
    name,
    image_url,
    category,
    series,
    tags,
    1 - (embedding <=> query_embedding) as similarity
  from public.product_image_embeddings
  where embedding is not null
  order by embedding <=> query_embedding
  limit match_count;
$$;
