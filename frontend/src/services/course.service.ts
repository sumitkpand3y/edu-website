import { apiClient } from '@/lib/client'

export interface CourseQueryParams {
  sortBy: string | number | readonly string[] | undefined
  category?: string
  level?: string
  search?: string
  page?: number
  limit?: number
  cache?: boolean
}

export interface CourseFormData {
  title: string
  description: string
  // Add all your fields like slug, price, image, etc.
}

export const courseService = {
  // 🌐 Get all courses with filters + pagination
  async getAllCourses(params: CourseQueryParams = {}) {
    const {
      category,
      level,
      search,
      page = 1,
      limit = 8,
      cache = true,
    } = params

    return await apiClient.get('/courses', {
      params: { category, level, search, page, limit },
      cache,
      cacheTTL: 2 * 60 * 1000, // 2 minutes
    })
  },

  // 🔍 Get course by slug
  async getCourseBySlug(slug: string) {
    return await apiClient.get(`/courses/${slug}`, {
      cache: true,
      cacheTTL: 5 * 60 * 1000,
    })
  },

  // ➕ Create new course
  async createCourse(data: CourseFormData) {
    return await apiClient.post('/courses', data, {
      auth: true,
    })
  },

  // ✏️ Update course
  async updateCourse(id: string, data: CourseFormData) {
    return await apiClient.put(`/courses/${id}`, data, {
      auth: true,
    })
  },

  // ❌ Delete course
  async deleteCourse(id: string) {
    return await apiClient.delete(`/courses/${id}`, {
      auth: true,
    })
  },
}
