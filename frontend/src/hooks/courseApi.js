import { apiFetch } from '@/utils/apiFetch'

export const createCourse = async (courseData) => {
  const token = localStorage.getItem('token') // get auth token
  if (!token) throw new Error('Not authenticated')

  const res = await apiFetch('/courses', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(courseData),
  })

  if (!res || res.error) {
    throw new Error(res?.message || 'Course creation failed')
  }

  return res
}
// ✅ Get all published courses
export const getAllCourses = async () => {
  const res = await apiFetch('/courses')
  if (!res) throw new Error('Failed to fetch courses')
  return res
}

// ✅ Get course by slug
export const getCourseBySlug = async (slug) => {
  const res = await apiFetch(`/courses/${slug}`)
  if (!res) throw new Error('Course not found')
  return res
}

// ✅ Update course by ID (requires auth)
export const updateCourse = async (id, updateData) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Unauthorized')

  const res = await apiFetch(`/courses/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updateData),
  })

  if (!res || res.error) throw new Error(res.message || 'Failed to update course')
  return res
}

// ✅ Delete course by ID (requires auth)
export const deleteCourse = async (id) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Unauthorized')

  const res = await apiFetch(`/courses/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!res || res.error) throw new Error(res.message || 'Failed to delete course')
  return res
}
