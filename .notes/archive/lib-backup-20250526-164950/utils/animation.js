/**
 * @file animation.js
 * @description Animation utilities using AnimeJS v4 for UI effects and parallax
 * @module utils/animation
 */

import anime from '../libraries/anime.esm.js';

/**
 * Animation utilities for common UI effects
 * @see https://animejs.com/documentation/ for v4 documentation
 */
export const Animation = {
  /**
   * Create a standard animation with AnimeJS
   * @param {Element|string} targets - Elements to animate
   * @param {Object} params - Animation parameters
   * @returns {Object} AnimeJS instance
   */
  create(targets, params = {}) {
    return anime({
      targets,
      ...params
    });
  },
  
  /**
   * Create a spring-based animation for natural motion
   * @param {Element|string} targets - Elements to animate
   * @param {Object} params - Animation parameters
   * @returns {Object} AnimeJS instance
   */
  spring(targets, params = {}) {
    return anime({
      targets,
      easing: 'spring(1, 80, 10, 0)',
      ...params
    });
  },
  
  /**
   * Fade in element(s) using v4 keyframes
   * @param {Element|string} targets - Elements to animate
   * @param {Object} options - Animation options
   * @returns {Object} AnimeJS instance
   */
  fadeIn(targets, options = {}) {
    return anime({
      targets,
      keyframes: {
        opacity: [0, 1]
      },
      duration: 600,
      easing: 'easeOutCubic',
      ...options
    });
  },
  
  /**
   * Fade out element(s) using v4 keyframes
   * @param {Element|string} targets - Elements to animate
   * @param {Object} options - Animation options
   * @returns {Object} AnimeJS instance
   */
  fadeOut(targets, options = {}) {
    return anime({
      targets,
      keyframes: {
        opacity: [1, 0]
      },
      duration: 600,
      easing: 'easeOutCubic',
      ...options
    });
  },
  
  /**
   * Slide in element(s) from a direction using v4 keyframes
   * @param {Element|string} targets - Elements to animate
   * @param {string} direction - Direction ('up', 'down', 'left', 'right')
   * @param {Object} options - Animation options
   * @returns {Object} AnimeJS instance
   */
  slideIn(targets, direction = 'up', options = {}) {
    const distance = options.distance || 50;
    const keyframes = {
      opacity: [0, 1]
    };
    
    switch (direction) {
      case 'up':
        keyframes.translateY = [distance, 0];
        break;
      case 'down':
        keyframes.translateY = [-distance, 0];
        break;
      case 'left':
        keyframes.translateX = [distance, 0];
        break;
      case 'right':
        keyframes.translateX = [-distance, 0];
        break;
    }
    
    return anime({
      targets,
      keyframes,
      duration: 800,
      easing: 'easeOutExpo',
      ...options
    });
  },
  
  /**
   * Setup parallax effect on element(s)
   * @param {Element|string} targets - Elements to apply parallax to
   * @param {Object} options - Parallax options
   * @returns {Function} Cleanup function
   */
  parallax(targets, options = {}) {
    const elements = typeof targets === 'string' 
      ? document.querySelectorAll(targets) 
      : [].concat(targets);
    
    if (!elements.length) return () => {};
    
    const defaults = {
      speed: 0.2,
      direction: 'y',
      clamp: true,
      reverse: false,
      rootMargin: '0px',
      threshold: 0
    };
    
    const config = { ...defaults, ...options };
    
    // Create intersection observer to only animate when visible
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.dataset.parallaxActive = true;
        } else {
          entry.target.dataset.parallaxActive = false;
        }
      });
    }, {
      rootMargin: config.rootMargin,
      threshold: config.threshold
    });
    
    // Setup each element for parallax
    elements.forEach(el => {
      el.style.willChange = 'transform';
      observer.observe(el);
    });
    
    // Scroll handler
    const handleScroll = () => {
      elements.forEach(el => {
        if (el.dataset.parallaxActive !== 'true') return;
        
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const scrollPercent = (rect.top + rect.height / 2) / viewportHeight;
        const factor = config.reverse ? -1 : 1;
        const offset = scrollPercent * config.speed * 100 * factor;
        
        if (config.direction === 'y' || config.direction === 'both') {
          el.style.transform = `translateY(${offset}px)`;
        } else if (config.direction === 'x') {
          el.style.transform = `translateX(${offset}px)`;
        } else if (config.direction === 'both') {
          el.style.transform = `translate(${offset / 2}px, ${offset}px)`;
        }
      });
    };
    
    // Attach scroll listener using passive event for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();
    
    // Return cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      elements.forEach(el => {
        el.style.willChange = '';
        el.style.transform = '';
        delete el.dataset.parallaxActive;
      });
    };
  },
  
  /**
   * Setup scroll-triggered animations using AnimeJS v4 ScrollObserver
   * @param {Element|string} targets - Elements to animate
   * @param {Object} options - Animation options
   * @returns {Object} Animation instance and cleanup function
   */
  scrollTrigger(targets, options = {}) {
    const defaults = {
      keyframes: {
        opacity: [0, 1],
        translateY: [30, 0]
      },
      duration: 800,
      easing: 'easeOutCubic',
      threshold: 0.1,
      rootMargin: '-100px 0px',
      once: true
    };
    
    const config = { ...defaults, ...options };
    
    // Create animation with ScrollObserver for autoplay
    const animation = anime({
      targets,
      keyframes: config.keyframes || config.animation || defaults.keyframes,
      duration: config.duration,
      easing: config.easing,
      autoplay: {
        // Use ScrollObserver for scroll-based animations
        rootMargin: config.rootMargin,
        threshold: config.threshold,
        once: config.once
      }
    });
    
    // Return animation and cleanup function
    return {
      animation,
      cleanup: () => {
        animation.pause();
        // Remove scroll observer
        animation.autoplay = false;
      }
    };
  },
  
  /**
   * Create a sequence of animations triggered by scroll
   * @param {Object} options - Timeline options
   * @returns {Object} Timeline instance
   */
  scrollSequence(options = {}) {
    const timeline = anime.timeline({
      autoplay: {
        rootMargin: options.rootMargin || '-100px 0px',
        threshold: options.threshold || 0.1,
        once: options.once !== undefined ? options.once : true
      },
      duration: options.duration || 800,
      easing: options.easing || 'easeOutCubic',
      playbackEase: options.playbackEase || 'easeOutCubic' // New v4 feature for timeline keyframe positioning
    });
    
    return timeline;
  }
};

export default Animation;