import { Json } from '@/lib/supabase'

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compare_at_price: number | null
  images: string[]
  category_id: string
  category: Category
  colors: ProductColor[]
  sizes: ProductSize[]
  tags: string[]
  featured: boolean
  new_arrival: boolean
  best_seller: boolean
  limited_edition: boolean
  stock: number
  rating: number
  reviews_count: number
  created_at: string
  updated_at: string
}

export interface ProductColor {
  id: string
  name: string
  hex: string
  image?: string
}

export interface ProductSize {
  id: string
  name: string
  stock: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  image: string
  parent_id: string | null
  parent?: Category
  children?: Category[]
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  color: ProductColor
  size: ProductSize
}

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  phone?: string
  created_at: string
}

export interface Address {
  id: string
  user_id: string
  name: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  is_default: boolean
}

export interface Order {
  id: string
  user_id: string
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  total: number
  subtotal: number
  shipping: number
  tax: number
  discount: number
  items: OrderItem[]
  shipping_address: Address
  billing_address: Address
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: string
  product: Product
  quantity: number
  price: number
  color: ProductColor
  size: ProductSize
}

export interface Review {
  id: string
  product_id: string
  user_id: string
  user: User
  rating: number
  title: string
  content: string
  images?: string[]
  created_at: string
}

export interface WishlistItem {
  id: string
  product: Product
  created_at: string
}

export interface Coupon {
  id: string
  code: string
  type: 'percentage' | 'fixed'
  value: number
  min_order: number
  max_discount: number | null
  expires_at: string
}

export interface FilterState {
  categories: string[]
  colors: string[]
  sizes: string[]
  priceRange: [number, number]
  rating: number | null
  sort: 'newest' | 'popularity' | 'price-asc' | 'price-desc'
}
