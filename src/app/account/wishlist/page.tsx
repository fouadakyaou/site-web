'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Trash2 } from 'lucide-react'
import { Card, Button } from '@/components/ui'
import { ProductCard } from '@/components/shop/product-card'
import { useWishlistStore } from '@/store'

export default function WishlistPage() {
  const { items, removeItem } = useWishlistStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Wishlist</h1>
        <span className="text-muted-foreground">
          {items.length} item{items.length !== 1 ? 's' : ''}
        </span>
      </div>

      {items.length === 0 ? (
        <Card className="p-12 text-center">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Save items you love to your wishlist.
          </p>
          <Button asChild>
            <Link href="/shop">Discover Products</Link>
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => (
              <motion.div
                key={item.product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <ProductCard product={item.product} index={index} />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
