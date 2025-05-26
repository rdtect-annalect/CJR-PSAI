/**
 * HeroComponent - Hero section animations
 * Manages animations for the hero section including floating elements
 */
import BaseComponent from "../../components/base/BaseComponent.js";
import { Animation } from "../../utils/animation.js";
import { DOM } from "../../utils/dom.js";
import appService from "../../services/AppService.js";
import eventBus from '../../services/EventBus.js';

/**
 * Hero component for managing hero section animations
 * @extends BaseComponent
 */
export class HeroComponent extends BaseComponent {
  /**
   * Create a new HeroComponent instance
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    super({
      topGifSelector: ".coders-gifs .top-img",
      bottomGifSelector: ".coders-gifs .bottom-img",
      logoSelector: ".the-PSAI img",
      animationClass: {
        topGif: "float-animation",
        bottomGif: "float-animation",
        logo: "pulse"
      },
      floatIntensity: 15, // pixels
      floatDuration: 15000, // ms
      hoverScale: 1.1,
      hoverDuration: 300, // ms
      ...config
    });

    this.stylesAdded = false;
    this.animationInstances = [];
  }

  /**
   * Initialize the hero animations
   * @returns {Promise} Promise that resolves when initialization is complete
   */
  init() {
    // Call parent init which returns a Promise
    return super.init().then(() => {
      // Find elements
      this.findElements();
      
      // Add animation styles
      this.addStyles();
      
      // Start animations
      this.startAnimations();
      
      // Add scroll listener to handle animation based on scroll position
      this.setupScrollListener();
      
      // Emit initialized event
      this.emit("hero:initialized");
      
      return this;
    });
  }

  /**
   * Find hero elements
   */
  findElements() {
    this.elements = {
      topGif: document.querySelector(this.config.topGifSelector),
      bottomGif: document.querySelector(this.config.bottomGifSelector),
      logo: document.querySelector(this.config.logoSelector)
    };
    
    // Debug: Log found elements
    console.log('Hero elements found:', {
      topGif: this.elements.topGif ? 'Found' : 'Not found',
      bottomGif: this.elements.bottomGif ? 'Found' : 'Not found',
      logo: this.elements.logo ? 'Found' : 'Not found',
      config: this.config
    });
  }

  /**
   * Add animation styles if not already present
   */
  addStyles() {
    if (this.stylesAdded) return;

    const styleId = "hero-animation-styles";
    if (document.getElementById(styleId)) {
      this.stylesAdded = true;
      return;
    }

    const styleEl = document.createElement("style");
    styleEl.id = styleId;

    styleEl.textContent = `
      /* Base animations */
      @keyframes float {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        25% { transform: translate(5px, -5px) rotate(0.5deg); }
        50% { transform: translate(-5px, 5px) rotate(-0.5deg); }
        75% { transform: translate(-5px, -5px) rotate(0.5deg); }
      }
      
      @keyframes pulse {
        0% { transform: scale(1); opacity: 0.9; }
        50% { transform: scale(1.03); opacity: 1; }
        100% { transform: scale(1); opacity: 0.9; }
      }
      
      .float-animation {
        will-change: transform;
        transition: transform ${this.config.hoverDuration}ms ease-out;
      }
      
      .float-animation:hover {
        transform: scale(${this.config.hoverScale}) !important;
      }
      
      .pulse-animation {
        animation: pulse 3s ease-in-out infinite;
      }
    `;

    document.head.appendChild(styleEl);
    this.stylesAdded = true;
  }

