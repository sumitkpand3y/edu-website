// src/app/admin/components/AdminAuthGuard.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  email: string
  role: string
}

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorized, setIsAuthorized] = useState(false)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      // Check if user is authenticated and has admin role
      const response = await fetch('/api/auth/verify', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const user: User = await response.json()
        
        if (user.role === 'admin') {
          setIsAuthorized(true)
        } else {
          // User is authenticated but not admin
          router.push('/unauthorized')
        }
      } else {
        // User is not authenticated
        router.push('/login?redirectTo=/admin')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      router.push('/login?redirectTo=/admin')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-lg">Verifying access...</span>
      </div>
    )
  }

  if (!isAuthorized) {
    return null // Router will handle redirect
  }

  return <>{children}</>
}
