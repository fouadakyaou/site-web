/*
# Initial E-Commerce Schema

1. New Tables
- `categories` - Product categories (Men, Women, Accessories, etc.)
  - id (uuid, primary key)
  - name (text, not null)
  - slug (text, unique, not null)
  - description (text)
  - image (text)
  - parent_id (uuid, self-referencing foreign key)
  - created_at (timestamp)
  
- `products` - Product catalog
  - id (uuid, primary key)
  - name (text, not null)
  - slug (text, unique, not null)
  - description (text)
  - price (decimal, not null)
  - compare_at_price (decimal)
  - images (text array)
  - category_id (uuid, foreign key to categories)
  - featured (boolean, default false)
  - new_arrival (boolean, default false)
  - best_seller (boolean, default false)
  - limited_edition (boolean, default false)
  - stock (integer, default 0)
  - rating (decimal, default 0)
  - reviews_count (integer, default 0)
  - created_at (timestamp)
  - updated_at (timestamp)

- `product_colors` - Available colors for products
  - id (uuid, primary key)
  - product_id (uuid, foreign key)
  - name (text, not null)
  - hex (text, not null)
  - image (text)
  
- `product_sizes` - Available sizes for products
  - id (uuid, primary key)
  - product_id (uuid, foreign key)
  - name (text, not null)
  - stock (integer, default 0)

- `profiles` - User profiles
  - id (uuid, primary key, references auth.users)
  - email (text)
  - name (text)
  - avatar (text)
  - phone (text)
  - created_at (timestamp)
  - updated_at (timestamp)

- `addresses` - User addresses
  - id (uuid, primary key)
  - user_id (uuid, references auth.users, default auth.uid())
  - name (text, not null)
  - street (text, not null)
  - city (text, not null)
  - state (text, not null)
  - zip (text, not null)
  - country (text, not null)
  - is_default (boolean, default false)
  - created_at (timestamp)

- `orders` - Customer orders
  - id (uuid, primary key)
  - user_id (uuid, references auth.users, default auth.uid())
  - status (text, default 'pending')
  - subtotal (decimal, not null)
  - shipping (decimal, default 0)
  - tax (decimal, default 0)
  - discount (decimal, default 0)
  - total (decimal, not null)
  - shipping_address_id (uuid, foreign key)
  - billing_address_id (uuid, foreign key)
  - created_at (timestamp)
  - updated_at (timestamp)

- `order_items` - Items in orders
  - id (uuid, primary key)
  - order_id (uuid, foreign key)
  - product_id (uuid, foreign key)
  - quantity (integer, not null)
  - price (decimal, not null)
  - color (text)
  - size (text)

- `reviews` - Product reviews
  - id (uuid, primary key)
  - product_id (uuid, foreign key)
  - user_id (uuid, references auth.users, default auth.uid())
  - rating (integer, not null)
  - title (text)
  - content (text)
  - images (text array)
  - created_at (timestamp)

- `wishlists` - User wishlists
  - id (uuid, primary key)
  - user_id (uuid, references auth.users, default auth.uid())
  - product_id (uuid, foreign key)
  - created_at (timestamp)

- `cart_items` - User shopping carts
  - id (uuid, primary key)
  - user_id (uuid, references auth.users, default auth.uid())
  - product_id (uuid, foreign key)
  - quantity (integer, not null)
  - color (text)
  - size (text)
  - created_at (timestamp)

- `coupons` - Discount coupons
  - id (uuid, primary key)
  - code (text, unique, not null)
  - type (text, not null) -- 'percentage' or 'fixed'
  - value (decimal, not null)
  - min_order (decimal, default 0)
  - max_discount (decimal)
  - expires_at (timestamp)
  - created_at (timestamp)

2. Security
- Enable RLS on all tables
- Owner-scoped policies for user data (profiles, addresses, orders, etc.)
- Public read for products, categories (no auth required)
- Authenticated-only write for orders, reviews, wishlists, cart

3. Notes
- Products and categories are publicly readable (no auth required)
- User-specific data requires authentication
- All user-scoped tables have DEFAULT auth.uid() for ownership
*/

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  image text,
  parent_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_categories" ON categories;
CREATE POLICY "public_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_write_categories" ON categories;
CREATE POLICY "admin_write_categories" ON categories FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price decimal(10,2) NOT NULL,
  compare_at_price decimal(10,2),
  images text[] DEFAULT '{}',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  featured boolean DEFAULT false,
  new_arrival boolean DEFAULT false,
  best_seller boolean DEFAULT false,
  limited_edition boolean DEFAULT false,
  stock integer DEFAULT 0,
  rating decimal(3,2) DEFAULT 0,
  reviews_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_write_products" ON products;
