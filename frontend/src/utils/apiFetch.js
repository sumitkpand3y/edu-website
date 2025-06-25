// utils/apiFetch.js
export const apiFetch = async (endpoint, options = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`

  const finalOptions = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
      ...(options.headers || {}),
    },
  }

  const res = await fetch(url, finalOptions)
  const data = await res.json()

  if (!res.ok) throw new Error(data.message || 'API Error')
  return data
}
