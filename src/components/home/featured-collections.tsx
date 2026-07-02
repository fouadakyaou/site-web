'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/lib/data'

export function FeaturedCollections() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our carefully curated collections designed for the modern lifestyle.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/shop?category=${category.slug}`}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80 mb-4 text-center line-clamp-2">
                    {category.description}
                  </p>
                  <span className="text-sm text-white/60 flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
