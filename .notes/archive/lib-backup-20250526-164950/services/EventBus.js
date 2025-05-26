/**
 * @file EventBus.js
 * @description Modern event system for cross-component communication
 * @module services/EventBus
 */

/**
 * Enhanced event bus with debugging and memory safety
 * @class EventBus
 */
class EventBus {
  /**
   * Create a new EventBus instance
   * @param {Object} [options={}] - Configuration options
   */
  constructor(options = {}) {
    // Event tracking
    this._handlers = new Map();
    this._eventElement = document.createElement('div');
    
    // Configuration
    this._namespace = options.namespace || 'EventBus';
    this._debug = options.debug || false;
    this._maxListeners = options.maxListeners || 20;
    
    // Event history tracking for debugging
    this._history = [];
    this._historyLimit = options.historyLimit || 50;
    this._trackHistory = options.trackHistory !== false;
  }

  /**
   * Toggle history tracking on/off
   * @param {boolean} enabled - Whether to enable history tracking
   * @returns {EventBus} This instance for chaining
   */
  setHistoryTracking(enabled) {
    this._trackHistory = enabled;
    return this;
  }
  
  /**
   * Subscribe to an event
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @returns {Function} Unsubscribe function
   */
  on(event, handler) {
    if (!event || typeof handler !== 'function') {
      console.error(`${this._namespace}: Invalid event or handler`);
      return () => {};
    }
    
    // Add event listener
    this._eventElement.addEventListener(event, handler);
    
    // Store handler in map for tracking
    if (!this._handlers.has(event)) {
      this._handlers.set(event, new Set());
    }
    
    const handlers = this._handlers.get(event);
    handlers.add(handler);
    
    // Check max listeners warning
    if (this._debug && handlers.size > this._maxListeners) {
      console.warn(
        `${this._namespace}: Event '${event}' has ${handlers.size} listeners, ` +
        `which exceeds the recommended maximum of ${this._maxListeners}.`
      );
    }
    
    // Return unsubscribe function
    return () => {
      this._eventElement.removeEventListener(event, handler);
      if (this._handlers.has(event)) {
        this._handlers.get(event).delete(handler);
      }
    };
  }
  
  /**
   * Subscribe to an event once
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @returns {Function} Unsubscribe function
   */
  once(event, handler) {
    if (!event || typeof handler !== 'function') {
      console.error(`${this._namespace}: Invalid event or handler`);
      return () => {};
    }
    
    const onceHandler = (e) => {
      this._eventElement.removeEventListener(event, onceHandler);
      handler(e);
    };
    
    this._eventElement.addEventListener(event, onceHandler);
    
    return () => {
      this._eventElement.removeEventListener(event, onceHandler);
    };
  }
  
  /**
   * Emit an event
   * @param {string} event - Event name
   * @param {*} data - Event data
   * @returns {boolean} Success state
   */
  emit(event, data) {
    if (!event) {
      console.error(`${this._namespace}: Invalid event name`);
      return false;
    }
    
    // Create custom event
    const customEvent = new CustomEvent(event, {
      detail: data,
      bubbles: true,
      cancelable: true
    });
    
    // Track event in history if enabled
    if (this._trackHistory) {
      this._recordEvent(event, data);
    }
    
    // Log if debug enabled
    if (this._debug) {
      console.log(`${this._namespace}: Emitting '${event}'`, data);
    }
    
    // Dispatch event
    return this._eventElement.dispatchEvent(customEvent);
  }
  
  /**
   * Clear all event handlers
   * @returns {EventBus} This instance for chaining
   */
  clear() {
    this.removeAllListeners();
    return this;
  }
  
  /**
   * Clear event history
   * @returns {EventBus} This instance for chaining
   */
  clearHistory() {
    this._history = [];
    return this;
  }

  /**
   * Get event history
   * @returns {Array} Event history
   */
  getHistory() {
    return [...this._history];
  }
  
  /**
   * Remove all listeners for an event or all events
   * @param {string} [event] - Event name, omit to remove all
   * @returns {EventBus} This instance for chaining
   */
  removeAllListeners(event) {
    if (event) {
      // Remove listeners for specific event
      if (this._handlers.has(event)) {
        const handlers = this._handlers.get(event);
        handlers.forEach(handler => {
          this._eventElement.removeEventListener(event, handler);
        });
        this._handlers.delete(event);
      }
    } else {
      // Remove all listeners
      this._handlers.forEach((handlers, eventName) => {
        handlers.forEach(handler => {
          this._eventElement.removeEventListener(eventName, handler);
        });
      });
      this._handlers.clear();
    }
    
    return this;
  }

  /**
   * Record an event in history
   * @private
   * @param {string} event - Event name
   * @param {*} data - Event data
   */
  _recordEvent(event, data) {
    // Only record if tracking is enabled
    if (!this._trackHistory) return;
    
    // Record the event with timestamp
    this._history.push({
      event,
      data,
      timestamp: Date.now()
    });
    
    // Limit history size
    if (this._history.length > this._historyLimit) {
      this._history.shift();
    }
  }

  /**
   * Clear all event handlers
   * @returns {EventBus} This instance for chaining
   */
  clear() {
    this.removeAllListeners();
    return this;
  }
}

// Create and export a singleton instance
const eventBus = new EventBus();
export default eventBus;
