/**
 * @file AppService.js
 * @description Main application service for component registration and lifecycle management
 * @module services/AppService
 */

import eventBus from './EventBus.js';

/**
 * Core application service that manages components
 * Provides centralized component registration and lifecycle management
 */
class AppServiceSingleton {
  /**
   * Create a new AppServiceSingleton instance
   */
  constructor() {
    this._components = new Map();
    this.config = {
      debug: false,
      eventBus,
      observerThreshold: 0.1
    };
    this._observer = null;
    this._timers = [];
    this._initialized = false;
  }
  
  /**
   * Application-specific initialization
   * @returns {Promise<AppServiceSingleton>} Promise resolving to this instance
   */
  async init() {
    if (this._initialized) {
      return Promise.resolve(this);
    }
    
    try {
      // Initialize all registered components
      const promises = [];
      
      for (const [name, component] of this._components.entries()) {
        const promise = component.init()
          .then(() => {
            if (this.config.debug) {
              console.log(`✅ Component initialized: ${name}`);
            }
          })
          .catch(error => {
            console.error(`❌ Failed to initialize component: ${name}`, error);
            throw error;
          });
        
        promises.push(promise);
      }
      
      await Promise.all(promises);
      
      // Emit application ready event
      if (this.config.eventBus) {
        this.config.eventBus.emit('app:ready', { timestamp: Date.now() });
      }
      
      if (this.config.debug) {
        console.info('[AppService] Initialization complete');
      }
      
      this._initialized = true;
      return this;
    } catch (error) {
      console.error('[AppService] Initialization failed:', error);
      throw error;
    }
  }
  
  /**
   * Register a component with the application
   * @param {string} name - Component name
   * @param {object} component - Component instance
   * @returns {AppServiceSingleton} Returns the AppService instance for chaining
   */
  registerComponent(name, component) {
    if (!name || !component) return this;
    this._components.set(name, component);
    
    if (this.config.debug) {
      console.log(`📦 Registered component: ${name}`);
    }
    
    return this;
  }

  /**
   * Get a registered component by name
   * @param {string} name - Component name
   * @returns {object|null} The component instance or null if not found
   */
  getComponent(name) {
    return this._components.get(name) || null;
  }

  /**
   * Check if a component is initialized
   * @param {string} name - Component name
   * @returns {boolean} True if component is initialized
   */
  isComponentInitialized(name) {
    const component = this._components.get(name);
    return component && component.initialized === true;
  }
  
  /**
   * Discover and register available components
   * This method can be extended as needed for your specific components
   * @returns {AppServiceSingleton} Returns the AppService instance for chaining
   */
  discoverComponents() {
    // This is where components would be discovered and registered
    // Implement dynamic discovery or manual registration as needed
    return this;
  }
  
  /**
   * Sets up lazy initialization of components using IntersectionObserver
   * @returns {Promise} Promise that resolves when observer is set up
   */
  setupLazyInitialization() {
    return new Promise((resolve) => {
      // Initialize components that should be loaded immediately
      this._initializeVisibleComponents();
      
      // Set up IntersectionObserver for lazy loading if available
      if ('IntersectionObserver' in window) {
        this._observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const componentName = entry.target.dataset.component;
                if (componentName) {
                  this._initializeComponent(componentName);
                  this._observer.unobserve(entry.target);
                }
              }
            });
          },
          { threshold: this.config.observerThreshold }
        );
      }
      
      resolve(this);
    });
  }
  
  /**
   * Initialize components that are currently visible
   * @private
   */
  _initializeVisibleComponents() {
    // Implement initialization of initially visible components
    // This would depend on your specific component structure
  }
  
  /**
   * Initialize a specific component by name
   * @param {string} name - Component name
   * @private
   */
  _initializeComponent(name) {
    const component = this._components.get(name);
    if (component && !component.initialized && typeof component.init === 'function') {
      component.init();
    }
  }
  
  /**
   * Clean up all components and release resources
   * @returns {Promise<void>}
   */
  async destroy() {
    const promises = [];
    
    for (const [name, component] of this._components.entries()) {
      if (typeof component.destroy === 'function') {
        promises.push(
          Promise.resolve().then(() => component.destroy())
            .catch(error => {
              console.error(`Failed to destroy component: ${name}`, error);
            })
        );
      }
    }
    
    await Promise.all(promises);
    this._components.clear();
    
    // Clean up observers
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    
    // Clear any timers
    this._timers.forEach(timerId => {
      clearTimeout(timerId);
    });
    this._timers = [];
    
    this._initialized = false;
    
    return Promise.resolve();
  }
}

// Create and export a singleton instance
const appService = new AppServiceSingleton();
export default appService;