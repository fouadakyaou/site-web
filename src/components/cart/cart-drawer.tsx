'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore()
  const total = getTotal()

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5" />
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <span className="ml-1 text-sm text-muted-foreground">
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                <h3 className="text-lg font-medium">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Button onClick={onClose} asChild>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-auto p-4">
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="flex gap-4 p-4 rounded-xl border bg-card"
                        >
                          <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                            <Image
                              src={item.product.images[0] || '/placeholder.jpg'}
                              alt={item.product.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium truncate">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.color.name} / {item.size.name}
                            </p>
                            <p className="text-sm font-medium mt-1">
                              {formatPrice(item.product.price)}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 ml-auto text-destructive hover:text-destructive"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="border-t p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatPrice(total)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-sm">Calculated at checkout</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>

                  <div className="grid gap-2">
                    <Button size="lg" className="w-full" asChild>
                      <Link href="/checkout">Checkout</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={onClose}
                      asChild
                    >
                      <Link href="/shop">Continue Shopping</Link>
                    </Button>
                  </div>

                  <button
                    className="w-full text-sm text-muted-foreground hover:text-destructive transition-colors"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
