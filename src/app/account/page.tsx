'use client'

import * as React from 'react'
import { Card } from '@/components/ui'
import { Input, Button } from '@/components/ui'

export default function ProfilePage() {
  const [formData, setFormData] = React.useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    birthday: '1990-01-15',
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <Button>Save Changes</Button>
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">First Name</label>
            <Input
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Last Name</label>
            <Input
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone</label>
            <Input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Birthday</label>
            <Input
              type="date"
              value={formData.birthday}
              onChange={(e) =>
                setFormData({ ...formData, birthday: e.target.value })
              }
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              Current Password
            </label>
            <Input type="password" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              New Password
            </label>
            <Input type="password" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">
              Confirm New Password
            </label>
            <Input type="password" />
          </div>
        </div>
        <Button variant="outline" className="mt-4">
          Update Password
        </Button>
      </Card>
    </div>
  )
}
