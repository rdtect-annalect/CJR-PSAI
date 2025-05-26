/**
 * @file dom.js
 * @description DOM utilities for element manipulation and selection
 * @module utils/dom
 */

/**
 * DOM utilities for element selection and manipulation
 */
export const DOM = {
  /**
   * Select element(s) with optional context
   * @param {string} selector - CSS selector
   * @param {Element} context - Context element
   * @param {boolean} all - Whether to select all matching elements
   * @returns {Element|Element[]|null} Selected element(s)
   */
  select(selector, context = document, all = false) {
    return all 
      ? Array.from(context.querySelectorAll(selector))
      : context.querySelector(selector);
  },
  
  /**
   * Create element with optional attributes
   * @param {string} tag - Tag name
   * @param {Object} attrs - Element attributes
   * @returns {Element} Created element
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
  },
  
  /**
   * Add class(es) to element
   * @param {Element} element - Target element
   * @param {...string} classes - Classes to add
   * @returns {Element} Target element
   */
  addClass(element, ...classes) {
    if (!element) return null;
    element.classList.add(...classes);
    return element;
  },
  
  /**
   * Remove class(es) from element
   * @param {Element} element - Target element
   * @param {...string} classes - Classes to remove
   * @returns {Element} Target element
   */
  removeClass(element, ...classes) {
    if (!element) return null;
    element.classList.remove(...classes);
    return element;
  },
  
  /**
   * Toggle class on element
   * @param {Element} element - Target element
   * @param {string} className - Class to toggle
   * @param {boolean} force - Whether to force add/remove
   * @returns {Element} Target element
   */
  toggleClass(element, className, force) {
    if (!element) return null;
    element.classList.toggle(className, force);
    return element;
  },
  
  /**
   * Check if element has class
   * @param {Element} element - Target element
   * @param {string} className - Class to check
   * @returns {boolean} Whether element has class
   */
  hasClass(element, className) {
    return element && element.classList.contains(className);
  },
  
  /**
   * Set or get data attribute
   * @param {Element} element - Target element
   * @param {string} key - Data attribute key
   * @param {*} value - Data attribute value
   * @returns {*} Value if getting, element if setting
   */
  data(element, key, value) {
    if (!element) return null;
    
    const dataKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
    
    if (value === undefined) {
      return element.dataset[key];
    }
    
    element.dataset[key] = value;
    return element;
  },
  
  /**
   * Create intersection observer
   * @param {Element|Element[]} elements - Elements to observe
   * @param {Function} callback - Callback function
   * @param {Object} options - Observer options
   * @returns {IntersectionObserver} Observer instance
   */
  observe(elements, callback, options = {}) {
    const targets = Array.isArray(elements) ? elements : [elements];
    
    const observer = new IntersectionObserver((entries, observer) => {
      callback(entries, observer);
    }, options);
    
    targets.forEach(el => {
      if (el) observer.observe(el);
    });
    
    return observer;
  }
};

export default DOM;