import { EventBus } from "../utils/EventBus.js";

/**
 * Base component class that provides common functionality for all components
 */
export class BaseComponent {
  /**
   * @param {Object} config - Configuration for the component
   */
  constructor(config = {}) {
    this.config = config;
    this._eventListeners = [];
    this._initialized = false;
  }

  /**
   * Initialize the component
   * Override this method in child components
   */
  init() {
    if (this._initialized) {
      console.warn(`${this.constructor.name} is already initialized`);
      return;
    }

    this._initialized = true;
  }

  /**
   * Safely add an event listener and track it for later cleanup
   * @param {EventTarget} target - The target to add the event listener to
   * @param {string} type - The event type
   * @param {Function} listener - The event listener
   * @param {Object} options - Event listener options
   */
  addSafeEventListener(target, type, listener, options = {}) {
    const boundListener = listener.bind(this);
    target.addEventListener(type, boundListener, options);
    this._eventListeners.push({ target, type, listener: boundListener });
  }

  /**
   * Subscribe to an event on the EventBus
   * @param {string} event - The event to subscribe to
   * @param {Function} callback - The callback function
   * @returns {Function} - Unsubscribe function
   */
  subscribe(event, callback) {
    const unsubscribe = EventBus.subscribe(event, callback.bind(this));
    return unsubscribe;
  }

  /**
   * Publish an event on the EventBus
   * @param {string} event - The event to publish
   * @param {any} data - The data to publish with the event
   */
  publish(event, data) {
    EventBus.publish(event, data);
  }

  /**
   * Clean up the component, removing event listeners
   */
  destroy() {
    // Remove all registered event listeners
    this._eventListeners.forEach(({ target, type, listener }) => {
      target.removeEventListener(type, listener);
    });
    this._eventListeners = [];
    this._initialized = false;
  }
}
