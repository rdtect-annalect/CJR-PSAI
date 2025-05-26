/**
 * @file dom.js
 * @description DOM manipulation utilities for PSAi components
 */

/**
 * Select one or multiple DOM elements
 * @param {string} selector - CSS selector
 * @param {boolean} all - Whether to select all matching elements
 * @param {Element|Document} context - Context to search in (default: document)
 * @returns {Element|Element[]|null} Single element or array of elements
 */
export const $ = (selector, all = false, context = document) => 
  all ? [...context.querySelectorAll(selector)] : context.querySelector(selector);

/**
 * Create a DOM element with attributes
 * @param {string} tag - Tag name
 * @param {Object} attrs - Element attributes
 * @returns {Element} Created element
 */
export const create = (tag, attrs = {}) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, value]) => {
    if (key === 'text') el.textContent = value;
    else if (key === 'html') el.innerHTML = value;
    else if (key === 'class') el.className = value;
    else if (key === 'style') Object.assign(el.style, value);
    else el.setAttribute(key, value);
  });
  return el;
};

/**
 * Create an IntersectionObserver and observe elements
 * @param {Element|Element[]} elements - Elements to observe
 * @param {Function} callback - IntersectionObserver callback
 * @param {Object} options - IntersectionObserver options
 * @returns {IntersectionObserver} Created observer
 */
export const observe = (elements, callback, options = {}) => {
  const observer = new IntersectionObserver(callback, options);
  [].concat(elements).forEach(el => el && observer.observe(el));
  return observer;
};

/**
 * Check if an element exists in the DOM
 * @param {string|Element} element - Element or selector
 * @returns {boolean} Whether the element exists
 */
export const exists = (element) => {
  if (!element) return false;
  if (typeof element === 'string') return !!$(element);
  return element instanceof Element && document.contains(element);
};

export default { $, create, observe, exists };

/**
 * Create a scroll observer for navbar hide/show
 * @param {Function} callback - Callback function that receives scroll direction
 * @returns {Object} Observer object with disconnect method
 */
export const createScrollObserver = (callback) => {
  let lastScrollY = window.scrollY;
  let ticking = false;

  const updateScrollDirection = () => {
    const scrollY = window.scrollY;
    const direction = scrollY > lastScrollY ? 'down' : 'up';
    
    if (scrollY !== lastScrollY) {
      callback(direction, scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    }
    
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollDirection);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  return {
    disconnect: () => {
      window.removeEventListener('scroll', onScroll);
    }
  };
};

/**
 * Create section intersection observer for nav links
 * @param {string[]} sectionIds - Array of section IDs to observe
 * @param {Function} callback - Callback function that receives active section ID
 * @returns {IntersectionObserver} Observer instance
 */
export const createSectionObserver = (sectionIds, callback) => {
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry.target.id);
      }
    });
  }, observerOptions);

  // Observe all sections
  sectionIds.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      observer.observe(element);
    }
  });

  return observer;
};