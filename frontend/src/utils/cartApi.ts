// utils/cartApi.ts
import { apiFetch } from '@/utils/apiFetch'

// ✅ Get all cart items for a user
export const getCartItems = async (userId: string) => {
  const res = await apiFetch(`/cart/${userId}`)
  if (!res) throw new Error('Failed to fetch cart items')
  return res
}

// ✅ Add item to cart
export const addToCart = async ({ userId, courseId }: { userId: string, courseId: string }) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')

  const res = await apiFetch('/cart/add', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, courseId }),
  })

  if (!res || res.error) throw new Error(res?.message || 'Failed to add to cart')
  return res
}

// ✅ Update quantity
export const updateCartQuantity = async ({ userId, courseId, quantity }: { userId: string, courseId: string, quantity: number }) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')

  const res = await apiFetch('/cart/update', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, courseId, quantity }),
  })

  if (!res || res.error) throw new Error(res?.message || 'Failed to update quantity')
  return res
}

// ✅ Remove from cart
export const removeFromCart = async ({ userId, courseId }: { userId: string, courseId: string }) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Not authenticated')

  const res = await apiFetch('/cart/remove', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, courseId }),
  })

  if (!res || res.error) throw new Error(res?.message || 'Failed to remove item')
  return res
}
