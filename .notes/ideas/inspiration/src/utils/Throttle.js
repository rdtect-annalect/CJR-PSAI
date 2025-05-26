/**
 * Utility class for throttling function calls
 */
export class Throttle {
  /**
   * Creates a throttled function that only invokes the provided function at most once per specified interval
   * @param {Function} callback - Function to throttle
   * @param {number} limit - Throttle time in ms
   * @returns {Function} - Throttled function
   */
  static create(callback, limit) {
    let waiting = false;
    return function () {
      if (!waiting) {
        callback.apply(this, arguments);
        waiting = true;
        setTimeout(() => {
          waiting = false;
        }, limit);
      }
    };
  }
}
