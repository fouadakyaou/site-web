'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, CreditCard, Lock, Truck } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { Button, Input, Card } from '@/components/ui'
import { useCartStore } from '@/store'
import { formatPrice } from '@/lib/utils'

export default function CheckoutPage() {
  const { items, getTotal } = useCartStore()
  const total = getTotal()
  const shipping = total > 100 ? 0 : 15
  const tax = total * 0.08
  const grandTotal = total + shipping + tax

  const [step, setStep] = React.useState(1)
  const [formData, setFormData] = React.useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
  })

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart to checkout.
            </p>
            <Button asChild>
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/cart">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Cart
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              {['Shipping', 'Payment', 'Review'].map((s, i) => (
                <React.Fragment key={s}>
                  <div
                    className={`flex items-center gap-2 ${
                      step > i + 1
                        ? 'text-primary'
                        : step === i + 1
                        ? 'text-primary font-medium'
                        : 'text-muted-foreground'
                    }`}
                  >
                    <span
                      className={`h-8 w-8 rounded-full flex items-center justify-center text-sm ${
                        step > i + 1
                          ? 'bg-primary text-primary-foreground'
                          : step === i + 1
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {step > i + 1 ? '✓' : i + 1}
                    </span>
                    <span className="hidden sm:inline">{s}</span>
                  </div>
                  {i < 2 && (
                    <div
                      className={`h-px w-12 ${
                        step > i + 1 ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3 space-y-6">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="p-6">
                      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Truck className="h-5 w-5" />
                        Shipping Information
                      </h2>
                      <div className="grid gap-4">
                        <Input
                          placeholder="Email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstName: e.target.value,
                              })
                            }
                          />
                          <Input
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <Input
                          placeholder="Address"
                          value={formData.address}
                          onChange={(e) =>
                            setFormData({ ...formData, address: e.target.value })
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            placeholder="City"
                            value={formData.city}
                            onChange={(e) =>
                              setFormData({ ...formData, city: e.target.value })
                            }
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <Input
                              placeholder="State"
                              value={formData.state}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  state: e.target.value,
                                })
                              }
                            />
                            <Input
                              placeholder="ZIP"
                              value={formData.zip}
                              onChange={(e) =>
                                setFormData({ ...formData, zip: e.target.value })
                              }
                            />
                          </div>
                        </div>
                        <Input
                          placeholder="Phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                      <Button
                        className="w-full mt-6"
                        size="lg"
                        onClick={() => setStep(2)}
                      >
                        Continue to Payment
                      </Button>
                    </Card>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="p-6">
                      <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Payment Method
                      </h2>
                      <div className="space-y-4">
                        <div className="p-4 border-2 border-primary rounded-xl bg-primary/5">
                          <label className="flex items-center gap-3 cursor-pointer">
                            <input
                              type="radio"
                              name="payment"
                              defaultChecked
                              className="h-4 w-4"
                            />
                            <span className="font-medium">Credit Card</span>
                            <div className="ml-auto flex gap-2">
                              {['Visa', 'MC', 'Amex'].map((card) => (
                                <div
                                  key={card}
                                  className="h-6 w-10 rounded bg-background border flex items-center justify-center text-xs font-medium"
                                >
                                  {card}
                                </div>
                              ))}
                            </div>
                          </label>
                        </div>

                        <Input
                          placeholder="Card Number"
                          className="mt-4"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input placeholder="MM/YY" />
                          <Input placeholder="CVV" />
                        </div>
                        <Input placeholder="Name on Card" />

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
                          <Lock className="h-4 w-4" />
                          Your payment is secured with SSL encryption
                        </div>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </Button>
                        <Button
                          size="lg"
                          className="flex-1"
                          onClick={() => setStep(3)}
                        >
                          Review Order
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Card className="p-6">
                      <h2 className="text-xl font-bold mb-6">Review Your Order</h2>

                      <div className="space-y-4 mb-6">
                        <div className="p-4 rounded-xl bg-muted/50">
                          <p className="text-sm font-medium mb-2">
                            Shipping Address
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {formData.firstName} {formData.lastName}
                            <br />
                            {formData.address}
                            <br />
                            {formData.city}, {formData.state} {formData.zip}
                          </p>
                        </div>

                        <div className="p-4 rounded-xl bg-muted/50">
                          <p className="text-sm font-medium mb-2">
                            Payment Method
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Credit Card ending in ****
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => setStep(2)}
                        >
                          Back
                        </Button>
                        <Button size="lg" className="flex-1" asChild>
                          <Link href="/checkout/confirm">
                            Place Order
                          </Link>
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>

              <div className="lg:col-span-2">
                <Card className="p-6 sticky top-24">
                  <h3 className="text-lg font-bold mb-4">Order Summary</h3>
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm line-clamp-1">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {item.color.name} / {item.size.name} x {item.quantity}
                          </p>
                          <p className="text-sm font-medium mt-1">
                            {formatPrice(item.product.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 border-t pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                      <span>Total</span>
                      <span>{formatPrice(grandTotal)}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
