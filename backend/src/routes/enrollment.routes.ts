import { Router } from 'express';
import { EnrollmentController } from '../controllers/enrollment.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, EnrollmentController.enrollInCourse);
router.get('/my-courses', authenticate, EnrollmentController.getMyEnrollments);
router.get('/:courseId/progress', authenticate, EnrollmentController.getCourseProgress);
router.post('/:courseId/lessons/:lessonId/complete', authenticate, EnrollmentController.markLessonComplete);
router.get('/:courseId/certificate', authenticate, EnrollmentController.getCertificate);

export default router;