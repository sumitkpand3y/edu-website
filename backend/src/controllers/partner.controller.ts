import { Request, Response } from 'express';
import prisma from '../models/prisma';
import { generateCertificate } from '../utils/pdfGenerator';

export class PartnersController {
  // Get all partners with filtering and pagination
  static getAllPartners = async (req: Request, res: Response) =>  {
    try {
      const {
        type,
        search,
        page = 1,
        limit = 10,
        sortBy = 'name',
        sortOrder = 'asc',
        isActive = true
      } = req.query;

      const skip = (parseInt(page) - 1) * parseInt(limit);
      
      // Build where clause
      const where = {
        isActive: isActive === 'true'
      };

      if (type) {
        where.type = type.toUpperCase();
      }

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { location: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { specialties: { hasSome: [search] } }
        ];
      }

      // Get partners with pagination
      const [partners, total] = await Promise.all([
        prisma.partner.findMany({
          where,
          orderBy: { [sortBy]: sortOrder },
          skip,
          take: parseInt(limit)
        }),
        prisma.partner.count({ where })
      ]);

      // Transform data for frontend compatibility
      const transformedPartners = partners.map(partner => ({
        id: partner.id,
        name: partner.name,
        logo: partner.logo,
        description: partner.description,
        established: partner.established,
        location: partner.location,
        website: partner.website,
        email: partner.email,
        phone: partner.phone,
        specialties: partner.specialties
      }));

      res.json({
        success: true,
        data: {
          partners: transformedPartners,
          pagination: {
            current: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            total,
            limit: parseInt(limit)
          }
        }
      });

    } catch (error) {
      console.error('Get partners error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch partners',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get partners grouped by type (for frontend compatibility)
  static getPartnersGrouped = async (req: Request, res: Response) =>  {
    try {
      const { isActive = true } = req.query;

      const partners = await prisma.partner.findMany({
        where: { isActive: isActive === 'true' },
        orderBy: { name: 'asc' }
      });

      // Group by type for frontend compatibility
      type PartnerType = 'knowledge' | 'hospital' | 'finance';
      const groupedPartners: Record<PartnerType, any[]> = {
        knowledge: [],
        hospital: [],
        finance: []
      };

      partners.forEach(partner => {
        const type = partner.type.toLowerCase() as PartnerType;
        if (type in groupedPartners) {
          groupedPartners[type].push({
            id: partner.id,
            name: partner.name,
            logo: partner.logo,
            description: partner.description,
            established: partner.established,
            location: partner.location,
            website: partner.website,
            email: partner.email,
            phone: partner.phone,
            specialties: partner.specialties
          });
        }
      });

      res.json({
        success: true,
        data: groupedPartners
      });

    } catch (error) {
      console.error('Get grouped partners error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch partners',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get single partner by ID
  static getPartnerById = async (req: Request, res: Response) =>  {
    try {
      const { id } = req.params;

      const partner = await prisma.partner.findUnique({
        where: { id: parseInt(id) }
      });

      if (!partner) {
        return res.status(404).json({
          success: false,
          message: 'Partner not found'
        });
      }

      res.json({
        success: true,
        data: {
          id: partner.id,
          name: partner.name,
          logo: partner.logo,
          description: partner.description,
          established: partner.established,
          location: partner.location,
          website: partner.website,
          email: partner.email,
          phone: partner.phone,
          specialties: partner.specialties,
          type: partner.type.toLowerCase(),
          isActive: partner.isActive
        }
      });

    } catch (error) {
      console.error('Get partner by ID error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch partner',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Create new partner
  static createPartner = async (req: Request, res: Response) =>  {
    try {
      // Validate input
      const { error, value } = partnerValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      // Check if partner with same name exists
      const existingPartner = await prisma.partner.findFirst({
        where: {
          name: { equals: value.name, mode: 'insensitive' },
          type: value.type
        }
      });

      if (existingPartner) {
        return res.status(409).json({
          success: false,
          message: 'Partner with this name already exists in this category'
        });
      }

      // Create partner
      const partner = await prisma.partner.create({
        data: {
          name: value.name,
          type: value.type,
          logo: value.logo,
          description: value.description,
          established: value.established,
          location: value.location,
          website: value.website,
          email: value.email,
          phone: value.phone,
          specialties: value.specialties,
          isActive: value.isActive
        }
      });

      res.status(201).json({
        success: true,
        message: 'Partner created successfully',
        data: {
          id: partner.id,
          name: partner.name,
          type: partner.type.toLowerCase()
        }
      });

    } catch (error) {
      console.error('Create partner error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create partner',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Update partner
  static updatePartner = async (req: Request, res: Response) =>  {
    try {
      const { id } = req.params;

      // Validate input
      const { error, value } = partnerValidationSchema.validate(req.body);
      if (error) {
        return res.status(400).json({
          success: false,
          message: 'Validation error',
          errors: error.details.map(detail => ({
            field: detail.path.join('.'),
            message: detail.message
          }))
        });
      }

      // Check if partner exists
      const existingPartner = await prisma.partner.findUnique({
        where: { id: parseInt(id) }
      });

      if (!existingPartner) {
        return res.status(404).json({
          success: false,
          message: 'Partner not found'
        });
      }

      // Check for name conflicts (excluding current partner)
      const nameConflict = await prisma.partner.findFirst({
        where: {
          name: { equals: value.name, mode: 'insensitive' },
          type: value.type,
          id: { not: parseInt(id) }
        }
      });

      if (nameConflict) {
        return res.status(409).json({
          success: false,
          message: 'Partner with this name already exists in this category'
        });
      }

      // Update partner
      const updatedPartner = await prisma.partner.update({
        where: { id: parseInt(id) },
        data: {
          name: value.name,
          type: value.type,
          logo: value.logo,
          description: value.description,
          established: value.established,
          location: value.location,
          website: value.website,
          email: value.email,
          phone: value.phone,
          specialties: value.specialties,
          isActive: value.isActive
        }
      });

      res.json({
        success: true,
        message: 'Partner updated successfully',
        data: {
          id: updatedPartner.id,
          name: updatedPartner.name,
          type: updatedPartner.type.toLowerCase()
        }
      });

    } catch (error) {
      console.error('Update partner error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update partner',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Soft delete partner
  static deletePartner = async (req: Request, res: Response) =>  {
    try {
      const { id } = req.params;

      // Check if partner exists
      const existingPartner = await prisma.partner.findUnique({
        where: { id: parseInt(id) }
      });

      if (!existingPartner) {
        return res.status(404).json({
          success: false,
          message: 'Partner not found'
        });
      }

      // Soft delete (set isActive to false)
      await prisma.partner.update({
        where: { id: parseInt(id) },
        data: { isActive: false }
      });

      res.json({
        success: true,
        message: 'Partner deleted successfully'
      });

    } catch (error) {
      console.error('Delete partner error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete partner',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Restore soft-deleted partner
  static restorePartner = async (req: Request, res: Response) =>  {
    try {
      const { id } = req.params;

      const partner = await prisma.partner.update({
        where: { id: parseInt(id) },
        data: { isActive: true }
      });

      res.json({
        success: true,
        message: 'Partner restored successfully',
        data: { id: partner.id, name: partner.name }
      });

    } catch (error) {
      console.error('Restore partner error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to restore partner',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Hard delete partner (permanent)
  static  permanentDeletePartner = async (req: Request, res: Response) =>  {
    try {
      const { id } = req.params;

      await prisma.partner.delete({
        where: { id: parseInt(id) }
      });

      res.json({
        success: true,
        message: 'Partner permanently deleted'
      });

    } catch (error) {
      console.error('Permanent delete partner error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to permanently delete partner',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  // Get partner statistics
  static getPartnerStats = async (req: Request, res: Response) =>  {
    try {
      const stats = await prisma.partner.groupBy({
        by: ['type'],
        where: { isActive: true },
        _count: { id: true }
      });

      const totalActive = await prisma.partner.count({
        where: { isActive: true }
      });

      const totalInactive = await prisma.partner.count({
        where: { isActive: false }
      });

      const recentPartners = await prisma.partner.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          type: true,
          createdAt: true
        }
      });

      const formattedStats = {
        byType: {
          knowledge: stats.find(s => s.type === 'KNOWLEDGE')?._count.id || 0,
          hospital: stats.find(s => s.type === 'HOSPITAL')?._count.id || 0,
          finance: stats.find(s => s.type === 'FINANCE')?._count.id || 0
        },
        total: {
          active: totalActive,
          inactive: totalInactive,
          all: totalActive + totalInactive
        },
        recent: recentPartners.map(p => ({
          id: p.id,
          name: p.name,
          type: p.type.toLowerCase(),
          createdAt: p.createdAt
        }))
      };

      res.json({
        success: true,
        data: formattedStats
      });

    } catch (error) {
      console.error('Get partner stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch partner statistics',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

}