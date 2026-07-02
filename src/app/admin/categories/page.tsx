'use client'

import * as React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Plus, CreditCard as Edit, Trash2, FolderTree } from 'lucide-react'
import { Card, Button, Badge } from '@/components/ui'
import { categories } from '@/lib/data'

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-muted-foreground">{categories.length} categories</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="relative h-40">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{category.name}</h3>
                  <Badge variant="secondary">12 products</Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {category.description}
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categories.length * 0.1 }}
        >
          <Card className="h-full flex items-center justify-center p-8 border-dashed hover:border-primary transition-colors cursor-pointer">
            <div className="text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <FolderTree className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="font-medium">Add New Category</p>
              <p className="text-sm text-muted-foreground">Create a new product category</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
