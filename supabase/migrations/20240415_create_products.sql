-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  stock INTEGER DEFAULT 0 NOT NULL,
  category TEXT,
  is_featured BOOLEAN DEFAULT false
);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow anyone to read products
CREATE POLICY "Allow anonymous read access" 
ON products FOR SELECT 
TO anon
USING (true);

-- Only allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage products" 
ON products FOR ALL 
TO authenticated
USING (auth.role() = 'authenticated');

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policy to allow public access to product images
CREATE POLICY "Allow public access to product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'product-images');

-- Storage policy to allow authenticated users to upload product images
CREATE POLICY "Allow authenticated users to upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Create some sample products
INSERT INTO products (name, description, price, category, stock, is_featured)
VALUES 
  ('Malbec Reserva', 'Un vino tinto elegante con notas de frutas negras y especias', 45.99, 'Tinto', 100, true),
  ('Chardonnay Premium', 'Vino blanco con aromas a frutas tropicales y vainilla', 35.99, 'Blanco', 75, true),
  ('Cabernet Sauvignon', 'Vino tinto robusto con taninos suaves y notas de cereza', 55.99, 'Tinto', 50, false)
ON CONFLICT (id) DO NOTHING; 