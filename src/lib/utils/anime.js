/**
 * @file anime.js
 * @description Animation utilities built on AnimeJS 4 for PSAi components
 */

import * as animeModule from '../libraries/anime.esm.js';

// Extract the functions we need from the module
const { 
  animate, 
  createSpring, 
  createTimeline,
  utils 
} = animeModule;

// Create a compatibility function for v3 style anime calls
const anime = (params) => {
  const { targets, ...options } = params;
  return animate(targets, options);
};

/**
 * Common animation presets
 * @type {Object}
 */
export const presets = {
  fadeIn: { opacity: { to: 1, from: 0 }, duration: 600, ease: 'outCubic' },
  fadeOut: { opacity: { to: 0, from: 1 }, duration: 600, ease: 'outCubic' },
  slideUp: { translateY: { to: 0, from: 30 }, opacity: { to: 1, from: 0 }, duration: 800, ease: 'outExpo' },
  slideDown: { translateY: { to: 0, from: -30 }, opacity: { to: 1, from: 0 }, duration: 800, ease: 'outExpo' },
  spring: { ease: createSpring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 }), duration: 800 },
  pulse: { scale: [{ to: 1 }, { to: 1.05 }, { to: 1 }], duration: 1500, ease: 'inOutQuad', loop: true }
};

/**
 * Create a scroll-triggered animation
 * @param {Object} params - Animation parameters
 * @param {string|Element|Element[]} params.targets - Animation targets
 * @param {Object} params.animation - Animation preset (default: slideUp)
 * @param {number} params.threshold - Intersection threshold (default: 0.1)
 * @param {string} params.rootMargin - Root margin for intersection (default: '-100px 0px')
 * @param {boolean} params.once - Whether to run only once (default: true)
 * @returns {Object} Animation instance
 */
export function scrollTrigger({
  targets,
  animation = presets.slideUp,
  threshold = 0.1,
  rootMargin = '-100px 0px',
  once = true
} = {}) {
  // Create intersection observer to trigger animation
  const elements = typeof targets === 'string' ? document.querySelectorAll(targets) : targets;
  const elementsArray = Array.from(elements.length ? elements : [elements]);
  
  // Set initial state (invisible)
  elementsArray.forEach(el => {
    if (animation.opacity && animation.opacity.from !== undefined) {
      el.style.opacity = animation.opacity.from;
    }
  });
  
  // Create observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Start animation
        animate(entry.target, animation);
        
        // Unobserve if only running once
        if (once) {
          observer.unobserve(entry.target);
        }
      }
    });
  }, { threshold, rootMargin });
  
  // Observe elements
  elementsArray.forEach(el => observer.observe(el));
  
  // Return a control object
  return {
    observer,
    elements: elementsArray,
    dispose: () => elementsArray.forEach(el => observer.unobserve(el))
  };
}

/**
 * Create a spring animation
 * @param {string|Element|Element[]} targets - Animation targets
 * @param {Object} params - Animation parameters
 * @returns {Object} Animation instance
 */
export function spring(targets, params = {}) {
  return animate(targets, {
    ease: createSpring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 }),
    duration: 800,
    ...params
  });
}

// Export everything for use in the application
export { animate, createTimeline, createSpring };
export { utils };
export { anime };
