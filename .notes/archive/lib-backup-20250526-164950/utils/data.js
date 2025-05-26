/**
 * @file data.js
 * @description Data utilities for fetching and managing data
 * @module utils/data
 */

/**
 * Data utilities for fetching and managing JSON data
 */
export const Data = {
  /**
   * Load data from a JSON file
   * @param {string} path - Path to JSON file
   * @returns {Promise<Object>} Promise that resolves with JSON data
   */
  async load(path) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load data from ${path}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error loading data from ${path}:`, error);
      return null;
    }
  }
};

export default Data;
