'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
} from 'lucide-react'
import { Card } from '@/components/ui'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

const metrics = [
  {
    title: 'Revenue',
    value: 125430,
    change: 12.5,
    changeType: 'up',
    icon: DollarSign,
    format: 'currency',
  },
  {
    title: 'Orders',
    value: 1284,
    change: 8.2,
    changeType: 'up',
    icon: ShoppingCart,
    format: 'number',
  },
  {
    title: 'Visitors',
    value: 45230,
    change: 15.3,
    changeType: 'up',
    icon: Eye,
    format: 'number',
  },
  {
    title: 'Conversion Rate',
    value: 2.84,
    change: -0.5,
    changeType: 'down',
    icon: Users,
    format: 'percent',
  },
]

const revenueData = [
  { month: 'Jan', revenue: 45000, orders: 145 },
  { month: 'Feb', revenue: 52000, orders: 178 },
  { month: 'Mar', revenue: 48000, orders: 156 },
  { month: 'Apr', revenue: 61000, orders: 203 },
  { month: 'May', revenue: 55000, orders: 189 },
  { month: 'Jun', revenue: 67000, orders: 234 },
  { month: 'Jul', revenue: 72000, orders: 256 },
  { month: 'Aug', revenue: 69000, orders: 245 },
  { month: 'Sep', revenue: 78000, orders: 278 },
  { month: 'Oct', revenue: 82000, orders: 290 },
  { month: 'Nov', revenue: 91000, orders: 312 },
  { month: 'Dec', revenue: 105000, orders: 378 },
]

const topCategories = [
  { name: 'Women', sales: 456, revenue: 89400, percentage: 38 },
  { name: 'Men', sales: 312, revenue: 61200, percentage: 26 },
  { name: 'Accessories', sales: 198, revenue: 38900, percentage: 18 },
  { name: 'Shoes', sales: 145, revenue: 31500, percentage: 12 },
  { name: 'Sale', sales: 89, revenue: 12400, percentage: 6 },
]

export default function AdminAnalyticsPage() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Monitor your store performance</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <metric.icon className="h-6 w-6 text-primary" />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    metric.changeType === 'up' ? 'text-emerald-600' : 'text-red-600'
                  )}
                >
                  {metric.changeType === 'up' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  {metric.change}%
                </div>
              </div>
              <p className="text-2xl font-bold">
                {metric.format === 'currency'
                  ? formatPrice(metric.value)
                  : metric.format === 'percent'
                  ? `${metric.value}%`
                  : metric.value.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">{metric.title}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Revenue Overview</h2>
          <div className="h-64 flex items-end justify-between gap-2">
            {revenueData.map((data, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full bg-gradient-to-t from-primary to-primary/50 rounded-t hover:from-primary/90 transition-all cursor-pointer"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  title={`${formatPrice(data.revenue)} (${data.orders} orders)`}
                />
                <span className="text-xs text-muted-foreground">{data.month}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-6">Sales by Category</h2>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">
                    {formatPrice(category.revenue)}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  />
                </div>
                <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                  <span>{category.sales} sales</span>
                  <span>{category.percentage}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Traffic Sources</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { source: 'Direct', visits: 15340, percentage: 34 },
            { source: 'Organic Search', visits: 12350, percentage: 27 },
            { source: 'Social Media', visits: 9870, percentage: 22 },
            { source: 'Referral', visits: 7670, percentage: 17 },
          ].map((item, index) => (
            <motion.div
              key={item.source}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-muted/50"
            >
              <p className="text-sm text-muted-foreground">{item.source}</p>
              <p className="text-2xl font-bold mt-1">{item.visits.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{item.percentage}%</p>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}
