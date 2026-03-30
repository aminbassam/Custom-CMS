type RateLimitResult = {
  success: boolean;
  remaining: number;
  resetAt: number;
};

const memoryStore = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(key: string, limit = 5, windowMs = 60_000): Promise<RateLimitResult> {
  const now = Date.now();
  const existing = memoryStore.get(key);

  if (!existing || existing.resetAt <= now) {
    memoryStore.set(key, { count: 1, resetAt: now + windowMs });
    return { success: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  memoryStore.set(key, existing);
  return { success: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}
