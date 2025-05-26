/**
 * @file BaseComponent.js
 * @description Base component class with lifecycle management for all PSAI components
 * @module components/base/BaseComponent
 */

/**
 * BaseComponent provides lifecycle management and resource tracking
 * for automatic cleanup of events, timers, and other resources
 */
export class BaseComponent {
  /**
   * Create a new component
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    this.config = {
      debug: false,
      ...config
    };
    
    // Resource tracking for automatic cleanup
    this._events = [];
    this._timers = [];
    this._observers = [];
    this._rafIds = [];
    
    // Component state
    this._initialized = false;
  }

  /**
   * Initialize the component
   * @returns {Promise} Promise that resolves when initialized
   */
  async init() {
    if (this._initialized) {
      return Promise.resolve(this);
    }
    
    this._initialized = true;
    return Promise.resolve(this);
  }

  /**
   * Add DOM event with automatic cleanup
   * @param {Element} element - DOM element
   * @param {string} type - Event type
   * @param {Function} handler - Event handler
   * @param {Object} options - Event options
   * @returns {BaseComponent} Returns this for chaining
   */
  on(element, type, handler, options) {
    if (!element) return this;
    
    element.addEventListener(type, handler, options);
    this._events.push(() => element.removeEventListener(type, handler, options));
    
    return this;
  }

  /**
   * Set timeout with automatic cleanup
   * @param {Function} callback - Callback function
   * @param {number} delay - Delay in milliseconds
   * @returns {number} Timeout ID
   */
  setTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
    this._timers.push(id);
    return id;
  }

  /**
   * Set interval with automatic cleanup
   * @param {Function} callback - Callback function
   * @param {number} delay - Delay in milliseconds
   * @returns {number} Interval ID
   */
  setInterval(callback, delay) {
    const id = setInterval(callback, delay);
    this._timers.push(id);
    return id;
  }

  /**
   * Request animation frame with automatic cleanup
   * @param {Function} callback - Animation callback
   * @returns {number} Animation frame ID
   */
  requestAnimationFrame(callback) {
    const id = requestAnimationFrame(callback);
    this._rafIds.push(id);
    return id;
  }

  /**
   * Create IntersectionObserver with automatic cleanup
   * @param {Function} callback - Observer callback
   * @param {Object} options - Observer options
   * @returns {IntersectionObserver} Observer instance
   */
  createObserver(callback, options = {}) {
    const observer = new IntersectionObserver(callback, options);
    this._observers.push(observer);
    return observer;
  }

  /**
   * Clean up all resources
   * @returns {BaseComponent} Returns this for chaining
   */
  destroy() {
    // Clean up event listeners
    this._events.forEach(cleanup => cleanup());
    this._events = [];
    
    // Clean up timers
    this._timers.forEach(id => {
      clearTimeout(id);
      clearInterval(id);
    });
    this._timers = [];
    
    // Clean up observers
    this._observers.forEach(observer => observer.disconnect());
    this._observers = [];
    
    // Clean up animation frames
    this._rafIds.forEach(id => cancelAnimationFrame(id));
    this._rafIds = [];
    
    this._initialized = false;
    
    return this;
  }
}

export default BaseComponent;