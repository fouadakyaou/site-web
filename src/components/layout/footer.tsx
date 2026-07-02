'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Mail,
  MapPin,
  Phone,
  CreditCard,
  ShieldCheck,
  Truck,
  RotateCcw
} from 'lucide-react'
import { Facebook, Twitter, Youtube, Instagram } from '@/components/ui/social-icons'
import { Button, Input } from '@/components/ui'

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: '/shop?filter=new' },
    { name: 'Best Sellers', href: '/shop?filter=bestseller' },
    { name: 'Sale', href: '/shop?filter=sale' },
    { name: 'Men', href: '/shop?category=men' },
    { name: 'Women', href: '/shop?category=women' },
    { name: 'Accessories', href: '/shop?category=accessories' },
  ],
  help: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faq' },
    { name: 'Shipping Info', href: '/shipping' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
    { name: 'Sustainability', href: '/sustainability' },
    { name: 'Affiliates', href: '/affiliates' },
    { name: 'Store Locator', href: '/stores' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
  ],
}

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
]

const trustBadges = [
  { icon: Truck, label: 'Free Shipping', description: 'On orders over $100' },
  { icon: RotateCcw, label: 'Easy Returns', description: '30-day return policy' },
  { icon: ShieldCheck, label: 'Secure Payment', description: '256-bit SSL encryption' },
  { icon: CreditCard, label: 'Flexible Payment', description: 'Multiple options' },
]

export function Footer() {
  const [email, setEmail] = React.useState('')
  const [subscribed, setSubscribed] = React.useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 border-b">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-background"
            >
              <badge.icon className="h-8 w-8 text-primary flex-shrink-0" />
              <div className="text-center sm:text-left">
                <p className="font-medium">{badge.label}</p>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-12 border-b">
          <div>
            <Link href="/" className="inline-block">
              <span className="text-3xl font-bold tracking-tight">LUXE</span>
            </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Discover timeless elegance and modern sophistication. Our curated
              collection brings you the finest in luxury fashion, crafted with
              exceptional quality and attention to detail.
            </p>

            <div className="mt-6">
              <h4 className="font-semibold mb-3">Subscribe to our newsletter</h4>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="submit" variant="luxury">
                  {subscribed ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </form>
            </div>

            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                {footerLinks.help.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>123 Fashion Avenue, New York, NY 10001</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span>+1 (800) 123-4567</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span>support@luxe.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              {footerLinks.legal.map((link, index) => (
                <React.Fragment key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                  {index < footerLinks.legal.length - 1 && (
                    <span className="hidden sm:inline">|</span>
                  )}
                </React.Fragment>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Payment methods:
              </span>
              <div className="flex gap-1">
                {['Visa', 'MC', 'Amex', 'PayPal'].map((method) => (
                  <div
                    key={method}
                    className="h-6 w-10 rounded bg-background border flex items-center justify-center text-xs font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            &copy; {new Date().getFullYear()} LUXE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
