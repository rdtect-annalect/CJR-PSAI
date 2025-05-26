/**
 * @file ParallaxVideo.js
 * @description Smooth parallax effects for background videos
 */

import BaseComponent from '../base/BaseComponent.js';

export default class ParallaxVideo extends BaseComponent {
  constructor(config = {}) {
    super(config);
    this.config = {
      speed: 0.5,           // Parallax speed (0-1)
      threshold: 0.1,       // When to start/stop effect
      ...config
    };
    this.videos = [];
    this.ticking = false;
  }

  async init() {
    try {
      // Find all background videos
      this.videos = Array.from(document.querySelectorAll('.bg-video'));
      
      if (this.videos.length === 0) {
        console.log('[ParallaxVideo] No background videos found');
        return this;
      }

      console.log(`[ParallaxVideo] Found ${this.videos.length} videos for parallax`);
      
      // Set up scroll listener
      this.on(window, 'scroll', () => this.handleScroll(), { passive: true });
      
      // Initial position update
      this.updateParallax();
      
      return this;
    } catch (error) {
      console.error('Failed to initialize ParallaxVideo:', error);
      return this;
    }
  }

  handleScroll() {
    if (!this.ticking) {
      requestAnimationFrame(() => this.updateParallax());
      this.ticking = true;
    }
  }

  updateParallax() {
    const scrollTop = window.pageYOffset;
    const windowHeight = window.innerHeight;

    this.videos.forEach(video => {
      const rect = video.getBoundingClientRect();
      const videoTop = rect.top + scrollTop;
      const videoHeight = rect.height;
      
      // Check if video is in viewport
      const isInViewport = (
        rect.bottom >= -windowHeight * this.config.threshold &&
        rect.top <= windowHeight * (1 + this.config.threshold)
      );

      if (isInViewport) {
        // Calculate parallax offset
        const progress = (scrollTop - videoTop + windowHeight) / (videoHeight + windowHeight);
        const yPos = (scrollTop - videoTop) * this.config.speed;
        
        // Apply transform with hardware acceleration
        video.style.transform = `translate3d(0, ${yPos}px, 0)`;
      }
    });

    this.ticking = false;
  }

  destroy() {
    // Reset video positions
    this.videos.forEach(video => {
      video.style.transform = '';
    });
    
    super.destroy();
  }
}
