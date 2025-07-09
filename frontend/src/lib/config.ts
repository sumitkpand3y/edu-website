export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.example.com',
  retries: 2,
  retryDelay: 500, // ms
  timeout: 10000, // 10s timeout
}
