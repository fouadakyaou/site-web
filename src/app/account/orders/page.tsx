'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, ChevronRight } from 'lucide-react'
import { Card, Badge, Button } from '@/components/ui'
import { formatPrice, formatDate } from '@/lib/utils'

const orders = [
  {
    id: 'LUX-12345678',
    date: '2024-01-20',
    status: 'delivered',
    items: [
      { name: 'Premium Leather Jacket', quantity: 1, price: 899, image: 'https://images.pexels.com/photos/10409204/pexels-photo-10409204.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    total: 899,
  },
  {
    id: 'LUX-23456789',
    date: '2024-01-18',
    status: 'shipped',
    items: [
      { name: 'Cashmere Sweater', quantity: 2, price: 449, image: 'https://images.pexels.com/photos/7691175/pexels-photo-7691175.jpeg?auto=compress&cs=tinysrgb&w=100' },
      { name: 'Merino Wool Turtleneck', quantity: 1, price: 189, image: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    total: 1087,
  },
  {
    id: 'LUX-34567890',
    date: '2024-01-15',
    status: 'processing',
    items: [
      { name: 'Designer Handbag', quantity: 1, price: 1499, image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=100' },
    ],
    total: 1499,
  },
]

const statusColors: Record<string, 'warning' | 'secondary' | 'default' | 'success' | 'destructive'> = {
  pending: 'warning',
  processing: 'secondary',
  shipped: 'default',
  delivered: 'success',
  cancelled: 'destructive',
}

const statusIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  pending: Clock,
  processing: Clock,
  shipped: Truck,
  delivered: CheckCircle,
  cancelled: Package,
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Orders</h1>
        <span className="text-muted-foreground">{orders.length} orders</span>
      </div>

      {orders.length === 0 ? (
        <Card className="p-12 text-center">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold mb-2">No orders yet</h2>
          <p className="text-muted-foreground mb-6">
            When you place orders, they will appear here.
          </p>
          <Button asChild>
            <Link href="/shop">Start Shopping</Link>
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => {
            const StatusIcon = statusIcons[order.status]
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="font-mono text-sm text-muted-foreground">
                        {order.id}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(order.date)}
                      </p>
                    </div>
                    <Badge variant={statusColors[order.status]}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  <div className="flex gap-4 mb-4">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="relative h-16 w-16 rounded-lg overflow-hidden bg-muted flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover"
                        />
                        {item.quantity > 1 && (
                          <span className="absolute bottom-1 right-1 bg-background/90 text-xs px-1.5 rounded">
                            x{item.quantity}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </p>
                      <p className="font-semibold">{formatPrice(order.total)}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/account/orders/${order.id}`}>
                        View Details
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
