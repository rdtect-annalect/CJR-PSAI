/**
 * @file ScrollAnimations.js
 * @description Smooth scroll-triggered animations using AnimeJS 4
 */

import BaseComponent from '../base/BaseComponent.js';
import { animate, presets } from '../../utils/anime.js';

export default class ScrollAnimations extends BaseComponent {
  constructor(config = {}) {
    super(config);
    this.config = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px',
      ...config
    };
    this.observers = [];
  }

  async init() {
    try {
      this.setupScrollTriggers();
      console.log('[ScrollAnimations] Initialized scroll-triggered animations');
      return this;
    } catch (error) {
      console.error('Failed to initialize ScrollAnimations:', error);
      return this;
    }
  }

  setupScrollTriggers() {
    // Different animation types for different elements
    const animationConfigs = [
      {
        selector: '.card, .text-content',
        animation: presets.slideUp,
        stagger: 200
      },
      {
        selector: '.read-more-card',
        animation: {
          ...presets.slideUp,
          scale: { to: 1, from: 0.9 }
        },
        stagger: 150
      },
      {
        selector: '.btn, .carousel-btn',
        animation: {
          ...presets.fadeIn,
          scale: { to: 1, from: 0.8 }
        },
        stagger: 100
      }
    ];

    animationConfigs.forEach(config => {
      this.setupElementAnimations(config);
    });
  }

  setupElementAnimations({ selector, animation, stagger = 0 }) {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay
          const delay = stagger ? index * stagger : 0;
          
          animate(entry.target, {
            ...animation,
            delay: delay
          });
          
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: this.config.threshold,
      rootMargin: this.config.rootMargin
    });

    // Observe all elements
    elements.forEach(element => {
      observer.observe(element);
    });

    // Store observer for cleanup
    this.observers.push(observer);
  }

  destroy() {
    // Disconnect all observers
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    
    super.destroy();
  }
}
