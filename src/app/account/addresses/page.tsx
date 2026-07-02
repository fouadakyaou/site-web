'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Plus, MapPin, Edit, Trash2 } from 'lucide-react'
import { Card, Button, Input } from '@/components/ui'

const addresses = [
  {
    id: '1',
    name: 'John Doe',
    street: '123 Fashion Avenue',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    is_default: true,
  },
  {
    id: '2',
    name: 'John Doe',
    street: '456 Sunset Blvd',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90028',
    country: 'United States',
    is_default: false,
  },
]

export default function AddressesPage() {
  const [showForm, setShowForm] = React.useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Addresses</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Address
        </Button>
      </div>

      {showForm && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-4">New Address</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Input placeholder="Full Name" />
              <Input placeholder="Street Address" />
              <Input placeholder="City" />
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="State" />
                <Input placeholder="ZIP Code" />
              </div>
              <Input placeholder="Country" />
            </div>
            <div className="flex gap-3 mt-4">
              <Button>Save Address</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {addresses.map((address, index) => (
          <motion.div
            key={address.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-medium">{address.name}</p>
                  {address.is_default && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{address.street}</p>
                <p>
                  {address.city}, {address.state} {address.zip}
                </p>
                <p>{address.country}</p>
              </div>
              <div className="mt-4 pt-4 border-t">
                <MapPin className="h-5 w-5 text-muted-foreground" />
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
