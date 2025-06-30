// src/hooks/useCartActions.ts
import { useAddToCart } from './useCart'
// import { Course } from '@/types'

export const useCartActions = (userId: string) => {
  const { mutate: addToCartMutation } = useAddToCart(userId)

  const addToCart = (course: { id: string }) => {
    addToCartMutation(course.id)
  }

  return { addToCart }
}
