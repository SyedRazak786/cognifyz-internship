// Simple in-memory cache with TTL (Task 8 requirement: server-side caching)
class SimpleCache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttlMs = 10000) {
    const expiresAt = Date.now() + ttlMs;
    this.store.set(key, { value, expiresAt });
  }

  get(key) {
    const entry = this.store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  has(key) {
    return this.get(key) !== undefined;
  }
}

module.exports = new SimpleCache();
