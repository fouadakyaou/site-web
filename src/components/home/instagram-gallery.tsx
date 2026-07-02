'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram } from '@/components/ui/social-icons'
import { Button } from '@/components/ui'

const instagramPosts = [
  {
    id: '1',
    image: 'https://images.pexels.com/photos/1539364/pexels-photo-1539364.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: '2.4K',
  },
  {
    id: '2',
    image: 'https://images.pexels.com/photos/10409204/pexels-photo-10409204.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: '1.8K',
  },
  {
    id: '3',
    image: 'https://images.pexels.com/photos/1642225/pexels-photo-1642225.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: '3.1K',
  },
  {
    id: '4',
    image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: '2.7K',
  },
  {
    id: '5',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: '1.5K',
  },
  {
    id: '6',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
    likes: '2.2K',
  },
]

export function InstagramGallery() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Follow Us on Instagram</h2>
          <p className="text-muted-foreground mb-4">@luxe.fashion</p>
          <Button variant="outline" asChild>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram className="mr-2 h-4 w-4" />
              Follow Us
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${post.image})` }}
              />
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <div className="text-center text-white">
                  <Instagram className="h-6 w-6 mx-auto mb-2" />
                  <p className="text-sm font-medium">{post.likes}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
