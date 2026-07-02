'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TriangleAlert as AlertTriangle, Package, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, Badge, Button } from '@/components/ui'
import { products } from '@/lib/data'
import { cn } from '@/lib/utils'

export default function AdminInventoryPage() {
  const lowStockThreshold = 10
  const criticalStockThreshold = 5

  const inventoryItems = products.map((product) => ({
    ...product,
    stockStatus:
      product.stock <= criticalStockThreshold
        ? 'critical'
        : product.stock <= lowStockThreshold
        ? 'low'
        : 'healthy',
  }))

  const lowStockItems = inventoryItems.filter((item) => item.stockStatus === 'low')
  const criticalItems = inventoryItems.filter((item) => item.stockStatus === 'critical')

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0)
  const totalSKUs = products.length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-muted-foreground">Manage your product stock levels</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Items</p>
              <p className="text-2xl font-bold">{totalStock}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total SKUs</p>
              <p className="text-2xl font-bold">{totalSKUs}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-yellow-500/10 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Low Stock</p>
              <p className="text-2xl font-bold">{lowStockItems.length}</p>
            </div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-red-500/10 flex items-center justify-center">
              <TrendingDown className="h-6 w-6 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Critical</p>
              <p className="text-2xl font-bold">{criticalItems.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {(criticalItems.length > 0 || lowStockItems.length > 0) && (
        <Card className="p-6 border-red-500/20 bg-red-500/5">
          <h2 className="font-semibold mb-4">Stock Alerts</h2>
          <div className="space-y-2">
            {criticalItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-background">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-red-600">Critical: {item.stock} units left</p>
                </div>
                <Button size="sm" variant="destructive">
                  Restock
                </Button>
              </div>
            ))}
            {lowStockItems.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center gap-4 p-3 rounded-lg bg-background">
                <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-yellow-600">Low stock: {item.stock} units</p>
                </div>
                <Button size="sm" variant="outline">
                  Restock
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left py-4 px-6 font-medium">Product</th>
                <th className="text-left py-4 px-6 font-medium">SKU</th>
                <th className="text-left py-4 px-6 font-medium">Category</th>
                <th className="text-left py-4 px-6 font-medium">Stock</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="border-t hover:bg-muted/30 transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="relative h-10 w-10 rounded-lg overflow-hidden bg-muted">
                        <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <code className="text-sm text-muted-foreground">{item.id}</code>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant="secondary">{item.category.name}</Badge>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={cn(
                        'font-medium',
                        item.stockStatus === 'critical'
                          ? 'text-red-600'
                          : item.stockStatus === 'low'
                          ? 'text-yellow-600'
                          : 'text-emerald-600'
                      )}
                    >
                      {item.stock}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Badge
                      variant={
                        item.stockStatus === 'critical'
                          ? 'destructive'
                          : item.stockStatus === 'low'
                          ? 'warning'
                          : 'success'
                      }
                    >
                      {item.stockStatus}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <Button size="sm" variant="outline">
                      Adjust Stock
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
