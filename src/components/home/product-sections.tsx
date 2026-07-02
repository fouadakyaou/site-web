'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'
import { ProductCard } from '@/components/shop/product-card'
import { featuredProducts, newArrivals, bestSellers, limitedEdition } from '@/lib/data'
import type { Product } from '@/types'

interface ProductSectionProps {
  title: string
  subtitle?: string
  products: Product[]
  viewAllLink?: string
}

export function ProductSection({ title, subtitle, products, viewAllLink }: ProductSectionProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {viewAllLink && (
            <Button variant="ghost" asChild>
              <Link href={viewAllLink} className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          )}
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedProducts() {
  return (
    <ProductSection
      title="Featured Collection"
      subtitle="Handpicked styles for the discerning individual"
      products={featuredProducts}
      viewAllLink="/shop?filter=featured"
    />
  )
}

export function NewArrivals() {
  return (
    <ProductSection
      title="New Arrivals"
      subtitle="The latest additions to our collection"
      products={newArrivals}
      viewAllLink="/shop?filter=new"
    />
  )
}

export function BestSellers() {
  return (
    <ProductSection
      title="Best Sellers"
      subtitle="Most loved by our customers"
      products={bestSellers}
      viewAllLink="/shop?filter=bestseller"
    />
  )
}

export function LimitedEdition() {
  return (
    <ProductSection
      title="Limited Edition"
      subtitle="Exclusive pieces you won't want to miss"
      products={limitedEdition}
      viewAllLink="/shop?filter=limited"
    />
  )
}
