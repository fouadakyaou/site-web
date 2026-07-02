'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, Check } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { Button, Input, Card } from '@/components/ui'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [agreedToTerms, setAgreedToTerms] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle registration
  }

  const passwordStrength = React.useMemo(() => {
    const password = formData.password
    if (!password) return 0
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }, [formData.password])

  return (
    <>
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8">
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <span className="text-3xl font-bold">LUXE</span>
              </Link>
              <h1 className="text-2xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">
                Join us for exclusive benefits
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className={`h-1 flex-1 rounded ${
                            i <= passwordStrength
                              ? passwordStrength <= 1
                                ? 'bg-red-500'
                                : passwordStrength <= 2
                                ? 'bg-orange-500'
                                : passwordStrength <= 3
                                ? 'bg-yellow-500'
                                : 'bg-emerald-500'
                              : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {passwordStrength <= 1
                        ? 'Weak'
                        : passwordStrength <= 2
                        ? 'Fair'
                        : passwordStrength <= 3
                        ? 'Good'
                        : 'Strong'}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-sm font-medium mb-1.5 block">
                  Confirm Password
                </label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
                  error={
                    formData.confirmPassword &&
                    formData.password !== formData.confirmPassword
                      ? 'Passwords do not match'
                      : undefined
                  }
                />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="h-4 w-4 rounded mt-1"
                />
                <span className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{ ' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={!agreedToTerms}
              >
                Create Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-6 p-4 rounded-xl bg-muted/50">
              <p className="text-sm font-medium mb-2">Create an account to:</p>
              <ul className="space-y-1">
                {[
                  'Track your orders',
                  'Save items to wishlist',
                  'Get exclusive offers',
                  'Faster checkout',
                ].map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-emerald-500" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
