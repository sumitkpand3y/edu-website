import { Request, Response } from 'express';
import prisma from '../models/prisma';

export class PaymentController {
  static createPaymentIntent = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const { courseIds } = req.body;
      
      // Get courses and calculate total
      const courses = await prisma.course.findMany({
        where: {
          id: {
            in: courseIds
          }
        }
      });
      
      const totalAmount = courses.reduce((sum, course) => sum + course.price, 0);
      
      // Create order
      const order = await prisma.order.create({
        data: {
          userId,
          totalAmount,
          items: {
            create: courses.map(course => ({
              courseId: course.id,
              price: course.price
            }))
          }
        },
        include: {
          items: {
            include: {
              course: true
            }
          }
        }
      });
      
      // In a real app, you'd create a Stripe payment intent here
      const paymentIntent = {
        id: `pi_${Date.now()}`,
        client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
        amount: totalAmount * 100, // Convert to cents
      };
      
      res.json({ paymentIntent, order });
    } catch (error) {
      console.error('Create payment intent error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  static confirmPayment = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const { orderId, paymentId } = req.body;
      
      // Update order status
      const order = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'COMPLETED',
          paymentId
        },
        include: {
          items: true
        }
      });
      
      // Create enrollments for all courses in the order
      const enrollmentData = order.items.map(item => ({
        userId,
        courseId: item.courseId
      }));
      
      await prisma.enrollment.createMany({
        data: enrollmentData,
        skipDuplicates: true
      });
      
      res.json({ message: 'Payment confirmed and enrollments created', order });
    } catch (error) {
      console.error('Confirm payment error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  static getMyOrders = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      
      const orders = await prisma.order.findMany({
        where: { userId },
        include: {
          items: {
            include: {
              course: {
                select: {
                  title: true,
                  thumbnail: true
                }
              }
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      });
      
      res.json({ orders });
    } catch (error) {
      console.error('Get orders error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}