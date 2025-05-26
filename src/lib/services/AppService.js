/**
 * @file AppService.js
 * @description Main application service for component registration and lifecycle management
 * @module services/AppService
 */

import { AppService as CoreAppService } from '../core';
import eventBus from './EventBus.js';

/**
 * Core application service that manages components
 */
class AppServiceSingleton extends CoreAppService {
  /**
   * Create a new AppServiceSingleton instance
   */
  constructor() {
    super({
      debug: process.env.NODE_ENV !== 'production',
      eventBus
    });
  }
  
  /**
   * Application-specific initialization
   * @returns {Promise<AppServiceSingleton>} Promise resolving to this instance
   */
  async init() {
    try {
      // Initialize the core service first
      await super.init();
      
      // Perform any application-specific initialization
      if (process.env.NODE_ENV !== 'production') {
        console.info('[AppService] Initialization complete');
      }
      
      return this;
    } catch (error) {
      console.error('[AppService] Initialization failed:', error);
      throw error;
    }
  }
  
  /**
   * Register a component with the application
   * @param {string} name - Component name
   * @param {BaseComponent} component - Component instance
   * @returns {AppService} Returns the AppService instance for chaining
   */
  registerComponent(name, component) {
    if (!name || !component) return this;
    
    this.components.set(name, {
      instance: component,
      initialized: false,
      container: null
    });
    
    if (this.config.debug) {
      console.log(`📦 Registered component: ${name}`);
    }
    
    return this;
  }
  
  /**
   * Get a registered component by name
   * @param {string} name - Component name
   * @returns {BaseComponent|null} Component instance or null
   */
  getComponent(name) {
    const component = this.components.get(name);
    return component ? component.instance : null;
  }
  
  /**
   * Check if a component is initialized
   * @param {string} name - Component name
   * @returns {boolean} True if component is initialized
   */
  isComponentInitialized(name) {
    const component = this.components.get(name);
    return component ? component.initialized : false;
  }
  
  /**
   * Discover and register available components
   * This should be extended as needed to include your specific components
   */
  discoverComponents() {
    // This is where components would be discovered and registered
    // Implement dynamic discovery or manual registration as needed
    
    // Example:
    // this.registerComponent('navbar', new NavbarComponent());
  }
  
  /**
   * Sets up lazy initialization of components using IntersectionObserver
   * @returns {Promise} Promise that resolves when observer is set up
   * @private
   */
  _setupLazyInitialization() {
    return new Promise((resolve) => {
      // Use requestIdleCallback if available for better performance
      const requestIdleCallback = window.requestIdleCallback || 
        (callback => setTimeout(() => callback({ didTimeout: false }), 0));
      
      requestIdleCallback(() => {
        // Initialize any components that should be loaded immediately
        this._initRemainingComponents();
        
        // Set up IntersectionObserver for lazy loading
        if ('IntersectionObserver' in window) {
          const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const componentName = entry.target.dataset.component;
                if (componentName) {
                  this._initComponent(componentName);
                  observer.unobserve(entry.target);
                }
              }
            });
          }, {
            root: null,
            rootMargin: '0px',
            threshold: this.config.observerThreshold
          });
          
          // Component ID to selector mapping for easier maintenance
          const componentSelectors = {
            hero: '.hero-section',
            spotAI: '#spotAI',
            fightingAI: '#fightAI',
            readMore: '#furtherReading-sec'
          };
          
          // Observe all component containers
          this.components.forEach((component, name) => {
            // Skip already initialized components
            if (component.initialized || name === 'modal' || name === 'navbar') {
              return;
            }
            
            // Get selector from mapping or use ID as fallback
            const selector = componentSelectors[name] || `#${name}`;
            const container = document.querySelector(selector);
            
            if (container) {
              // Store container reference
              component.container = container;
              container.setAttribute('data-component', name);
              container.classList.add('component-unloaded');
              
              // Add aria attributes for accessibility
              container.setAttribute('aria-busy', 'true');
              container.setAttribute('aria-live', 'polite');
              
              // Start observing
              observer.observe(container);
              
              if (this.config.debug) {
                console.log(`🔍 Observing component: ${name} with selector: ${selector}`);
              }
            } else if (this.config.debug) {
              console.warn(`⚠️ Container not found for lazy loading: ${name}`);
            }
          });
          
          // Store observer for cleanup
          this._observer = observer;
          
          // Set up a fallback timeout to init everything if scrolling doesn't happen
          const fallbackTimer = setTimeout(() => {
            if (this.config.debug) {
              console.log('⏱️ Lazy loading fallback timeout - initializing remaining components');
            }
            this._initRemainingComponents();
          }, 5000); // 5 second fallback
          
          this._timers.push(fallbackTimer);
        } else {
          // Fallback for browsers without IntersectionObserver
          this._initRemainingComponents();
        }
        
