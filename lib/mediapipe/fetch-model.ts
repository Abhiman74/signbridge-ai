import { MODEL_CACHE_NAME } from "./config";

/**
 * Fetches a model asset with a cache-first strategy using the Cache Storage
 * API. The first load fetches from the network and stores the response;
 * every subsequent load (including fully offline, once cached) is served
 * from the cache. This is what lets model inference keep working without a
 * network connection after the first successful visit.
 */
export async function fetchModelBuffer(url: string): Promise<ArrayBuffer> {
  if (typeof caches !== "undefined") {
    try {
      const cache = await caches.open(MODEL_CACHE_NAME);
      const cached = await cache.match(url);
      if (cached) {
        return await cached.arrayBuffer();
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Model fetch failed with status ${response.status}`);
      }
      await cache.put(url, response.clone());
      return await response.arrayBuffer();
    } catch {
      // Cache Storage can be unavailable (private browsing in some
      // browsers) — fall back to a plain network fetch.
    }
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Model fetch failed with status ${response.status}`);
  }
  return await response.arrayBuffer();
}
