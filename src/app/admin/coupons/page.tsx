'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Plus, Tag, Calendar, Percent, DollarSign, Copy, Trash2, CreditCard as Edit } from 'lucide-react'
import { Card, Button, Badge, Input } from '@/components/ui'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const coupons = [
  {
    id: '1',
    code: 'LUXURY20',
    type: 'percentage',
    value: 20,
    minOrder: 100,
    maxDiscount: 500,
    uses: 145,
    maxUses: 500,
    status: 'active',
    expiresAt: '2024-02-28',
  },
  {
    id: '2',
    code: 'WELCOME50',
    type: 'fixed',
    value: 50,
    minOrder: 200,
    maxDiscount: null,
    uses: 89,
    maxUses: null,
    status: 'active',
    expiresAt: '2024-03-31',
  },
  {
    id: '3',
    code: 'FLASH30',
    type: 'percentage',
    value: 30,
    minOrder: 0,
    maxDiscount: 300,
    uses: 234,
    maxUses: 500,
    status: 'expired',
    expiresAt: '2024-01-15',
  },
  {
    id: '4',
    code: 'VIP100',
    type: 'fixed',
    value: 100,
    minOrder: 500,
    maxDiscount: null,
    uses: 12,
    maxUses: 100,
    status: 'active',
    expiresAt: '2024-12-31',
  },
]

export default function AdminCouponsPage() {
  const [copied, setCopied] = React.useState<string | null>(null)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  const activeCoupons = coupons.filter((c) => c.status === 'active').length
  const totalUses = coupons.reduce((sum, c) => sum + c.uses, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Coupons</h1>
          <p className="text-muted-foreground">{coupons.length} coupons</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Coupon
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <Tag className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Coupons</p>
              <p className="text-2xl font-bold">{activeCoupons}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <Percent className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Uses</p>
              <p className="text-2xl font-bold">{totalUses}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Discount</p>
              <p className="text-2xl font-bold">
                {coupons.filter((c) => c.type === 'percentage').length > 0
                  ? Math.round(
                      coupons
                        .filter((c) => c.type === 'percentage')
                        .reduce((sum, c) => sum + c.value, 0) /
                        coupons.filter((c) => c.type === 'percentage').length
                    ) + '%'
                  : 'N/A'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        {coupons.map((coupon, index) => (
          <motion.div
            key={coupon.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'h-12 w-12 rounded-xl flex items-center justify-center',
                      coupon.type === 'percentage'
                        ? 'bg-blue-500/10'
                        : 'bg-emerald-500/10'
                    )}
                  >
                    {coupon.type === 'percentage' ? (
                      <Percent className="h-6 w-6 text-blue-500" />
                    ) : (
                      <DollarSign className="h-6 w-6 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <code className="text-lg font-mono font-bold bg-muted px-3 py-1 rounded-lg">
                        {coupon.code}
                      </code>
                      <button
                        onClick={() => handleCopy(coupon.code)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                        {copied === coupon.code && (
                          <span className="ml-1 text-xs text-emerald-500">Copied!</span>
                        )}
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {coupon.type === 'percentage'
                        ? `${coupon.value}% off`
                        : `$${coupon.value} off`}
                      {coupon.minOrder > 0 && ` (min $${coupon.minOrder})`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Uses</p>
                    <p className="font-medium">
                      {coupon.uses}
                      {coupon.maxUses && ` / ${coupon.maxUses}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Expires</p>
                    <p className="font-medium">{formatDate(coupon.expiresAt)}</p>
                  </div>
                  <Badge variant={coupon.status === 'active' ? 'success' : 'secondary'}>
                    {coupon.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
