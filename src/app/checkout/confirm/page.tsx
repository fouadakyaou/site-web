'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { Button } from '@/components/ui'
import { useCartStore } from '@/store'

export default function ConfirmationPage() {
  const { clearCart } = useCartStore()

  React.useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="h-20 w-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-emerald-500" />
          </div>

          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-muted-foreground mb-6">
            Thank you for your purchase. We've received your order and will begin
            processing it right away.
          </p>

          <div className="bg-muted/50 rounded-2xl p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-2">Order Number</p>
            <p className="text-xl font-mono font-bold">#LUX-{Date.now().toString().slice(-8)}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button variant="outline" asChild>
              <Link href="/">
                <Mail className="h-4 w-4 mr-2" />
                Check Email
              </Link>
            </Button>
            <Button asChild>
              <Link href="/account/orders">
                <Package className="h-4 w-4 mr-2" />
                Track Order
              </Link>
            </Button>
          </div>

          <Button variant="link" asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