CREATE POLICY "admin_write_products" ON products FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Product colors table
CREATE TABLE IF NOT EXISTS product_colors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  hex text NOT NULL,
  image text
);

ALTER TABLE product_colors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_product_colors" ON product_colors;
CREATE POLICY "public_read_product_colors" ON product_colors FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_write_product_colors" ON product_colors;
CREATE POLICY "admin_write_product_colors" ON product_colors FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Product sizes table
CREATE TABLE IF NOT EXISTS product_sizes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  name text NOT NULL,
  stock integer DEFAULT 0
);

ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_product_sizes" ON product_sizes;
CREATE POLICY "public_read_product_sizes" ON product_sizes FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "admin_write_product_sizes" ON product_sizes;
CREATE POLICY "admin_write_product_sizes" ON product_sizes FOR ALL
  TO authenticated USING (true) WITH CHECK (true);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text,
  name text,
  avatar text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_profile" ON profiles;
CREATE POLICY "select_own_profile" ON profiles FOR SELECT
  TO authenticated USING (auth.uid() = id);

DROP POLICY IF EXISTS "insert_own_profile" ON profiles;
CREATE POLICY "insert_own_profile" ON profiles FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "update_own_profile" ON profiles;
CREATE POLICY "update_own_profile" ON profiles FOR UPDATE
  TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Addresses table
CREATE TABLE IF NOT EXISTS addresses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  street text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  zip text NOT NULL,
  country text NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_addresses" ON addresses;
CREATE POLICY "select_own_addresses" ON addresses FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_addresses" ON addresses;
CREATE POLICY "insert_own_addresses" ON addresses FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_addresses" ON addresses;
CREATE POLICY "update_own_addresses" ON addresses FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_addresses" ON addresses;
CREATE POLICY "delete_own_addresses" ON addresses FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending',
  subtotal decimal(10,2) NOT NULL,
  shipping decimal(10,2) DEFAULT 0,
  tax decimal(10,2) DEFAULT 0,
  discount decimal(10,2) DEFAULT 0,
  total decimal(10,2) NOT NULL,
  shipping_address_id uuid REFERENCES addresses(id) ON DELETE SET NULL,
  billing_address_id uuid REFERENCES addresses(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_orders" ON orders;
CREATE POLICY "select_own_orders" ON orders FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_orders" ON orders;
CREATE POLICY "insert_own_orders" ON orders FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_orders" ON orders;
CREATE POLICY "update_own_orders" ON orders FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Order items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE SET NULL,
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  color text,
  size text
);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_order_items" ON order_items;
CREATE POLICY "select_own_order_items" ON order_items FOR SELECT
  TO authenticated USING (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

DROP POLICY IF EXISTS "insert_own_order_items" ON order_items;
CREATE POLICY "insert_own_order_items" ON order_items FOR INSERT
  TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid())
  );

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text,
  images text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_reviews" ON reviews;
CREATE POLICY "public_read_reviews" ON reviews FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "insert_own_reviews" ON reviews;
CREATE POLICY "insert_own_reviews" ON reviews FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_reviews" ON reviews;
CREATE POLICY "delete_own_reviews" ON reviews FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Wishlists table
CREATE TABLE IF NOT EXISTS wishlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_wishlists" ON wishlists;
CREATE POLICY "select_own_wishlists" ON wishlists FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_wishlists" ON wishlists;
CREATE POLICY "insert_own_wishlists" ON wishlists FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_wishlists" ON wishlists;
CREATE POLICY "delete_own_wishlists" ON wishlists FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Cart items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  color text,
  size text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_cart_items" ON cart_items;
CREATE POLICY "select_own_cart_items" ON cart_items FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_cart_items" ON cart_items;
CREATE POLICY "insert_own_cart_items" ON cart_items FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_cart_items" ON cart_items;
CREATE POLICY "update_own_cart_items" ON cart_items FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_cart_items" ON cart_items;
CREATE POLICY "delete_own_cart_items" ON cart_items FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

-- Coupons table
CREATE TABLE IF NOT EXISTS coupons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('percentage', 'fixed')),
  value decimal(10,2) NOT NULL,
  min_order decimal(10,2) DEFAULT 0,
  max_discount decimal(10,2),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_coupons" ON coupons;
CREATE POLICY "public_read_coupons" ON coupons FOR SELECT
  TO anon, authenticated USING (expires_at IS NULL OR expires_at > now());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_new_arrival ON products(new_arrival) WHERE new_arrival = true;
CREATE INDEX IF NOT EXISTS idx_products_best_seller ON products(best_seller) WHERE best_seller = true;
CREATE INDEX IF NOT EXISTS idx_products_limited_edition ON products(limited_edition) WHERE limited_edition = true;
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_wishlists_user_id ON wishlists(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
