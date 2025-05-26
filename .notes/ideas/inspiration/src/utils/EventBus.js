/**
 * A simple pub/sub (EventBus) implementation for component communication
 */
export class EventBus {
  static #events = {};

  /**
   * Subscribe to an event
   * @param {string} event - The event to subscribe to
   * @param {Function} callback - The callback function
   * @returns {Function} - Unsubscribe function
   */
  static subscribe(event, callback) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }
    this.#events[event].push(callback);

    // Return unsubscribe function
    return () => this.unsubscribe(event, callback);
  }

  /**
   * Publish an event
   * @param {string} event - The event to publish
   * @param {any} data - The data to publish with the event
   */
  static publish(event, data) {
    if (!this.#events[event]) return;

    this.#events[event].forEach((callback) => {
      try {
        callback(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }

  /**
   * Unsubscribe from an event
   * @param {string} event - The event to unsubscribe from
   * @param {Function} callback - The callback function to remove
   */
  static unsubscribe(event, callback) {
    if (!this.#events[event]) return;

    this.#events[event] = this.#events[event].filter((cb) => cb !== callback);

    // Clean up empty event arrays
    if (this.#events[event].length === 0) {
      delete this.#events[event];
    }
  }
}
