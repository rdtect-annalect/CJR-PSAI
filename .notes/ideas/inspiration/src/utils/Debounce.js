/**
 * Utility class for debouncing function calls
 */
export class Debounce {
  /**
   * Creates a debounced function that delays invoking the provided function until after
   * the specified wait time has elapsed since the last time it was invoked.
   * @param {Function} callback - Function to debounce
   * @param {number} delay - Debounce time in ms
   * @returns {Function} - Debounced function
   */
  static create(callback, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => callback.apply(this, args), delay);
    };
  }
}
