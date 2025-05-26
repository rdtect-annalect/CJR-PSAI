/**
 * @file data.js
 * @description Data loading and processing utilities for PSAi components
 */

/**
 * Load JSON data from a URL
 * @param {string} url - URL to load data from
 * @param {Object} options - Fetch options
 * @returns {Promise<Object|null>} Loaded data or null on error
 */
export async function load(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Failed to load data: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to load data from ${url}:`, error);
    return null;
  }
}

/**
 * Load multiple JSON data sources
 * @param {string[]} urls - URLs to load
 * @returns {Promise<Object[]>} Array of loaded data (null for failed loads)
 */
export async function loadMultiple(urls) {
  return Promise.all(urls.map(url => load(url).catch(() => null)));
}

/**
 * Cache for loaded data
 * @type {Map<string, Object>}
 */
const cache = new Map();

/**
 * Load JSON data from a URL with caching
 * @param {string} url - URL to load data from
 * @param {Object} options - Options including fetch options
 * @param {boolean} options.useCache - Whether to use cache (default: true)
 * @param {number} options.cacheTTL - Cache TTL in milliseconds (default: 5 minutes)
 * @returns {Promise<Object|null>} Loaded data or null on error
 */
export async function loadCached(url, { useCache = true, cacheTTL = 300000, ...fetchOptions } = {}) {
  // Use cached data if available and not expired
  if (useCache && cache.has(url)) {
    const { data, timestamp } = cache.get(url);
    if (Date.now() - timestamp < cacheTTL) {
      return data;
    }
  }
  
  // Load new data
  const data = await load(url, fetchOptions);
  
  // Cache the result if successful
  if (data && useCache) {
    cache.set(url, { data, timestamp: Date.now() });
  }
  
  return data;
}

/**
 * Clear the data cache
 * @param {string} [url] - Specific URL to clear from cache (clears all if not provided)
 */
export function clearCache(url) {
  if (url) {
    cache.delete(url);
  } else {
    cache.clear();
  }
}

export default { load, loadMultiple, loadCached, clearCache };
