import { Router } from 'express';
import { CartItemController } from '../controllers/cartItem.controller';

const router = Router();

router.get('/:userId', CartItemController.getCartItems);
router.post('/add', CartItemController.addToCart);
router.put('/update', CartItemController.updateQuantity);
router.delete('/remove', CartItemController.removeFromCart);

export default router;
