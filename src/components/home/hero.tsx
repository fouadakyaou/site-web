'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import { Button } from '@/components/ui'

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1539364/pexels-photo-1539364.jpeg?auto=compress&cs=tinysrgb&w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm mb-6">
              New Collection 2024
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
          >
            Redefine
            <br />
            <span className="text-gradient">Elegance</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 mb-8 max-w-lg"
          >
            Discover our exclusive collection of premium fashion pieces,
            designed for those who appreciate timeless sophistication.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button size="xl" className="group" asChild>
              <Link href="/shop">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/shop?filter=new">
                New Arrivals
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-2 bg-white/60 rounded-full"
          />
        </motion.div>
      </div>

      <button className="absolute right-8 top-1/2 -translate-y-1/2 h-20 w-20 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors group">
        <Play className="h-8 w-8 text-white ml-1" />
        <span className="sr-only">Watch Video</span>
      </button>
    </section>
  )
}
