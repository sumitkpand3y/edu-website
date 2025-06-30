// hooks/useCart.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getCartItems,
  addToCart,
  updateCartQuantity,
  removeFromCart,
} from '@/utils/cartApi'

// ✅ Fetch cart items
export const useCartItems = (userId: string) => {
  return useQuery({
    queryKey: ['cart', userId],
    queryFn: () => getCartItems(userId),
    enabled: !!userId,
  })
}

// ✅ Add item to cart
export const useAddToCart = (userId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (courseId: string) => addToCart({ userId, courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}

// ✅ Update item quantity
export const useUpdateCartQuantity = (userId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ courseId, quantity }: { courseId: string, quantity: number }) =>
      updateCartQuantity({ userId, courseId, quantity }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}

// ✅ Remove item from cart
export const useRemoveFromCart = (userId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (courseId: string) => removeFromCart({ userId, courseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', userId] })
    },
  })
}
