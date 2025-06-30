import { Request, Response } from "express";
import prisma from "../models/prisma";

export class BlogController {
  static getAllPosts = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        skip,
        take: Number(limit),
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          content: true,
          image: true,
          category: true,
          date: true,
          readTime: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          tags: {
            select: { name: true },
          },
          author: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      }),
      prisma.blogPost.count(), // Count total posts
    ]);

    // Flatten tags
    const formattedPosts = posts.map((post) => ({
      ...post,
      tags: post.tags.map((tag) => tag.name),
    }));

    res.json({
      posts: formattedPosts,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error("Get blog posts error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


  static getPostBySlug = async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      const post = await prisma.blogPost.findUnique({
        where: { slug },
        include: {
          tags: true,
          author: {
            select: {
              id: true,
              email: true,
            },
          },
        },
      });

      if (!post) return res.status(404).json({ message: "Post not found" });

      res.json({ post });
    } catch (error) {
      console.error("Get blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static createPost = async (req: Request, res: Response) => {
    try {
      const {
        title,
        slug,
        excerpt,
        content,
        category,
        image,
        date,
        readTime,
        status,
        tags,
      } = req.body;
      
      const authorId = req?.user?.userId;
      if (!authorId) {
        return res.status(401).json({ message: "User not authenticated" });
      }

      const post = await prisma.blogPost.create({
        data: {
          title,
          slug,
          excerpt,
          content,
          image,
          category,
          date: new Date(date),
          readTime,
          status,
          author: {
            connect: { id: authorId },
          },
          tags: {
            create: tags?.map((tag: string) => ({ name: tag })) || [],
          },
        },
      });

      res.status(201).json({ message: "Blog post created successfully", post });
    } catch (error) {
      console.error("Create blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static updatePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        title,
        slug,
        excerpt,
        content,
        category,
        image,
        date,
        readTime,
        status,
        tags,
      } = req.body;

      const post = await prisma.blogPost.update({
        where: { id: parseInt(id) },
        data: {
          title,
          slug,
          excerpt,
          content,
          category,
          image,
          date: new Date(date),
          readTime,
          status,
          tags: {
            deleteMany: {},
            create: tags?.map((tag: string) => ({ name: tag })) || [],
          },
        },
      });

      res.json({ message: "Blog post updated successfully", post });
    } catch (error) {
      console.error("Update blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static deletePost = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.blogPost.delete({
        where: { id: parseInt(id) },
      });

      res.json({ message: "Blog post deleted successfully" });
    } catch (error) {
      console.error("Delete blog post error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
