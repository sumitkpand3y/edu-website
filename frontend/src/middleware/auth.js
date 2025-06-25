import { verifyToken } from '@/lib/auth'

export function withAuth(handler) {
  return async (req, res) => {
    try {
      const token = req.headers.authorization?.replace('Bearer ', '')
      
      if (!token) {
        return res.status(401).json({ message: 'No token provided' })
      }

      const decoded = verifyToken(token)
      req.user = decoded
      
      return handler(req, res)
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' })
    }
  }
}