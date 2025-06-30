// controllers/CartItemController.ts
import { Request, Response } from "express";
import prisma from "../models/prisma";

export class CartItemController {
  // 🔹 Get all cart items for a user
  static async getCartItems(req: Request, res: Response) {
    const { userId } = req.params;

    try {
      const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: { course: true }, // fetch course info
      });

      const formatted = cartItems.map((item) => ({
        ...item.course, // spread course details
        quantity: item.quantity,
        cartItemId: item.id, // optional: include cartItem.id for updates/removal
      }));

      return res.json(formatted);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch cart items." });
    }
  }

  // 🔹 Add item to cart
  static async addToCart(req: Request, res: Response) {
    const { userId, courseId } = req.body;

    try {
      const cartItem = await prisma.cartItem.upsert({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
        update: {
          quantity: {
            increment: 1,
          },
        },
        create: {
          userId,
          courseId,
          quantity: 1,
        },
      });

      return res.json(cartItem);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to add item to cart." });
    }
  }

  // 🔹 Update item quantity
  static async updateQuantity(req: Request, res: Response) {
    const { userId, courseId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    try {
      const updatedItem = await prisma.cartItem.update({
        where: {
          userId_courseId: { userId, courseId },
        },
        data: { quantity },
      });

      return res.json(updatedItem);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to update quantity." });
    }
  }

  // 🔹 Remove item from cart
  static async removeFromCart(req: Request, res: Response) {
    const { userId, courseId } = req.body;

    try {
      await prisma.cartItem.delete({
        where: {
          userId_courseId: { userId, courseId },
        },
      });

      return res.json({ message: "Item removed from cart." });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Failed to remove item from cart." });
    }
  }
}
