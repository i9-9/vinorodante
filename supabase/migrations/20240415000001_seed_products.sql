-- Delete existing products to avoid duplicates
DELETE FROM products;

-- Check if image column exists and add it if it doesn't
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'products' 
        AND column_name = 'image'
    ) THEN
        ALTER TABLE products ADD COLUMN image TEXT;
    END IF;
END $$;

-- Insert initial products
INSERT INTO products (name, description, price, image, stock, frequency)
VALUES
    ('Club Básico', '2 botellas mensuales de vino natural seleccionado', 45.00, '/products/basic.jpg', 100, 'monthly'),
    ('Club Premium', '4 botellas mensuales de vino natural premium', 85.00, '/products/premium.jpg', 50, 'monthly'),
    ('Club Exclusivo', '3 botellas de edición limitada cada trimestre', 120.00, '/products/exclusive.jpg', 30, 'quarterly'),
    ('Club Descubrimiento', '6 botellas variadas cada semestre', 200.00, '/products/discovery.jpg', 20, 'biannual'); 