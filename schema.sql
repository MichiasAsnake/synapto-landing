-- Drop existing tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS shops;

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable the pg_trgm extension for fuzzy text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Create Shops Table
CREATE TABLE shops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  upload_token TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Products Table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  shop_id UUID REFERENCES shops(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  price_cents INTEGER NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Indexes
CREATE INDEX idx_products_shop_id ON products(shop_id);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX products_name_trgm_idx ON products USING GIN (name gin_trgm_ops);
CREATE UNIQUE INDEX idx_shops_upload_token ON shops(upload_token);

-- Create a function to search active products by similarity (typo tolerance)
CREATE OR REPLACE FUNCTION search_products(search_term text)
RETURNS SETOF products AS $$
  SELECT *
  FROM products
  WHERE is_active = true 
    AND name % search_term;
$$ LANGUAGE sql;

-- Setup RLS (Row Level Security)
-- Disable RLS on tables for now, but if enabled later, these are the starting points:
ALTER TABLE shops ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active shops and products
CREATE POLICY "Public read access to active shops" ON shops
  FOR SELECT USING (is_active = true);

CREATE POLICY "Public read access to active products" ON products
  FOR SELECT USING (is_active = true);

-- Important: Service role (backend) will bypass RLS for inserts/updates. 
-- Do not allow public insert/update/delete.

-- Output for setup instructions
-- 1. Run this file in your Supabase SQL Editor.
-- 2. Create a public storage bucket named 'product-images'.
--    - Go to Storage > New Bucket
--    - Name: `product-images`
--    - Public bucket: True
--    - No additional security rules needed (service role handles uploads).
