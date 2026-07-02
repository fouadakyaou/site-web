'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, ListFilter as Filter, Download, Package, Eye, Truck, CircleCheck as CheckCircle, Clock, Circle as XCircle } from 'lucide-react'
import { Card, Button, Badge, Input } from '@/components/ui'
import { formatPrice, formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const orders = [
  {
    id: 'LUX-12345678',
    customer: { name: 'John Smith', email: 'john@example.com' },
    items: 3,
    total: 1299,
    status: 'delivered',
    payment: 'paid',
    date: '2024-01-20',
  },
  {
    id: 'LUX-23456789',
    customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
    items: 2,
    total: 899,
    status: 'shipped',
    payment: 'paid',
    date: '2024-01-19',
  },
  {
    id: 'LUX-34567890',
    customer: { name: 'Mike Davis', email: 'mike@example.com' },
    items: 1,
    total: 2199,
    status: 'processing',
    payment: 'paid',
    date: '2024-01-18',
  },
  {
    id: 'LUX-45678901',
    customer: { name: 'Emma Wilson', email: 'emma@example.com' },
    items: 4,
    total: 459,
    status: 'pending',
    payment: 'pending',
    date: '2024-01-18',
  },
  {
    id: 'LUX-56789012',
    customer: { name: 'David Brown', email: 'david@example.com' },
    items: 2,
    total: 1598,
    status: 'cancelled',
    payment: 'refunded',
    date: '2024-01-17',
  },
  {
    id: 'LUX-67890123',
    customer: { name: 'Lisa Anderson', email: 'lisa@example.com' },
    items: 1,
    total: 349,
    status: 'delivered',
    payment: 'paid',
    date: '2024-01-16',
  },
]

const statusConfig: Record<string, { color: string; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { color: 'bg-yellow-500/10 text-yellow-600', icon: Clock },
  processing: { color: 'bg-blue-500/10 text-blue-600', icon: Package },
  shipped: { color: 'bg-purple-500/10 text-purple-600', icon: Truck },
  delivered: { color: 'bg-emerald-500/10 text-emerald-600', icon: CheckCircle },
  cancelled: { color: 'bg-red-500/10 text-red-600', icon: XCircle },
}

export default function AdminOrdersPage() {
  const [search, setSearch] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState('all')

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const stats = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    shipped: orders.filter((o) => o.status === 'shipped').length,
    delivered: orders.filter((o) => o.status === 'delivered').length,
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-muted-foreground">{orders.length} total orders</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {Object.entries(stats).map(([status, count]) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={cn(
              'px-4 py-2 rounded-xl whitespace-nowrap transition-colors',
              statusFilter === status
                ? 'bg-primary text-primary-foreground'
                : 'bg-card hover:bg-muted'
            )}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-2 text-sm opacity-70">({count})</span>
          </button>
        ))}
      </div>

      <Card className="p-4">
        <Input
          placeholder="Search orders by ID, customer, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </Card>

      <div className="space-y-4">
        {filteredOrders.map((order, index) => {
          const StatusIcon = statusConfig[order.status].icon
          return (
            <motion.div
              key={order.id}
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
                        statusConfig[order.status].color
                      )}
                    >
                      <StatusIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-mono font-medium">{order.id}</p>
                        <Badge className={statusConfig[order.status].color}>
                          {order.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {order.customer.name} • {formatDate(order.date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">
                        {order.items} item{order.items > 1 ? 's' : ''}
                      </p>
                      <p className="font-semibold">{formatPrice(order.total)}</p>
                    </div>
                    <Badge
                      variant={order.payment === 'paid' ? 'success' : 'secondary'}
                    >
                      {order.payment}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
    </div>
  )
}
