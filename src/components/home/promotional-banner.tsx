'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui'

export function PromotionalBanner() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900"
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/1619802/pexels-photo-1619802.jpeg?auto=compress&cs=tinysrgb&w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="relative flex flex-col lg:flex-row items-center gap-8 p-8 md:p-12 lg:p-16">
            <div className="flex-1">
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-medium mb-4">
                Limited Time Offer
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Summer Sale
                <br />
                Up to 50% Off
              </h2>
              <p className="text-white/70 mb-8 max-w-lg">
                Don't miss out on our exclusive summer collection sale. Premium quality
                at unbeatable prices. Limited stock available.
              </p>
              <Button size="lg" className="group" asChild>
                <Link href="/shop?filter=sale">
                  Shop Sale
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            <div className="flex-shrink-0">
              <div className="text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white">02</div>
                    <div className="text-sm text-white/60">Days</div>
                  </div>
                  <span className="text-2xl text-white/40">:</span>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white">14</div>
                    <div className="text-sm text-white/60">Hours</div>
                  </div>
                  <span className="text-2xl text-white/40">:</span>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-bold text-white">36</div>
                    <div className="text-sm text-white/60">Mins</div>
                  </div>
                </div>
                <p className="text-white/60 text-sm">Offer ends soon</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
