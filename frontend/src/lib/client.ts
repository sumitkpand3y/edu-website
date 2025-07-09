import { API_CONFIG } from './config';
import { apiCache } from './cache';

// ------------------------
// Custom Error Class
// ------------------------
export class APIError extends Error {
  status: number;
  data: Record<string, any>;

  constructor(message: string, status: number, data: Record<string, any> = {}) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.data = data;
  }
}

// ------------------------
// Type Definitions
// ------------------------
export interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  cache?: boolean;
  cacheTTL?: number;
  retries?: number;
  timeout?: number;
  auth?: boolean; // ✅ NEW
}

export class APIClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
    }
    return null;
  }

  private buildHeaders(
  customHeaders: Record<string, string> = {},
  auth: boolean = true
): Record<string, string> {
  const headers = {
    ...this.defaultHeaders,
    ...customHeaders,
  };

  const token = this.getAuthToken();
  if (auth && token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

  private buildURL(endpoint: string, params: Record<string, any> = {}): string {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, value.toString());
      }
    });
    return url.toString();
  }

  async request<T = any>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const {
      method = 'GET',
      body,
      headers = {},
      params = {},
      cache = false,
      cacheTTL,
      retries = API_CONFIG.retries,
      timeout = API_CONFIG.timeout,
    } = options;

    const url = this.buildURL(endpoint, params);
    const cacheKey = cache ? apiCache.generateKey(url, { method, body, params }) : null;

    if (cache && method === 'GET') {
      const cached = apiCache.get(cacheKey!);
      if (cached) return cached;
    }

    const requestOptions: RequestInit = {
      method,
      headers: this.buildHeaders(headers, options.auth !== false),
      signal: AbortSignal.timeout(timeout),
    };

    if (body) {
      requestOptions.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    let lastError: any;

    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();

        if (!response.ok) {
          throw new APIError(data.message || response.statusText, response.status, data);
        }

        if (cache && method === 'GET' && cacheKey) {
          apiCache.set(cacheKey, data, cacheTTL);
        }

        return data;
      } catch (error: any) {
        lastError = error;

        if (error instanceof APIError && [400, 401, 403, 404].includes(error.status)) {
          throw error;
        }

        if (attempt === retries) throw error;

        await new Promise((resolve) =>
          setTimeout(resolve, API_CONFIG.retryDelay * Math.pow(2, attempt))
        );
      }
    }

    throw lastError;
  }

  get<T = any>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  post<T = any>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'POST', body });
  }

  put<T = any>(endpoint: string, body?: any, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'PUT', body });
  }

  delete<T = any>(endpoint: string, options?: RequestOptions) {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }
}

export const apiClient = new APIClient();
