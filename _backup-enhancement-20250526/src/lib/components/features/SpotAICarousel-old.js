/**
 * SpotAICarousel - Interactive carousel for the Spot AI section
 * Manages image carousel with animations and modal integration
 */
import BaseComponent from "../base/BaseComponent.js";
import { $, create } from "../../utils/dom.js";
import { loadCached } from "../../utils/data.js";
import { animate } from "../../utils/anime.js";
import events from "../../services/EventBus.js";

/**
 * SpotAI Carousel component for showcasing Spot AI capabilities
 * @extends BaseComponent
 */
export class SpotAICarousel extends BaseComponent {
  /**
   * Create a new SpotAICarousel instance
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    super({
      containerSelector: "#spotAI",
      carouselSelector: "#spot-ai-carousel",
      prevBtnSelector: ".prev",
      nextBtnSelector: ".next",
      activeBtnClass: "active",
      activeCardClass: "active",
      transitionDuration: 500, // ms
      autoPlayInterval: 5000, // ms
      enableAutoPlay: true,
      pauseOnHover: true,
      showModalOnClick: true,
      modalId: "spotai-modal",
      dataPath: "/src/data/carouselData.json",
      slidesToShow: 5, // Default number of slides to show
      slidesToScroll: 1, // Default number of slides to scroll
      ...config,
    });
    
    // Data storage
    this.carouselData = [];
    this.observers = [];
    this.pages = [];
    this.dots = [];

    // Component state
    this.currentPage = 0;
    this.pageCount = 0;
    this.isTransitioning = false;
    this.isPlaying = false;
    this.autoPlayTimer = null;
    this._wasPlayingBeforeHidden = false;

    // Bind methods
    this.goToSlide = this.goToSlide.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.updateTrackPosition = this.updateTrackPosition.bind(this);
    this.handleDotClick = this.handleDotClick.bind(this);
    this.handleCardClick = this.handleCardClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.startAutoPlay = this.startAutoPlay.bind(this);
    this.stopAutoPlay = this.stopAutoPlay.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  /**
   * Initialize component
   * @returns {Promise} Resolves when initialization is complete
   */
  async init() {
    // Find carousel container
    this.container = $(this.config.containerSelector);
    this.carousel = $(this.config.carouselSelector);
    
    if (!this.container || !this.carousel) {
      console.error("SpotAICarousel: Could not find container or carousel element");
      return Promise.reject(new Error("Could not find container or carousel element"));
    }
    
    // Read carousel configuration from data attribute
    this.readDataConfiguration();
    
    // Add intersection observer for autoplay management
    this.setupIntersectionObserver();
    
    // Load carousel data
    await this.loadCarouselData();
    
    // Setup navigation
    this.setupNavigation();
    
    // Create and populate carousel
    this.populateCarousel();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Start autoplay if enabled
    if (this.config.enableAutoPlay) {
      this.startAutoPlay();
    }
    
    return Promise.resolve(this);
  }
  
  /**
   * Read carousel configuration from data-carousel attribute
   */
  readDataConfiguration() {
    const dataConfig = this.carousel.getAttribute('data-carousel');
    
    if (dataConfig) {
      try {
        // Parse JSON configuration
        const parsedConfig = JSON.parse(dataConfig);
        
        // Update configuration with data attribute values
        this.config = {
          ...this.config,
          slidesToShow: parsedConfig.slidesToShow || this.config.slidesToShow,
          slidesToScroll: parsedConfig.slidesToScroll || this.config.slidesToScroll,
          enableAutoPlay: parsedConfig.autoplay !== undefined ? parsedConfig.autoplay : this.config.enableAutoPlay,
          autoPlayInterval: parsedConfig.autoplaySpeed || this.config.autoPlayInterval
        };
        
        console.log('Carousel configuration:', this.config);
      } catch (error) {
        console.error('Error parsing carousel data attribute:', error);
      }
    }
  }

