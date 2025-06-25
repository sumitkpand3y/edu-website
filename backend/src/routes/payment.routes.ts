import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create-payment-intent', authenticate, PaymentController.createPaymentIntent);
router.post('/confirm-payment', authenticate, PaymentController.confirmPayment);
router.get('/orders', authenticate, PaymentController.getMyOrders);

export default router;