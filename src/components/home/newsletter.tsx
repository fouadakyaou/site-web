'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { Button, Input } from '@/components/ui'

export function Newsletter() {
  const [email, setEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-muted-foreground mb-8">
            Subscribe to our newsletter for exclusive access to new arrivals, special
            offers, and style inspiration delivered straight to your inbox.
          </p>

          {subscribed ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
            >
              <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                Thank you for subscribing! Check your inbox for a welcome surprise.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="max-w-sm"
                required
              />
              <Button type="submit">Subscribe</Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
