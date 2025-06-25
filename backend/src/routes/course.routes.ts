import { Router } from 'express';
import { CourseController } from '../controllers/course.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', CourseController.getAllCourses);
router.get('/:slug', CourseController.getCourseBySlug);

// Protected routes
router.post('/', authenticate, CourseController.createCourse);
router.put('/:id', authenticate, CourseController.updateCourse);
router.delete('/:id', authenticate, authorize('ADMIN'), CourseController.deleteCourse);

// Course content routes
router.get('/:id/modules', authenticate, CourseController.getCourseModules);
router.post('/:id/modules', authenticate, authorize('ADMIN', 'INSTRUCTOR'), CourseController.createModule);

export default router;