  /**
   * Start hero animations
   */
  startAnimations() {
    const { topGif, bottomGif, logo } = this.elements;
    const { floatIntensity, floatDuration } = this.config;
    
    console.log('Starting hero animations...', { topGif, bottomGif, logo });

    // Add base animation classes
    [topGif, bottomGif].forEach(el => {
      if (el) el.classList.add('float-animation');
    });
    
    if (logo) logo.classList.add('pulse-animation');
    
    // Initialize AnimeJS animations with random parameters
    const elements = [
      { el: topGif, baseX: 0, baseY: -40 }, // Move top gif higher
      { el: bottomGif, baseX: 0, baseY: 0 }
    ];
    
    elements.forEach(({ el, baseX, baseY }) => {
      if (!el) return;
      
      // Randomize animation parameters
      const duration = floatDuration * (0.8 + Math.random() * 0.4); // 80-120% of base duration
      const intensity = floatIntensity * (0.8 + Math.random() * 0.4); // 80-120% of base intensity
      
      const animate = () => {
        const instance = window.anime({
          targets: el,
          translateX: [
            { value: baseX + (Math.random() * 2 - 1) * intensity },
            { value: baseX + (Math.random() * 2 - 1) * intensity },
            { value: baseX }
          ],
          translateY: [
            { value: baseY + (Math.random() * 2 - 1) * intensity },
            { value: baseY + (Math.random() * 2 - 1) * intensity },
            { value: baseY }
          ],
          rotate: [
            { value: (Math.random() * 2 - 1) * 2 },
            { value: (Math.random() * 2 - 1) * 2 },
            { value: 0 }
          ],
          duration: duration,
          easing: 'easeInOutSine',
          loop: true,
          direction: 'alternate'
        });
        
        this.animationInstances.push(instance);
      };
      
      // Wait for images to load
      if (el.complete) {
        animate();
      } else {
        el.addEventListener('load', animate);
      }
    });
    
    // Emit animation started event
    this.emit("hero:animationStarted");
  }

  /**
   * Stop hero animations
   */
  stopAnimations() {
    const { topGif, bottomGif, logo } = this.elements;
    const animClass = this.config.animationClass;

    if (topGif) {
      topGif.classList.remove(animClass.topGif);
    }

    if (bottomGif) {
      bottomGif.classList.remove(animClass.bottomGif);
    }

    if (logo) {
      logo.classList.remove(animClass.logo);
    }
    
    // Emit animation stopped event
    this.emit("hero:animationStopped");
  }

  /**
   * Set up scroll listener to adjust animations based on scroll position
   */
  setupScrollListener() {
    const scrollHandler = this.createThrottle(() => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroSection = document.getElementById('hero');
      
      if (!heroSection) return;
      
      const heroHeight = heroSection.offsetHeight;
      const scrollPercentage = Math.min(scrollY / heroHeight, 1);
      
      // If scrolled more than 80% of hero height, fade out animations
      if (scrollPercentage > 0.8) {
        this.elements.topGif?.style.setProperty('opacity', `${1 - (scrollPercentage - 0.8) * 5}`);
        this.elements.bottomGif?.style.setProperty('opacity', `${1 - (scrollPercentage - 0.8) * 5}`);
      } else {
        this.elements.topGif?.style.setProperty('opacity', '1');
        this.elements.bottomGif?.style.setProperty('opacity', '1');
      }
      
      // Emit scroll event
      this.emit("hero:scroll", { scrollPercentage });
    }, 100);
    
    this.addSafeEventListener(window, "scroll", scrollHandler, { passive: true });
  }

  /**
   * Pause animations (for when tab is inactive)
   * Override from BaseComponent
   */
  pause() {
    // Pause animations by adding a class that sets animation-play-state: paused
    document.querySelectorAll('.hero-float-animation-1, .hero-float-animation-2, .hero-pulse-animation')
      .forEach(el => el.style.animationPlayState = 'paused');
  }

  /**
   * Resume animations
   * Override from BaseComponent
   */
  resume() {
    // Resume animations
    document.querySelectorAll('.hero-float-animation-1, .hero-float-animation-2, .hero-pulse-animation')
      .forEach(el => el.style.animationPlayState = 'running');
  }

  /**
   * Clean up hero component
   * Override from BaseComponent
   */
  destroy() {
    // Clean up animations
    this.animationInstances.forEach(instance => {
      if (instance) instance.pause();
    });
    this.animationInstances = [];
    
    // Remove event listeners and classes
    const { topGif, bottomGif, logo } = this.elements;
    [topGif, bottomGif, logo].forEach(el => {
      if (el) {
        el.removeEventListener('mouseenter', this.handleHover);
        el.removeEventListener('mouseleave', this.handleHoverEnd);
        el.style.transform = '';
      }
    });
    
    // Remove added styles
    if (this.stylesAdded) {
      const styleEl = document.getElementById("hero-animation-styles");
      if (styleEl && styleEl.parentNode) {
        styleEl.parentNode.removeChild(styleEl);
      }
      this.stylesAdded = false;
    }
    
    // Call parent destroy to clean up event listeners
    super.destroy();
  }
}

export default HeroComponent;
