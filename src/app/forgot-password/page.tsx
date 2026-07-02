'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'
import { Navbar, Footer } from '@/components/layout'
import { Button, Input, Card } from '@/components/ui'

export default function ForgotPasswordPage() {
  const [email, setEmail] = React.useState('')
  const [submitted, setSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
    }
  }

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
              {submitted ? (
                <>
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-emerald-500" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                  <p className="text-muted-foreground">
                    We've sent a password reset link to{' '}
                    <span className="font-medium text-foreground">{email}</span>
                  </p>
                </>
              ) : (
                <>
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2">Forgot Your Password?</h1>
                  <p className="text-muted-foreground">
                    Enter your email and we'll send you a link to reset your password.
                  </p>
                </>
              )}
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  Send Reset Link
                </Button>
              </form>
            ) : (
              <div className="space-y-4">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/login">Back to Sign In</Link>
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Didn't receive the email?{' '}
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-primary font-medium hover:underline"
                  >
                    Try again
                  </button>
                </p>
              </div>
            )}

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </>
  )
}
