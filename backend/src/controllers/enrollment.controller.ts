import { Request, Response } from 'express';
import prisma from '../models/prisma';
import { generateCertificate } from '../utils/pdfGenerator';

export class EnrollmentController {
  static enrollInCourse = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const { courseId } = req.body;
      
      // Check if already enrolled
      const existingEnrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      });
      
      if (existingEnrollment) {
        return res.status(400).json({ message: 'Already enrolled in this course' });
      }
      
      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId }
      });
      
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      
      // Create enrollment
      const enrollment = await prisma.enrollment.create({
        data: {
          userId,
          courseId,
        },
        include: {
          course: {
            select: {
              title: true,
              slug: true,
              thumbnail: true,
            }
          }
        }
      });
      
      res.status(201).json({ message: 'Enrolled successfully', enrollment });
    } catch (error) {
      console.error('Enrollment error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  static getMyEnrollments = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      
      const enrollments = await prisma.enrollment.findMany({
        where: { userId },
        include: {
          course: {
            select: {
              id: true,
              title: true,
              slug: true,
              thumbnail: true,
              duration: true,
              level: true,
            }
          }
        },
        orderBy: { enrolledAt: 'desc' }
      });
      
      res.json({ enrollments });
    } catch (error) {
      console.error('Get enrollments error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  static getCourseProgress = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const { courseId } = req.params;
      
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      });
      
      if (!enrollment) {
        return res.status(404).json({ message: 'Enrollment not found' });
      }
      
      // Get course with lessons and progress
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          modules: {
            orderBy: { order: 'asc' },
            include: {
              lessons: {
                orderBy: { order: 'asc' },
                include: {
                  progress: {
                    where: { userId }
                  }
                }
              }
            }
          }
        }
      });
      
      res.json({ enrollment, course });
    } catch (error) {
      console.error('Get progress error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  static markLessonComplete = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const { courseId, lessonId } = req.params;
      
      // Check enrollment
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      });
      
      if (!enrollment) {
        return res.status(404).json({ message: 'Not enrolled in this course' });
      }
      
      // Mark lesson as complete
      await prisma.lessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId,
            lessonId
          }
        },
        update: {
          isCompleted: true,
          completedAt: new Date()
        },
        create: {
          userId,
          lessonId,
          isCompleted: true,
          completedAt: new Date()
        }
      });
      
      // Calculate and update course progress
      const totalLessons = await prisma.lesson.count({
        where: {
          module: {
            courseId
          }
        }
      });
      
      const completedLessons = await prisma.lessonProgress.count({
        where: {
          userId,
          isCompleted: true,
          lesson: {
            module: {
              courseId
            }
          }
        }
      });
      
      const progress = (completedLessons / totalLessons) * 100;
      
      await prisma.enrollment.update({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        },
        data: {
          progress,
          ...(progress === 100 && { completedAt: new Date(), status: 'COMPLETED' })
        }
      });
      
      res.json({ message: 'Lesson marked as complete', progress });
    } catch (error) {
      console.error('Mark lesson complete error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  static getCertificate = async (req: Request, res: Response) => {
    try {
      const userId = (req as any).user.userId;
      const { courseId } = req.params;
      
      // Check if course is completed
      const enrollment = await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        },
        include: {
          course: true,
          user: true
        }
      });
      
      if (!enrollment || enrollment.status !== 'COMPLETED') {
        return res.status(400).json({ message: 'Course not completed yet' });
      }
      
      // Check if certificate already exists
      let certificate = await prisma.certificate.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId
          }
        }
      });
      
      if (!certificate) {
        // Generate certificate
        const certificateData = {
          studentName: `${enrollment.user.firstName} ${enrollment.user.lastName}`,
          courseName: enrollment.course.title,
          completionDate: enrollment.completedAt?.toLocaleDateString() || new Date().toLocaleDateString(),
          certificateId: `CERT-${Date.now()}-${userId.slice(-6).toUpperCase()}`
        };
        
        const pdfBuffer = await generateCertificate(certificateData);
        
        // In a real app, you'd save this to cloud storage
        // For now, we'll just create the certificate record
        certificate = await prisma.certificate.create({
          data: {
            userId,
            courseId,
            certificateUrl: `https://certificates.healthacademy.com/${certificateData.certificateId}.pdf`
          }
        });
      }
      
      res.json({ certificate });
    } catch (error) {
      console.error('Get certificate error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
}