'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui'
import { useCartStore, useWishlistStore } from '@/store'
import { cn } from '@/lib/utils'
import { CartDrawer } from '@/components/cart/cart-drawer'

const navigation = [
  { name: 'Home', href: '/' },
  {
    name: 'Shop',
    href: '/shop',
    children: [
      { name: 'All Products', href: '/shop' },
      { name: 'New Arrivals', href: '/shop?filter=new' },
      { name: 'Best Sellers', href: '/shop?filter=bestseller' },
      { name: 'Sale', href: '/shop?filter=sale' },
    ]
  },
  {
    name: 'Men',
    href: '/shop?category=men',
    children: [
      { name: 'All Men', href: '/shop?category=men' },
      { name: 'T-Shirts', href: '/shop?category=men-tshirts' },
      { name: 'Hoodies', href: '/shop?category=men-hoodies' },
      { name: 'Jackets', href: '/shop?category=men-jackets' },
      { name: 'Pants', href: '/shop?category=men-pants' },
      { name: 'Shoes', href: '/shop?category=men-shoes' },
    ]
  },
  {
    name: 'Women',
    href: '/shop?category=women',
    children: [
      { name: 'All Women', href: '/shop?category=women' },
      { name: 'Dresses', href: '/shop?category=women-dresses' },
      { name: 'Tops', href: '/shop?category=women-tops' },
      { name: 'Jackets', href: '/shop?category=women-jackets' },
      { name: 'Pants', href: '/shop?category=women-pants' },
      { name: 'Shoes', href: '/shop?category=women-shoes' },
    ]
  },
  { name: 'Accessories', href: '/shop?category=accessories' },
  { name: 'Sale', href: '/shop?filter=sale', highlight: true },
]

const AnnouncementBar = () => (
  <div className="bg-primary text-primary-foreground py-2 text-center text-sm font-medium">
    <p className="flex items-center justify-center gap-2">
      <span>Free shipping on orders over $100</span>
      <span className="hidden sm:inline">|</span>
      <span className="hidden sm:inline">Use code LUXURY20 for 20% off</span>
    </p>
  </div>
)

const SearchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="container mx-auto pt-20 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products..."
            className="w-full h-14 pl-12 pr-4 rounded-2xl border border-input bg-background text-lg focus:outline-none focus:ring-2 focus:ring-ring"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="mt-8 rounded-2xl border bg-card p-6">
          <p className="text-muted-foreground text-center">
            Type to search...
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

const MegaMenu = ({ items, isOpen }: { items: typeof navigation[0]['children']; isOpen: boolean }) => {
  if (!items || !isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-full left-1/2 -translate-x-1/2 w-screen max-w-4xl pt-4"
    >
      <div className="rounded-2xl border bg-card shadow-xl p-6">
        <div className="grid grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block p-3 rounded-xl hover:bg-muted transition-colors"
            >
              <p className="font-medium">{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const MobileMenu = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-background shadow-2xl lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-xl font-semibold">Menu</span>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="flex-1 overflow-auto p-4">
                <ul className="space-y-2">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          'block py-3 px-4 rounded-xl transition-colors',
                          pathname === item.href
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        )}
                      >
                        <span className={cn(
                          item.highlight && 'text-accent'
                        )}>
                          {item.name}
                        </span>
                      </Link>
                      {item.children && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.children.map((child) => (
                            <li key={child.name}>
                              <Link
                                href={child.href}
                                onClick={onClose}
                                className="block py-2 px-4 text-sm text-muted-foreground hover:text-foreground"
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="p-4 border-t space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login">
                    <User className="mr-2 h-4 w-4" />
                    Sign In
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register">Create Account</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [searchOpen, setSearchOpen] = React.useState(false)
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null)
  const { theme, setTheme } = useTheme()
  const pathname = usePathname()
  const cartCount = useCartStore((state) => state.getItemCount())
  const wishlistCount = useWishlistStore((state) => state.items.length)
  const [cartOpen, setCartOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          'sticky top-0 z-40 w-full transition-all duration-300',
          isScrolled
            ? 'bg-background/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight">
                  LUXE
                </span>
              </Link>

              <nav className="hidden lg:flex items-center gap-1">
                {navigation.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.children && setActiveMenu(item.name)}
                    onMouseLeave={() => setActiveMenu(null)}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-medium transition-colors',
                        pathname === item.href
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground',
                        item.highlight && 'text-accent'
                      )}
                    >
                      {item.name}
                      {item.children && (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Link>
                    <AnimatePresence>
                      {item.children && activeMenu === item.name && (
                        <MegaMenu items={item.children} isOpen={true} />
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="hidden sm:flex"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
                <Link href="/wishlist" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs text-accent-foreground flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-xs text-accent-foreground flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>

              <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
                <Link href="/account">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Link>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <AnimatePresence>
        {searchOpen && <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
