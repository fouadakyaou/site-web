'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Bell,
} from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { Button, Card, Badge } from '@/components/ui'
import { cn } from '@/lib/utils'

const sidebarItems = [
  { name: 'Profile', href: '/account', icon: User },
  { name: 'Orders', href: '/account/orders', icon: Package, badge: 3 },
  { name: 'Wishlist', href: '/account/wishlist', icon: Heart },
  { name: 'Addresses', href: '/account/addresses', icon: MapPin },
  { name: 'Notifications', href: '/account/notifications', icon: Bell },
  { name: 'Settings', href: '/account/settings', icon: Settings },
]

function Sidebar() {
  const pathname = usePathname()

  return (
    <Card className="p-4">
      <div className="flex items-center gap-4 p-4 mb-4 border-b">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-neutral-800 to-neutral-600 flex items-center justify-center text-white font-bold text-lg">
          JD
        </div>
        <div>
          <p className="font-medium">John Doe</p>
          <p className="text-sm text-muted-foreground">john@example.com</p>
        </div>
      </div>
      <nav className="space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="flex-1">{item.name}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>
      <div className="border-t mt-4 pt-4">
        <button
          className="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-left hover:bg-muted text-destructive hover:text-destructive transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </Card>
  )
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Account</span>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <Sidebar />
            </aside>
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
