import { Router } from 'express';
import { BlogController } from '../controllers/blog.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Public routes
router.get('/', BlogController.getAllPosts);
router.get('/:slug', BlogController.getPostBySlug);

// Protected routes
router.post('/', authenticate, BlogController.createPost);
router.put('/:id', authenticate, BlogController.updatePost);
router.delete('/:id', authenticate, authorize('ADMIN'), BlogController.deletePost);
export default router;