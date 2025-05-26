/**
 * @file psai.js
 * @description Main entry point for PSAI library
 */

import anime from 'animejs';
import eventBus from './services/EventBus.js';

/**
 * PSAI core library with all essential utilities
 */
export class PSAI {
  /**
   * DOM utilities for element selection and manipulation
   */
  static DOM = {
    /**
     * Select element(s) with optional context
     */
    select(selector, context = document, all = false) {
      return all 
        ? Array.from(context.querySelectorAll(selector))
        : context.querySelector(selector);
    },
    
    /**
     * Create element with optional attributes
     */
    create(tag, attrs = {}) {
      const el = document.createElement(tag);
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === 'class' || key === 'className') {
          el.className = value;
        } else if (key === 'text') {
          el.textContent = value;
        } else if (key === 'html') {
          el.innerHTML = value;
        } else if (key === 'style' && typeof value === 'object') {
          Object.assign(el.style, value);
        } else {
          el.setAttribute(key, value);
        }
      });
      return el;
    }
  };

  /**
   * Animation utilities using AnimeJS
   */
  static Animation = {
    /**
     * Create animation with AnimeJS
     */
    create(targets, params = {}) {
      return anime({
        targets,
        ...params
      });
    },
    
    /**
     * Create spring-based animation
     */
    spring(targets, params = {}) {
      return anime({
        targets,
        easing: 'spring(1, 80, 10, 0)',
        ...params
      });
    }
  };

  /**
   * Event handling utilities
   */
  static Events = {
    /**
     * Add event with automatic cleanup function
     */
    add(element, type, handler, options) {
      if (!element) return () => {};
      element.addEventListener(type, handler, options);
      return () => element.removeEventListener(type, handler, options);
    },
    
    /**
     * Emit event via global event bus
     */
    emit(name, data) {
      eventBus.emit(name, data);
    },
    
    /**
     * Listen to global event
     */
    on(name, handler) {
      return eventBus.on(name, handler);
    }
  };
}

/**
 * BaseComponent class for all PSAI components
 */
export class BaseComponent {
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
   */
  on(element, type, handler, options) {
    if (!element) return this;
    
    const cleanup = PSAI.Events.add(element, type, handler, options);
    this._events.push(cleanup);
    
    return this;
  }

  /**
   * Set timeout with automatic cleanup
   */
  setTimeout(callback, delay) {
    const id = setTimeout(callback, delay);
    this._timers.push(id);
    return id;
  }

  /**
   * Request animation frame with automatic cleanup
   */
  requestAnimationFrame(callback) {
    const id = requestAnimationFrame(callback);
    this._rafIds.push(id);
    return id;
  }

  /**
   * Clean up all resources
   */
  destroy() {
    // Clean up event listeners
    this._events.forEach(cleanup => cleanup());
    this._events = [];
    
    // Clean up timers
    this._timers.forEach(id => clearTimeout(id));
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

/**
 * AppService for component registration and orchestration
 */
export class AppService {
  constructor() {
    this._components = new Map();
    this.config = {
      debug: false
    };
  }

  /**
   * Register a component
   */
  registerComponent(name, component) {
    if (!name || !component) return this;
    this._components.set(name, component);
    return this;
  }

  /**
   * Initialize all registered components
   */
  async init() {
    const promises = [];
    
    for (const [name, component] of this._components.entries()) {
      const promise = component.init()
        .then(() => {
          if (this.config.debug) {
            console.log(`✅ Component initialized: ${name}`);
          }
          return component;
        })
        .catch(error => {
          console.error(`❌ Failed to initialize component: ${name}`, error);
          return Promise.reject(error);
        });
      
      promises.push(promise);
    }
    
    return Promise.all(promises).then(() => this);
  }

  /**
   * Get a registered component by name
   */
  getComponent(name) {
    return this._components.get(name) || null;
  }

  /**
   * Clean up all components
   */
  destroy() {
    for (const [name, component] of this._components.entries()) {
      try {
        component.destroy();
        if (this.config.debug) {
          console.log(`✅ Component destroyed: ${name}`);
        }
      } catch (error) {
        console.error(`❌ Failed to destroy component: ${name}`, error);
      }
    }
    
    this._components.clear();
    return this;
  }
}

// Create and export singleton instances
export const appService = new AppService();

// Default export for easier imports
/**
 * Data utilities for loading and processing data
 */
PSAI.Data = {
  /**
   * Load JSON data from a file path
   * @param {string} filePath - Path to JSON file
   * @returns {Promise<Object|null>} Loaded data or null on error
   */
  async load(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error(`Data load failed for ${filePath}:`, error);
      return null; // Fallback to null
    }
  }
};

export default {
  PSAI,
  BaseComponent,
  AppService,
  appService
};
