import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import prisma from "../models/prisma";

export class CourseController {
  static getAllCourses = async (req: Request, res: Response) => {
    try {
      const { category, level, search, page = 1, limit = 10 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);

      const whereClause: any = {
        isPublished: true,
      };

      if (category) whereClause.category = category;
      if (level) whereClause.level = level;
      if (search) {
        whereClause.OR = [
          { title: { contains: search as string, mode: "insensitive" } },
          { description: { contains: search as string, mode: "insensitive" } },
        ];
      }

      const [courses, total] = await Promise.all([
        prisma.course.findMany({
          where: whereClause,
          skip,
          take: Number(limit),
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            subtitle: true,
            slug: true,
            description: true,
            shortDescription: true,
            thumbnail: true,
            image: true,
            provider: true,
            status: true,
            price: true,
            originalPrice: true,
            duration: true,
            level: true,
            category: true,
            batchStartDate: true,
            nextReviewDate: true,
            rating: true,
            reviews: true,
            featured: true,
            enrolledStudents: true,
            passingPercent: true,
            isPublished: true,
            targetAudience: true,
            knowledgePartner: true,
            prerequisites: true,
            about: true,
            outcomes: true,
            _count: {
              select: { enrollments: true },
            },
            tags: {
              select: { name: true },
            },
            faqs: {
              select: {
                question: true,
                answer: true,
              },
            },
            faculty: {
              select: {
                name: true,
                title: true,
                department: true,
                bio: true,
              },
            },
            relatedCourses: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        }),
        prisma.course.count({ where: whereClause }),
      ]);

      res.json({
        courses,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit)),
        },
      });
    } catch (error) {
      console.error("Get courses error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static getCourseBySlug = async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;

      const course = await prisma.course.findUnique({
        where: { slug },
        include: {
          modules: {
            orderBy: { order: "asc" },
            include: {
              lessons: {
                orderBy: { order: "asc" },
                select: {
                  id: true,
                  title: true,
                  duration: true,
                  order: true,
                },
              },
            },
          },
          resources: true,
          faqs: true,
          faculty: true,
          tags: true,
          relatedCourses: {
            select: {
              id: true,
              title: true,
              slug: true,
              thumbnail: true,
              level: true,
            },
          },
          _count: {
            select: { enrollments: true },
          },
        },
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      res.json({ course });
    } catch (error) {
      console.error("Get course error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static createCourse = async (req: Request, res: Response) => {
    try {
      const {
        title,
        subtitle,
        description,
        shortDescription,
        longDescription,
        about,
        price,
        rating,
        reviews,
        originalPrice,
        duration,
        level,
        category,
        provider,
        thumbnail,
        status,
        image,
        batchStartDate,
        nextReviewDate,
        outcomes,
        targetAudience,
        enrolledStudents,
        knowledgePartner,
        prerequisites,
        passingPercent,
        featured,
        faqs,
        faculty,
        tags,
        relatedCourseIds,
      } = req.body;

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      const course = await prisma.course.create({
        data: {
          title,
          subtitle,
          slug,
          description,
          shortDescription,
          longDescription,
          about,
          enrolledStudents,
          price: parseFloat(price),
          rating: parseFloat(rating),
          reviews: parseFloat(reviews),
          originalPrice: parseFloat(originalPrice),
          duration: parseInt(duration),
          level,
          category,
          provider,
          status: status as any, // Cast to any if you are sure it's valid, or use CourseStatus enum if imported
          thumbnail,
          image,
          batchStartDate: batchStartDate ? new Date(batchStartDate) : undefined,
          nextReviewDate: nextReviewDate ? new Date(nextReviewDate) : undefined,
          outcomes,
          targetAudience,
          knowledgePartner,
          prerequisites,
          passingPercent: passingPercent ? parseInt(passingPercent) : 70,
          featured: featured ?? false,

          faqs: {
            create:
              faqs?.map((faq: any) => ({
                question: faq.question,
                answer: faq.answer,
              })) || [],
          },
          faculty: {
            create:
              faculty?.map((member: any) => ({
                name: member.name,
                title: member.title,
                department: member.department,
                bio: member.bio,
              })) || [],
          },
          tags: {
            create: tags?.map((tag: string) => ({ name: tag })) || [],
          },
          relatedCourses: {
            connect: relatedCourseIds?.map((id: string) => ({ id })) || [],
          },
        },
      });

      res.status(201).json({ message: "Course created successfully", course });
    } catch (error) {
      console.error("Create course error:", error);
      res.status(500).json({ message: error });
    }
  };

  static updateCourse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const {
        title,
        subtitle,
        description,
        shortDescription,
        longDescription,
        about,
        price,
        rating,
        reviews,
        originalPrice,
        duration,
        level,
        category,
        provider,
        thumbnail,
        status,
        image,
        batchStartDate,
        nextReviewDate,
        outcomes,
        targetAudience,
        enrolledStudents,
        knowledgePartner,
        prerequisites,
        passingPercent,
        featured,
        isPublished,
        faqs,
        faculty,
        tags,
        relatedCourseIds,
      } = req.body;

      const course = await prisma.course.update({
        where: { id },
        data: {
          title,
          subtitle,
          description,
          shortDescription,
          longDescription,
          about,
          price: parseFloat(price),
          rating: parseFloat(rating),
          reviews: parseFloat(reviews),
          originalPrice: parseFloat(originalPrice),
          duration: parseInt(duration),
          enrolledStudents,
          level,
          category,
          provider,
          thumbnail,
          image,
          batchStartDate: batchStartDate ? new Date(batchStartDate) : undefined,
          nextReviewDate: nextReviewDate ? new Date(nextReviewDate) : undefined,
          outcomes,
          targetAudience,
          knowledgePartner,
          prerequisites,
          passingPercent: passingPercent ? parseInt(passingPercent) : 70,
          featured: featured ?? false,
          isPublished: isPublished ?? true,
          status: status ?? "DRAFT",

          faqs: {
            deleteMany: {},
            create:
              faqs?.map((faq: any) => ({
                question: faq.question,
                answer: faq.answer,
              })) || [],
          },

          faculty: {
            deleteMany: {},
            create:
              faculty?.map((member: any) => ({
                name: member.name,
                title: member.title,
                department: member.department,
                bio: member.bio,
              })) || [],
          },

          tags: {
            deleteMany: {},
            create: tags?.map((tag: string) => ({ name: tag })) || [],
          },

          relatedCourses: {
            set: relatedCourseIds?.map((id: string) => ({ id })) || [],
          },
        },
      });

      res.json({ message: "Course updated successfully", course });
    } catch (error) {
      console.error("Update course error:", error);
      res
        .status(500)
        .json({ message: error.message || "Internal server error" });
    }
  };

  static deleteCourse = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.course.delete({
        where: { id },
      });

      res.json({ message: "Course deleted successfully" });
    } catch (error) {
      console.error("Delete course error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static getCourseModules = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const modules = await prisma.module.findMany({
        where: { courseId: id },
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      });

      res.json({ modules });
    } catch (error) {
      console.error("Get modules error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  static createModule = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { title, description, order } = req.body;

      const module = await prisma.module.create({
        data: {
          title,
          description,
          order: parseInt(order),
          courseId: id,
        },
      });

      res.status(201).json({ message: "Module created successfully", module });
    } catch (error) {
      console.error("Create module error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
