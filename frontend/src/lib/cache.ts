export class APICache {
  private cache: Map<string, any>;
  private timestamps: Map<string, number>;
  private defaultTTL: number;

  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 mins
  }

  set(key: string, data: any, ttl = this.defaultTTL) {
    this.cache.set(key, data);
    this.timestamps.set(key, Date.now() + ttl);
  }

  get(key: string): any | null {
    const expiry = this.timestamps.get(key);
    if (!expiry || Date.now() > expiry) {
      this.delete(key);
      return null;
    }
    return this.cache.get(key);
  }

  delete(key: string) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  clear() {
    this.cache.clear();
    this.timestamps.clear();
  }

  generateKey(url: string, options: Partial<RequestInit> = {}): string {
    const { method = 'GET', body, params } = options as any;
    return `${method}:${url}:${JSON.stringify({ body, params })}`;
  }
}

export const apiCache = new APICache();
