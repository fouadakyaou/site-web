'use client'

import * as React from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Star,
  Minus,
  Plus,
  Check,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { ProductCard } from '@/components/shop/product-card'
import { Button, Badge } from '@/components/ui'
import { products } from '@/lib/data'
import { formatPrice } from '@/lib/utils'
import { useCartStore, useWishlistStore } from '@/store'
import { cn } from '@/lib/utils'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = products.find((p) => p.slug === slug)

  const [selectedColor, setSelectedColor] = React.useState(
    product?.colors[0] || null
  )
  const [selectedSize, setSelectedSize] = React.useState(
    product?.sizes[0] || null
  )
  const [quantity, setQuantity] = React.useState(1)
  const [activeImage, setActiveImage] = React.useState(0)
  const [isZoomed, setIsZoomed] = React.useState(false)

  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } =
    useWishlistStore()
  const isWishlisted = product ? isInWishlist(product.id) : false

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const handleAddToCart = () => {
    if (selectedColor && selectedSize) {
      addToCart(product, quantity, selectedColor, selectedSize)
    }
  }

  const discount = product.compare_at_price
    ? Math.round(
        ((product.compare_at_price - product.price) / product.compare_at_price) *
          100
      )
    : 0

  const relatedProducts = products
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4)

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/shop" className="hover:text-foreground">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link
              href={`/shop?category=${product.category.slug}`}
              className="hover:text-foreground"
            >
              {product.category.name}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative aspect-square rounded-2xl overflow-hidden bg-muted"
              >
                <Image
                  src={product.images[activeImage]}
                  alt={product.name}
                  fill
                  className={cn(
                    'object-cover transition-transform duration-500',
                    isZoomed && 'scale-150'
                  )}
                  onMouseEnter={() => setIsZoomed(true)}
                  onMouseLeave={() => setIsZoomed(false)}
                />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.new_arrival && <Badge variant="new">New</Badge>}
                  {product.limited_edition && (
                    <Badge variant="limited">Limited</Badge>
                  )}
                  {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
                </div>
              </motion.div>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      'relative h-20 w-20 rounded-xl overflow-hidden flex-shrink-0',
                      activeImage === index
                        ? 'ring-2 ring-primary ring-offset-2'
                        : 'hover:opacity-80'
                    )}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-5 w-5',
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-muted-foreground/30'
                        )}
                      />
                    ))}
                    <span className="text-sm text-muted-foreground ml-2">
                      {product.rating} ({product.reviews_count} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.compare_at_price && (
                  <span className="text-xl text-muted-foreground line-through">
                    {formatPrice(product.compare_at_price)}
                  </span>
                )}
                {discount > 0 && (
                  <Badge variant="accent">Save {discount}%</Badge>
                )}
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div>
                <h3 className="font-medium mb-3">
                  Color: <span className="text-muted-foreground">{selectedColor?.name}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        'relative h-10 w-10 rounded-full border-2 transition-all',
                        selectedColor?.id === color.id
                          ? 'ring-2 ring-primary ring-offset-2'
                          : 'hover:scale-110'
                      )}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor?.id === color.id && (
                        <Check
                          className={cn(
                            'absolute inset-0 m-auto h-5 w-5',
                            color.hex === '#ffffff' || color.hex === '#fffff0'
                              ? 'text-black'
                              : 'text-white'
                          )}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium">Size</h3>
                  <Button variant="link" className="text-xs p-0">
                    Size Guide
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      disabled={size.stock === 0}
                      className={cn(
                        'h-12 w-12 rounded-xl border text-sm font-medium transition-all',
                        selectedSize?.id === size.id
                          ? 'bg-primary text-primary-foreground border-primary'
                          : size.stock === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-muted'
                      )}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-xl">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-r-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-l-none"
                      onClick={() =>
                        setQuantity(
                          Math.min(selectedSize?.stock || 99, quantity + 1)
                        )
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {selectedSize?.stock} in stock
                  </span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="xl"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button
                  size="xl"
                  variant="outline"
                  onClick={() =>
                    isWishlisted
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                  className={cn(isWishlisted && 'text-accent')}
                >
                  <Heart
                    className={cn('h-5 w-5', isWishlisted && 'fill-current')}
                  />
                </Button>
                <Button size="xl" variant="outline">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <Truck className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">
                      On orders over $100
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <RotateCcw className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">
                      30-day policy
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-muted/50">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Secure</p>
                    <p className="text-xs text-muted-foreground">
                      SSL encrypted
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <section className="mt-20">
              <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts.map((p, index) => (
                  <ProductCard key={p.id} product={p} index={index} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
