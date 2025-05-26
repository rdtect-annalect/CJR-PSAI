/**
 * @file anime.js
 * @description Direct AnimeJS 4 export with minimal helpers
 */

import anime from './libraries/anime.esm.js';

// Direct export for cleaner imports
export default anime;

// Common animation presets
export const presets = {
  fadeIn: { opacity: [0, 1], duration: 600, easing: 'easeOutCubic' },
  fadeOut: { opacity: [1, 0], duration: 600, easing: 'easeOutCubic' },
  slideUp: { translateY: [30, 0], opacity: [0, 1], duration: 800, easing: 'easeOutExpo' },
  slideDown: { translateY: [-30, 0], opacity: [0, 1], duration: 800, easing: 'easeOutExpo' },
  spring: { easing: 'spring(1, 80, 10, 0)', duration: 800 }
};

// Simple helper for scroll-triggered animations
export function scrollTrigger(targets, animation = presets.slideUp) {
  return anime({
    targets,
    ...animation,
    autoplay: {
      rootMargin: '-100px 0px',
      threshold: 0.1,
      once: true
    }
  });
}
