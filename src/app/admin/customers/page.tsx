'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Search, Mail, MoveHorizontal as MoreHorizontal, Eye, ShoppingBag, DollarSign } from 'lucide-react'
import { Card, Button, Badge, Input } from '@/components/ui'
import { formatPrice } from '@/lib/utils'
import { cn } from '@/lib/utils'

const customers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    orders: 12,
    spent: 4599,
    lastOrder: '2024-01-20',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
    orders: 8,
    spent: 2340,
    lastOrder: '2024-01-19',
    status: 'active',
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike@example.com',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
    orders: 5,
    spent: 1850,
    lastOrder: '2024-01-18',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    avatar: 'https://images.pexels.com/photos/1494794/pexels-photo-1494794.jpeg?auto=compress&cs=tinysrgb&w=100',
    orders: 3,
    spent: 897,
    lastOrder: '2024-01-18',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
    orders: 1,
    spent: 399,
    lastOrder: '2024-01-10',
    status: 'inactive',
  },
]

export default function AdminCustomersPage() {
  const [search, setSearch] = React.useState('')

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  )

  const totalCustomers = customers.length
  const activeCustomers = customers.filter((c) => c.status === 'active').length
  const totalRevenue = customers.reduce((sum, c) => sum + c.spent, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">{totalCustomers} total customers</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-2xl font-bold">{formatPrice(totalRevenue)}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Customers</p>
              <p className="text-2xl font-bold">{activeCustomers}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Avg. Order Value</p>
              <p className="text-2xl font-bold">
                {formatPrice(totalRevenue / customers.reduce((sum, c) => sum + c.orders, 0))}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <Input
          placeholder="Search customers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={<Search className="h-4 w-4" />}
        />
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCustomers.map((customer, index) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="h-12 w-12 rounded-full bg-muted bg-cover bg-center"
                    style={{ backgroundImage: `url(${customer.avatar})` }}
                  />
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <Badge
                  variant={customer.status === 'active' ? 'success' : 'secondary'}
                >
                  {customer.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-muted-foreground">Orders</p>
                  <p className="font-semibold">{customer.orders}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="font-semibold">{formatPrice(customer.spent)}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
