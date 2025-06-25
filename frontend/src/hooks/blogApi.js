import { apiFetch } from '@/utils/apiFetch'

export const createBlog = async (blogData) => {
  const token = localStorage.getItem('token') // get auth token
  if (!token) throw new Error('Not authenticated')

  const res = await apiFetch('/blogs', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(blogData),
  })

  if (!res || res.error) {
    throw new Error(res?.message || 'Blog creation failed')
  }

  return res
}
// ✅ Get all published blogs
export const getAllBlogs = async ({ page = 1, limit = 10 } = {}) => {
  const res = await apiFetch(`/blogs?page=${page}&limit=${limit}`);
  if (!res) throw new Error('Failed to fetch blogs');
  return res;
};



// ✅ Get course by slug
export const getBlogBySlug = async (slug) => {
  const res = await apiFetch(`/blogs/${slug}`)
  if (!res) throw new Error('Blog not found')
  return res
}

// ✅ Update course by ID (requires auth)
export const updateBlog = async (id, updateData) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Unauthorized')

  const res = await apiFetch(`/blogs/${id}`, {
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
export const deleteBlog = async (id) => {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('Unauthorized')

  const res = await apiFetch(`/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!res || res.error) throw new Error(res.message || 'Failed to delete course')
  return res
}
