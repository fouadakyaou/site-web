'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Eye,
} from 'lucide-react'
import { Card, Badge } from '@/components/ui'
import { formatPrice, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const stats = [
  {
    title: 'Total Revenue',
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
    title: 'Customers',
    value: 4523,
    change: 15.3,
    changeType: 'up',
    icon: Users,
    format: 'number',
  },
  {
    title: 'Conversion Rate',
    value: 3.24,
    change: -2.1,
    changeType: 'down',
    icon: TrendingUp,
    format: 'percent',
  },
]

const recentOrders = [
  {
    id: 'LUX-12345678',
    customer: 'John Smith',
    email: 'john@example.com',
    total: 1299,
    status: 'delivered',
    date: '2024-01-20',
  },
  {
    id: 'LUX-23456789',
    customer: 'Sarah Johnson',
    email: 'sarah@example.com',
    total: 899,
    status: 'shipped',
    date: '2024-01-19',
  },
  {
    id: 'LUX-34567890',
    customer: 'Mike Davis',
    email: 'mike@example.com',
    total: 2199,
    status: 'processing',
    date: '2024-01-18',
  },
  {
    id: 'LUX-45678901',
    customer: 'Emma Wilson',
    email: 'emma@example.com',
    total: 459,
    status: 'pending',
    date: '2024-01-18',
  },
]

const topProducts = [
  { name: 'Premium Leather Jacket', sales: 234, revenue: 210066 },
  { name: 'Elegant Cashmere Coat', sales: 189, revenue: 245511 },
  { name: 'Premium Sneakers', sales: 178, revenue: 70922 },
  { name: 'Designer Handbag', sales: 156, revenue: 233844 },
  { name: 'Italian Wool Blazer', sales: 134, revenue: 93666 },
]

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-500/10 text-yellow-600',
  processing: 'bg-blue-500/10 text-blue-600',
  shipped: 'bg-purple-500/10 text-purple-600',
  delivered: 'bg-emerald-500/10 text-emerald-600',
  cancelled: 'bg-red-500/10 text-red-600',
}

function formatValue(value: number, format: string) {
  switch (format) {
    case 'currency':
      return formatPrice(value)
    case 'percent':
      return `${value}%`
    default:
      return value.toLocaleString()
  }
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your store overview.</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="secondary">Last 30 days</Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    stat.changeType === 'up' ? 'text-emerald-600' : 'text-red-600'
                  )}
                >
                  {stat.changeType === 'up' ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {stat.change}%
                </div>
              </div>
              <p className="text-2xl font-bold">{formatValue(stat.value, stat.format)}</p>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.customer}</p>
                    <p className="text-sm text-muted-foreground">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatPrice(order.total)}</p>
                  <Badge className={cn('mt-1', statusColors[order.status])}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Top Products</h2>
            <Link href="/admin/products" className="text-sm text-primary hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center justify-between p-4 rounded-xl bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">{product.sales} sales</p>
                  </div>
                </div>
                <p className="font-medium">{formatPrice(product.revenue)}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-6">Sales Overview</h2>
        <div className="h-64 flex items-end justify-between gap-4">
          {[40, 55, 45, 60, 35, 75, 50, 65, 45, 70, 55, 80].map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-primary rounded-t hover:bg-primary/80 transition-colors cursor-pointer"
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-muted-foreground">
                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
