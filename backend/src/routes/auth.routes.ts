import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', AuthController.validateRegister, AuthController.register);
router.post('/login', AuthController.validateLogin, AuthController.login);
router.get('/profile', authenticate, AuthController.getProfile);

// ✅ 🆕 Add verify route (protected route that just returns user info)
router.get('/verify', authenticate, AuthController.verifyToken);

export default router;