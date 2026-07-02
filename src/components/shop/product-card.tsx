'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye, Star } from 'lucide-react'
import { Button, Badge } from '@/components/ui'
import { formatPrice } from '@/lib/utils'
import { useCartStore, useWishlistStore } from '@/store'
import type { Product, ProductColor, ProductSize } from '@/types'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  const [quickViewOpen, setQuickViewOpen] = React.useState(false)
  const addToCart = useCartStore((state) => state.addItem)
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const isWishlisted = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(
      product,
      1,
      product.colors[0],
      product.sizes[0]
    )
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isWishlisted) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const discount = product.compare_at_price
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-muted">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {product.images[1] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </motion.div>
          )}

          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.new_arrival && <Badge variant="new">New</Badge>}
            {product.limited_edition && <Badge variant="limited">Limited</Badge>}
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
          >
            <Button
              size="sm"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-background/80 backdrop-blur-sm"
              onClick={() => setQuickViewOpen(true)}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </motion.div>

          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-colors ${
              isWishlisted ? 'text-accent' : 'hover:text-accent'
            }`}
          >
            <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-1 mb-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-muted-foreground/30'
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({product.reviews_count})
            </span>
          </div>

          <h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center gap-2 mt-1">
            <span className="font-semibold">{formatPrice(product.price)}</span>
            {product.compare_at_price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.compare_at_price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.id}
                className="h-4 w-4 rounded-full border border-white shadow-sm"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-muted-foreground">
                +{product.colors.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