  /**
   * Setup intersection observer to pause/resume autoplay when carousel is not visible
   */
  setupIntersectionObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.resume();
          } else {
            this.pause();
          }
        });
      },
      { threshold: 0.2 }
    );
    
    observer.observe(this.container);
    this.observers.push(observer);
  }

  /**
   * Load carousel data
   * @returns {Promise} Resolves with carousel data
   */
  async loadCarouselData() {
    try {
      // Provide some fallback data in case we can't load from JSON
      const fallbackData = [
        {
          title: "Check for hands and fingers",
          subtitle: "AI often struggles with realistic hand details",
          description: "Look for extra fingers, unnatural positions, or distorted hands",
          images: {
            small: "assets/images/spot-ai/small/1.png",
            medium: "assets/images/spot-ai/large/1.png"
          }
        },
        {
          title: "Look at facial features",
          subtitle: "Check for asymmetry in faces",
          description: "Look for uneven eyes, strange skin textures, or unnatural expressions",
          images: {
            small: "assets/images/spot-ai/small/2.png",
            medium: "assets/images/spot-ai/large/2.png"
          }
        },
        {
          title: "Scan the background",
          subtitle: "Background elements often have errors",
          description: "Look for blurry or distorted background elements",
          images: {
            small: "assets/images/spot-ai/small/3.png",
            medium: "assets/images/spot-ai/large/3.png"
          }
        },
        {
          title: "Spot contextual errors",
          subtitle: "Check if elements match the context",
          description: "Look for elements that don't fit the scene or make logical sense",
          images: {
            small: "assets/images/spot-ai/small/4.png",
            medium: "assets/images/spot-ai/large/4.png"
          }
        },
        {
          title: "Look for distorted logos or text",
          subtitle: "AI struggles with text and logos",
          description: "Check for garbled text, warped logos, or inconsistent branding",
          images: {
            small: "assets/images/spot-ai/small/5.png",
            medium: "assets/images/spot-ai/large/5.png"
          }
        }
      ];
      
      try {
        // Try to load from the specified path
        const data = await loadCached(this.config.dataPath);
        
        if (data && Array.isArray(data)) {
          console.log("Successfully loaded carousel data from:", this.config.dataPath);
          this.carouselData = data;
          return data;
        } else {
          console.warn("Invalid carousel data format, using fallback data");
          this.carouselData = fallbackData;
          return fallbackData;
        }
      } catch (loadError) {
        // If there's an error loading from the path, use fallback data
        console.warn("Couldn't load carousel data, using fallback data:", loadError);
        this.carouselData = fallbackData;
        return fallbackData;
      }
    } catch (error) {
      console.error("Error in loadCarouselData:", error);
      return Promise.reject(error);
    }
  }

  /**
   * Setup navigation elements
   */
  setupNavigation() {
    // Find navigation buttons
    this.prevBtn = this.container.querySelector(this.config.prevBtnSelector);
    this.nextBtn = this.container.querySelector(this.config.nextBtnSelector);
    
    // Add event listeners to buttons
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", this.goToPrev);
    }
    
    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", this.goToNext);
    }
  }

  /**
   * Populate carousel with items
   * @returns {number} Number of carousel items
   */
  populateCarousel() {
    if (!this.carousel || !this.carouselData || !this.carouselData.length) {
      console.warn("Cannot populate carousel: missing element or data");
      return 0;
    }
    
    // Clear carousel content
    this.carousel.innerHTML = "";
    
    // Create track wrapper (the rail that holds all slides)
    const trackWrapper = create("div", { className: "carousel-track" });
    this.carousel.appendChild(trackWrapper);
    
    // Create dots container
    const dotsContainer = create("div", { className: "slider-dots" });
    
    // Find controls container
    let controlsContainer = this.container.querySelector(".carousel-controls");
    if (controlsContainer) {
      // Insert dots between dash and next button
      const dash = controlsContainer.querySelector(".dash");
      if (dash && dash.nextSibling) {
        controlsContainer.insertBefore(dotsContainer, dash.nextSibling);
      } else {
        controlsContainer.appendChild(dotsContainer);
      }
    }
    
    // For rail-style layout, we create all slides in a single track
    this.slides = [];
    this.dots = [];
    
    // Calculate how many pages/screens we'll have
    const slidesToShow = this.config.slidesToShow || 5;
    const totalPages = Math.ceil(this.carouselData.length / slidesToShow);
    
    // Create all slides
    this.carouselData.forEach((item, index) => {
      // Create card/slide
      const slide = create("div", {
        className: "spot-ai-card",
        attributes: {
          "data-slide-index": index,
          "data-title": item.title,
          "data-subtitle": item.subtitle || "",
          "data-description": item.description || "",
          "aria-hidden": index < slidesToShow ? "false" : "true"
        }
      });
      
      // Create card content with TIP label like in reference image
      slide.innerHTML = `
        <div class="spot-ai-card-inner">
          <div class="spot-ai-card-header">
            <h3>TIP ${(index % 10) + 1}</h3>
          </div>
          <div class="spot-ai-card-image">
            <img src="${item.images?.small}" alt="${item.title}" loading="${index < slidesToShow ? "eager" : "lazy"}">
          </div>
          <div class="spot-ai-card-content">
            <p>${item.title}</p>
          </div>
        </div>
      `;
      
      // Add click handler
      slide.addEventListener("click", () => this.handleCardClick(slide, item));
      
      // Add to track
      trackWrapper.appendChild(slide);
      this.slides.push(slide);
    });
    
    // Create navigation dots (one for each page)
    for (let i = 0; i < totalPages; i++) {
      const dot = create("button", {
        className: `slider-dot ${i === 0 ? this.config.activeBtnClass : ""}`,
        attributes: {
          "type": "button",
          "aria-label": `Go to page ${i + 1}`,
          "aria-selected": i === 0 ? "true" : "false",
          "data-page": i
        }
      });
      
      // Add click handler to go to page
      dot.addEventListener("click", () => {
        const pageIndex = i;
        const slideIndex = pageIndex * this.config.slidesToShow;
        this.goToSlide(slideIndex);
      });
      
      // Add to dots container
      dotsContainer.appendChild(dot);
      this.dots.push(dot);
    }
    
    // Set initial state
    this.currentSlide = 0;
    this.slideCount = this.carouselData.length;
    this.pageCount = totalPages;
    
    // Apply initial styles for rail layout
    this.updateTrackPosition();
    
    return this.carouselData.length;
  }

  /**
   * Setup event listeners
   */
  setupEventListeners() {
    // Mouse enter/leave for pause on hover
    if (this.config.pauseOnHover) {
      this.carousel.addEventListener("mouseenter", this.handleMouseEnter);
      this.carousel.addEventListener("mouseleave", this.handleMouseLeave);
    }
    
    // Visibility change for pausing when tab is not active
    document.addEventListener("visibilitychange", this.handleVisibilityChange);
    
    // Add to cleanup
    this.track(() => {
      this.carousel.removeEventListener("mouseenter", this.handleMouseEnter);
      this.carousel.removeEventListener("mouseleave", this.handleMouseLeave);
      document.removeEventListener("visibilitychange", this.handleVisibilityChange);
    });
  }

  /**
   * Handle dot click
   * @param {number} index Index of dot clicked
   */
  handleDotClick(index) {
    // Calculate the slide index based on the page index
    const slideIndex = index * this.config.slidesToShow;
    this.goToSlide(slideIndex);
  }

  /**
   * Handle card click
   * @param {HTMLElement} card Card element clicked
   * @param {Object} item Data item for card
   */
  handleCardClick(card, item) {
    if (this.config.showModalOnClick) {
      // Emit event for modal to handle
      eventBus.emit("spotai:cardClick", { card, item });
    }
  }

  /**
   * Updates the track position based on current slide
   * This method positions the rail to show the current slide
   */
  updateTrackPosition() {
    const track = this.carousel.querySelector('.carousel-track');
    if (!track) return;
    
    // Get card width including margin
    const card = track.querySelector('.spot-ai-card');
    if (!card) return;
    
    const cardStyles = window.getComputedStyle(card);
    const cardWidth = card.offsetWidth + 
                    parseFloat(cardStyles.marginLeft) + 
                    parseFloat(cardStyles.marginRight);
    
    // Calculate the translation distance based on current slide
    const translateX = -1 * this.currentSlide * cardWidth;
    
    // Apply smooth transition for animation
    track.style.transition = `transform ${this.config.transitionDuration}ms ease`;
    track.style.transform = `translateX(${translateX}px)`;
    
    // Update the visibility state of slides
    const slidesToShow = this.config.slidesToShow;
    this.slides.forEach((slide, index) => {
      const isVisible = (index >= this.currentSlide && 
                      index < this.currentSlide + slidesToShow);
      
      slide.setAttribute('aria-hidden', isVisible ? 'false' : 'true');
      if (isVisible) {
        slide.classList.add('visible');
      } else {
        slide.classList.remove('visible');
      }
    });
  }
  
  /**
   * Go to specific slide
   * @param {number} index Index of slide to go to
   * @param {boolean} animate Whether to animate the transition
   */
  goToSlide(index, animate = true) {
    if (this.isTransitioning) return;
    
    // Handle wrapping
    const slideIndex = Math.max(0, Math.min(index, this.slideCount - this.config.slidesToShow));
    
    // Don't do anything if already on this slide
    if (slideIndex === this.currentSlide) return;
    
    // Start transition
    this.isTransitioning = true;
    
    // Calculate which page/dot should be active
    const pageIndex = Math.floor(slideIndex / this.config.slidesToShow);
    
    // Update active dot
    this.updateDots(pageIndex);
    
    // Update current slide
    this.currentSlide = slideIndex;
    
    // Update the track position
    this.updateTrackPosition();
    
    // Reset transition after animation
    setTimeout(() => {
      this.isTransitioning = false;
      
      // Emit slide change event
      eventBus.emit("spotai:slideChange", {
        currentSlide: this.currentSlide,
        slideElement: this.slides[this.currentSlide]
      });
    }, animate ? this.config.transitionDuration : 0);
  }

  /**
   * Update dots to reflect current page
   * @param {number} index Index of current page
   */
  updateDots(index) {
    this.dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add(this.config.activeBtnClass);
        dot.setAttribute("aria-selected", "true");
      } else {
        dot.classList.remove(this.config.activeBtnClass);
        dot.setAttribute("aria-selected", "false");
      }
    });
  }

  /**
   * Go to next slide
   */
  goToNext() {
    // Move forward by the configured number of slides to scroll
    const slidesToScroll = this.config.slidesToScroll || 1;
    this.goToSlide(this.currentSlide + slidesToScroll);
  }

  /**
   * Go to previous slide
   */
  goToPrev() {
    // Move backward by the configured number of slides to scroll
    const slidesToScroll = this.config.slidesToScroll || 1;
    this.goToSlide(this.currentSlide - slidesToScroll);
  }

  /**
   * Start autoplay
   */
  startAutoPlay() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.autoPlayTimer = setInterval(() => {
      this.goToNext();
    }, this.config.autoPlayInterval);
    
    // Emit autoplay started event
    eventBus.emit("spotai:autoplayStarted");
  }

  /**
   * Stop autoplay
   */
  stopAutoPlay() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    clearInterval(this.autoPlayTimer);
    this.autoPlayTimer = null;
    
    // Emit autoplay stopped event
    eventBus.emit("spotai:autoplayStopped");
  }

  /**
   * Handle mouse enter event
   */
  handleMouseEnter() {
    if (this.config.pauseOnHover && this.isPlaying) {
      this.stopAutoPlay();
    }
  }

  /**
   * Handle mouse leave event
   */
  handleMouseLeave() {
    if (this.config.pauseOnHover && this.config.enableAutoPlay && !this.isPlaying) {
      this.startAutoPlay();
    }
  }

  /**
   * Handle visibility change event
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden, pause autoplay
      if (this.isPlaying) {
        this.stopAutoPlay();
        this._wasPlayingBeforeHidden = true;
      }
    } else {
      // Page is visible again, resume autoplay if it was playing before
      if (this._wasPlayingBeforeHidden && this.config.enableAutoPlay) {
        this.startAutoPlay();
        this._wasPlayingBeforeHidden = false;
      }
    }
  }

  /**
   * Pause the carousel
   */
  pause() {
    if (this.isPlaying) {
      this.stopAutoPlay();
      this._wasPlayingBeforeHidden = true;
    }
  }

  /**
   * Resume the carousel
   */
  resume() {
    if (this._wasPlayingBeforeHidden && this.config.enableAutoPlay) {
      this.startAutoPlay();
      this._wasPlayingBeforeHidden = false;
    }
  }

  /**
   * Clean up carousel component
   */
  destroy() {
    // Stop autoplay
    this.stopAutoPlay();
    
    // Clean up observers
    this.observers.forEach(observer => observer.disconnect());
    
    // Call parent destroy method
    super.destroy();
  }
}

export default SpotAICarousel;