        resolve();
      }, { timeout: 1000 }); // Wait at most 1s for idle
    });
  }
  
  /**
   * Initialize any components that weren't lazy loaded yet
   * @private
   */
  async _initRemainingComponents() {
    const initPromises = [];
    
    this.components.forEach((component, name) => {
      if (!component.initialized && name !== 'modal' && name !== 'navbar') {
        initPromises.push(this._initComponent(name));
      }
    });
    
    await Promise.allSettled(initPromises);
  }
  
  /**
   * Initialize all components immediately
   * @returns {Promise} Promise that resolves when all components are initialized
   * @private
   */
  async _initAllComponents() {
    const initPromises = [];
    
    for (const [name] of this.components) {
      initPromises.push(this._initComponent(name));
    }
    
    await Promise.allSettled(initPromises);
  }
  
  /**
   * Initialize a specific component
   * @param {string} name - Component name
   * @returns {Promise} Promise that resolves when component is initialized
   * @private
   */
  async _initComponent(name) {
    const component = this.components.get(name);
    if (!component || component.initialized) {
      return Promise.resolve();
    }
    
    try {
      if (component.instance && typeof component.instance.init === 'function') {
        // Add loading state if container exists
        if (component.container) {
          component.container.classList.add('component-loading');
          await new Promise(r => setTimeout(r, 10)); // Small delay for CSS transitions
        }
        
        // Initialize the component
        await component.instance.init();
        component.initialized = true;
        
        // Update container state
        if (component.container) {
          component.container.classList.remove('component-loading');
          component.container.classList.add('component-loaded');
          component.container.setAttribute('aria-busy', 'false');
        }
        
        if (this.config.debug) {
          console.log(`✓ Initialized component: ${name}`);
        }
        
        // Emit event
        eventBus.emit(`component:${name}:initialized`, component);
      }
    } catch (error) {
      console.error(`✗ Error initializing component ${name}:`, error);
      
      // Update container state on error
      if (component.container) {
        component.container.classList.remove('component-loading');
        component.container.classList.add('component-error');
      }
      
      throw error;
    }
  }
  
  /**
   * Log application status
   */
  logStatus() {
    console.group('Application Status');
    console.log(`Ready: ${this.isReady}`);
    console.log(`Initialized: ${this._initialized}`);
    console.log(`Component count: ${this.components.size}`);
    
    console.group('Components');
    this.components.forEach((component, name) => {
      const status = component.initialized ? '✓' : '✗';
      console.log(`${status} ${name}`);
    });
    console.groupEnd();
    
    console.groupEnd();
  }
  
  /**
   * Destroy the application and all components
   */
  destroy() {
    // Clean up observer if it exists
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    
    // Clear any pending timers
    if (this._timers && this._timers.length > 0) {
      this._timers.forEach(timer => {
        clearTimeout(timer);
        clearInterval(timer);
      });
      this._timers = [];
    }
    
    // Destroy all components
    const destroyPromises = [];
    
    // Destroy components in reverse order
    const components = Array.from(this.components.entries()).reverse();
    
    for (const [name, component] of components) {
      if (component.instance && typeof component.instance.destroy === 'function') {
        // Update container state
        if (component.container) {
          component.container.classList.remove('component-loaded', 'component-loading', 'component-unloaded', 'component-error');
          component.container.removeAttribute('data-component');
          component.container.removeAttribute('aria-busy');
        }
        
        // Queue destroy operation
        destroyPromises.push(
          Promise.resolve(component.instance.destroy())
            .then(() => {
              if (this.config.debug) {
                console.log(`♻️  Destroyed component: ${name}`);
              }
            })
            .catch(error => {
              console.error(`❌ Error destroying component ${name}:`, error);
            })
        );
      }
    }
    
    // Clear components
    this.components.clear();
    
    // Reset state
    this.isReady = false;
    this._initialized = false;
    
    // Emit destroyed event
    eventBus.emit('app:destroyed');
    
    // Call parent destroy
    return Promise.allSettled(destroyPromises)
      .then(() => {
        super.destroy();
        return this;
      });
  }
}

// Create and export a singleton instance
const appService = new AppServiceSingleton();
export default appService;
