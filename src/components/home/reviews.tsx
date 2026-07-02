'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui'

const reviews = [
  {
    id: '1',
    name: 'Elizabeth M.',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'Absolutely love my new cashmere coat! The quality is exceptional and the fit is perfect. LUXE never disappoints with their attention to detail.',
    rating: 5,
    product: 'Elegant Cashmere Coat',
  },
  {
    id: '2',
    name: 'James W.',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'The leather jacket exceeded my expectations. It fits perfectly and the craftsmanship is outstanding. Worth every penny!',
    rating: 5,
    product: 'Premium Leather Jacket',
  },
  {
    id: '3',
    name: 'Sophie R.',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/1494794/pexels-photo-1494794.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'My new favorite shopping destination. The quality of their products is unmatched, and the customer service is exceptional.',
    rating: 5,
    product: 'Designer Handbag',
  },
  {
    id: '4',
    name: 'Michael L.',
    role: 'Verified Buyer',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    content: 'Best sneakers I have ever owned. The comfort level is incredible and they look amazing. Delivery was fast and packaging was premium.',
    rating: 4,
    product: 'Premium Sneakers',
  },
]

export function ReviewsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust LUXE for their fashion needs.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {reviews.map((review, index) => (
                <CarouselItem key={review.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full p-6 rounded-2xl bg-background border"
                  >
                    <Quote className="h-8 w-8 text-muted-foreground/20 mb-4" />
                    <p className="text-muted-foreground mb-6 line-clamp-4">
                      "{review.content}"
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-muted-foreground/30'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="h-10 w-10 rounded-full bg-muted bg-cover bg-center"
                        style={{ backgroundImage: `url(${review.avatar})` }}
                      />
                      <div>
                        <p className="font-medium">{review.name}</p>
                        <p className="text-xs text-muted-foreground">{review.role}</p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4">
                      Purchased: {review.product}
                    </p>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 top-1/2 -translate-x-1/2 -translate-y-1/2" />
            <CarouselNext className="right-0 top-1/2 translate-x-1/2 -translate-y-1/2" />
          </Carousel>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-center gap-8 mt-12"
        >
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">4.9</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">Average Rating</p>
          </div>
          <div className="w-px h-16 bg-border" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">50K+</p>
            <p className="text-sm text-muted-foreground mt-1">Happy Customers</p>
          </div>
          <div className="w-px h-16 bg-border" />
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">12K+</p>
            <p className="text-sm text-muted-foreground mt-1">5-Star Reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
