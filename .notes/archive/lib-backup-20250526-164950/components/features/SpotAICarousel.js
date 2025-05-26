/**
 * SpotAICarousel - Interactive carousel for the Spot AI section
 * Manages image carousel with animations and modal integration
 */
import BaseComponent from "../../components/base/BaseComponent.js";
import { Data } from "../../utils/data.js";
import eventBus from "../../services/EventBus.js";

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
      slidesSelector: ".spot-ai-card",
      navSelector: ".slider-controls",
      prevBtnSelector: ".slider-prev",
      nextBtnSelector: ".slider-next",
      thumbsSelector: ".slider-dot",
      activeBtnClass: "active",
      activeSlideClass: "active",
      slideTransitionDuration: 500, // ms
      autoPlayInterval: 5000, // ms
      enableAutoPlay: true,
      pauseOnHover: true,
      showModalOnClick: true,
      dialogId: "ai-dialog",
      dialogContentId: "ai-dialog-content",
      ...config,
    });

    // Bind methods
    this.goToSlide = this.goToSlide.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToPrev = this.goToPrev.bind(this);
    this.handleThumbClick = this.handleThumbClick.bind(this);
    this.handleSlideClick = this.handleSlideClick.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.startAutoPlay = this.startAutoPlay.bind(this);
    this.stopAutoPlay = this.stopAutoPlay.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);

    // State
    this.currentSlide = 0;
    this.slideCount = 0;
    this.isPlaying = false;
    this.autoPlayTimer = null;
    this.isTransitioning = false;
  }

  /**
   * Initialize the component
   * @returns {Promise<this>} This component instance
   */
  async init() {
    try {
      // Call parent init which returns a Promise
      await super.init();
      
      this.container = select(this.config.containerSelector);

      // Get carousel directly to avoid nesting issues
      this.carousel = select(this.config.carouselSelector);

      // Check if we found the carousel
      if (!this.container || !this.carousel) {
        console.error(
          "SpotAICarousel: Required elements not found in DOM",
          {
            container: this.config.containerSelector,
            carousel: this.config.carouselSelector,
          }
        );
        return Promise.reject(new Error("Required elements not found"));
      }

      // First load the data, then proceed with initialization
      // This ensures we have data before trying to access slides
      return this.loadData().then((data) => {
        // Populate carousel with data
        if (this.carousel.children.length === 0) {
          this.populateCarousel(data);
        }

        // Now that we have data, get navigation elements
        this.slides = Array.from(selectAll(this.config.slidesSelector, this.carousel));
        this.navContainer = select(this.config.navSelector, this.container);
        this.prevBtn = select(this.config.prevBtnSelector, this.container);
        this.nextBtn = select(this.config.nextBtnSelector, this.container);
        this.thumbs = Array.from(selectAll(this.config.thumbsSelector, this.container));

        // Store total slides count
        this.slideCount = this.slides.length;

        if (this.slideCount === 0) {
          console.warn("SpotAI carousel has no slides after data loading");
          return this;
        }

        // Setup
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupAnimations();

        // Initialize with first slide active
        this.goToSlide(0, false);

        // Auto play if enabled
        if (this.config.enableAutoPlay) {
          this.startAutoPlay();
        }

        // Emit initialized event
        this.emit("spotai:initialized");

        return this;
      });
    } catch (error) {
      console.error("Failed to initialize SpotAICarousel:", error);
      return Promise.reject(error);
    }
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Navigation buttons
    if (this.prevBtn) {
      this.addSafeEventListener(this.prevBtn, "click", this.goToPrev);
    }

    if (this.nextBtn) {
      this.addSafeEventListener(this.nextBtn, "click", this.goToNext);
    }

    // Thumbnail clicks
    this.thumbs.forEach((thumb, index) => {
      this.addSafeEventListener(thumb, "click", () =>
        this.handleThumbClick(index)
      );
    });

    // Slide clicks
    this.slides.forEach((slide) => {
      this.addSafeEventListener(slide, "click", () =>
        this.handleSlideClick(slide)
      );
    });

    // Pause autoplay on hover
    if (this.config.pauseOnHover) {
      this.addSafeEventListener(
        this.carousel,
        "mouseenter",
        this.handleMouseEnter
      );
      this.addSafeEventListener(
        this.carousel,
        "mouseleave",
        this.handleMouseLeave
      );
    }

    // Pause when page is not visible
    this.addSafeEventListener(
      document,
      "visibilitychange",
      this.handleVisibilityChange
    );

    // Listen for modal events to control autoplay
    this.listen("modal:opened", () => this.stopAutoPlay());
    this.listen("modal:closed", () => {
      if (this.config.enableAutoPlay && !this.isPlaying) {
        this.startAutoPlay();
      }
    });
  }

  /**
   * Set up intersection observer to pause/play when carousel is visible
   */
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.resume();
        } else {
          this.pause();
        }
      });
    }, options);

    // Observe container
    if (this.container) {
      observer.observe(this.container);
    }

    // Store observer for cleanup
    this.addObserver(observer);
  }

  /**
   * Set up animations for slides
   */
  setupAnimations() {
    // Add animation styles if needed
    this.slides.forEach((slide, index) => {
      // Animation setup using core animation utilities
      animate(this.carousel, {
        transitionDuration: `${this.config.slideTransitionDuration}ms`
      });

      // Initial state - only first slide is visible
      if (index === 0) {
        slide.classList.add(this.config.activeSlideClass);
      } else {
        slide.classList.remove(this.config.activeSlideClass);
      }
    });

    // Update active thumb
    this.updateThumbs(0);
  }

  /**
   * Go to specific slide
   * @param {number} index - Slide index
   * @param {boolean} animate - Whether to animate the transition
   */
  goToSlide(index, animate = true) {
    if (this.isTransitioning || index === this.currentSlide) return;

    // Ensure index is within bounds
    const targetIndex = (index + this.slideCount) % this.slideCount;

    // Set transitioning state
    this.isTransitioning = true;

    // Get current and target slides
    const currentSlide = this.slides[this.currentSlide];
    const targetSlide = this.slides[targetIndex];

    if (!currentSlide || !targetSlide) {
      this.isTransitioning = false;
      return;
    }

    // Set transition duration based on animate parameter
    if (!animate) {
      currentSlide.style.transition = "none";
      targetSlide.style.transition = "none";
    } else {
      currentSlide.style.transition = `opacity ${this.config.slideTransitionDuration}ms ease-in-out, transform ${this.config.slideTransitionDuration}ms ease-in-out`;
      targetSlide.style.transition = `opacity ${this.config.slideTransitionDuration}ms ease-in-out, transform ${this.config.slideTransitionDuration}ms ease-in-out`;
    }

    // Force reflow to ensure transition works
    void currentSlide.offsetHeight;
    void targetSlide.offsetHeight;

    // Remove active class from current slide
    currentSlide.classList.remove(this.config.activeSlideClass);

    // Add active class to target slide
    targetSlide.classList.add(this.config.activeSlideClass);

    // Update current slide index
    this.currentSlide = targetIndex;

    // Update thumbnails
    this.updateThumbs(targetIndex);

    // Reset transition after animation
    setTimeout(
      () => {
        this.isTransitioning = false;

        // Emit slide change event
        this.emit("spotai:slideChange", {
          currentSlide: this.currentSlide,
          slideElement: targetSlide,
        });
      },
      animate ? this.config.slideTransitionDuration : 0
    );
  }

  /**
   * Go to next slide
   */
  goToNext() {
    this.goToSlide(this.currentSlide + 1);
  }

  /**
   * Go to previous slide
   */
  goToPrev() {
    this.goToSlide(this.currentSlide - 1);
  }

  /**
   * Handle thumbnail click
   * @param {number} index - Thumbnail index
   */
  handleThumbClick(index) {
    this.stopAutoPlay();
    this.goToSlide(index);

    // Restart autoplay after user interaction
    if (this.config.enableAutoPlay) {
      this.startAutoPlay();
    }
  }

  /**
   * Handle slide click - open dialog with slide content
   * @param {Element} slide - Clicked slide
   */
  handleSlideClick(slide) {
    if (!this.config.showModalOnClick) return;

    // Get slide data for dialog
    const slideIndex = Array.from(this.slides).indexOf(slide);
    const slideTitle = slide.getAttribute("data-title") || "";
    const slideDesc = slide.getAttribute("data-description") || "";
    const slideImage = slide.querySelector("img")?.src || "";

    // Get dialog element
    const dialog = document.getElementById(this.config.dialogId);
    const dialogContent = document.getElementById(this.config.dialogContentId);

    if (dialog && dialogContent) {
      // Populate dialog content
      dialogContent.innerHTML = `
        <div class="dialog-header">
          <h2>${slideTitle}</h2>
        </div>
        <div class="dialog-content">
          <img src="${slideImage}" alt="${slideTitle}" class="dialog-image">
          <div class="dialog-text">
            <p>${slideDesc}</p>
          </div>
        </div>
      `;

      // Show dialog
      dialog.showModal();

      // Stop autoplay when dialog is open
      this.stopAutoPlay();

      // Close when clicking the close button
      const closeBtn = dialog.querySelector("[data-close-modal]");
      if (closeBtn) {
        closeBtn.addEventListener(
          "click",
          () => {
            dialog.close();
            if (this.config.enableAutoPlay) {
              this.startAutoPlay();
            }
          },
          { once: true }
        );
      }

      // Close when clicking outside the dialog
      dialog.addEventListener(
        "click",
        (e) => {
          if (e.target === dialog) {
            dialog.close();
            if (this.config.enableAutoPlay) {
              this.startAutoPlay();
            }
          }
        },
        { once: true }
      );
    }
  }

  /**
   * Update thumbnail states
   * @param {number} activeIndex - Active slide index
   */
  updateThumbs(activeIndex) {
    this.thumbs.forEach((thumb, index) => {
      if (index === activeIndex) {
        thumb.classList.add(this.config.activeBtnClass);
        thumb.setAttribute("aria-current", "true");
      } else {
        thumb.classList.remove(this.config.activeBtnClass);
        thumb.setAttribute("aria-current", "false");
      }
    });
  }

  /**
   * Load SpotAI data from JSON file
   * @returns {Promise} Promise that resolves with SpotAI data
   */
  loadData() {
    return Data.load("src/data/carouselData.json");
  }

  /**
   * Populate carousel with data
   * @param {Array} data - Array of slide data
   * @returns {number} Number of slides created
   */
  populateCarousel(data) {
    if (!this.carousel || !data || !data.length) {
      console.warn("Cannot populate carousel: missing element or data");
      return 0;
    }

    // Clear existing content
    this.carousel.innerHTML = "";

    // Create slider dots container if it doesn't exist
    let dotsContainer = document.querySelector(".slider-dots");
    if (!dotsContainer) {
      dotsContainer = document.createElement("div");
      dotsContainer.className = "slider-dots";
      const controls = document.querySelector(this.config.navSelector);
      if (controls) {
        // Insert dots between prev and next buttons
        const nextBtn = controls.querySelector(this.config.nextBtnSelector);
        if (nextBtn) {
          controls.insertBefore(dotsContainer, nextBtn);
        } else {
          controls.appendChild(dotsContainer);
        }
      }
    }

    // Clear existing dots
    dotsContainer.innerHTML = "";

    // Create slides and dots
    data.forEach((item, index) => {
      // Create slide
      const slide = document.createElement("div");
      slide.className = "spot-ai-card";
      slide.setAttribute("data-title", item.title);
      slide.setAttribute("data-description", item.content);
      slide.setAttribute("role", "tabpanel");
      slide.setAttribute("aria-hidden", index === 0 ? "false" : "true");
      slide.setAttribute("tabindex", index === 0 ? "0" : "-1");

      // Populate slide content
      slide.innerHTML = `
        <div class="spot-ai-card-inner">
          <div class="spot-ai-card-content">
            <h3>${item.title}</h3>
            <p>${item.preview}</p>
          </div>
          <div class="spot-ai-card-image">
            <img src="${item.image}" alt="${item.title}" loading="${
        index < 2 ? "eager" : "lazy"
      }">
          </div>
        </div>
      `;

      // Add click handler
      slide.addEventListener("click", () => this.handleSlideClick(slide));

      // Add to carousel
      this.carousel.appendChild(slide);

      // Create dot for navigation
      const dot = document.createElement("button");
      dot.className = "slider-dot";
      dot.setAttribute("type", "button");
      dot.setAttribute("aria-label", `Go to slide ${index + 1}`);
      dot.setAttribute("aria-controls", `slide-${index}`);
      dot.setAttribute("aria-selected", index === 0 ? "true" : "false");

      // Add click handler
      dot.addEventListener("click", () => this.handleThumbClick(index));

      // Add to dots container
      dotsContainer.appendChild(dot);
    });

    // Update component properties
    this.slides = Array.from(this.carousel.children);
    this.thumbs = Array.from(dotsContainer.children);
    this.slideCount = this.slides.length;

    // Update active thumb
    this.updateThumbs(0);

    return data.length;
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
    this.emit("spotai:autoplayStarted");
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
    this.emit("spotai:autoplayStopped");
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
    if (
      this.config.pauseOnHover &&
      this.config.enableAutoPlay &&
      !this.isPlaying
    ) {
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
   * Override from BaseComponent
   */
  pause() {
    if (this.isPlaying) {
      this.stopAutoPlay();
      this._wasPlayingBeforeHidden = true;
    }
  }

  /**
   * Resume the carousel
   * Override from BaseComponent
   */
  resume() {
    if (this._wasPlayingBeforeHidden && this.config.enableAutoPlay) {
      this.startAutoPlay();
      this._wasPlayingBeforeHidden = false;
    }
  }

  /**
   * Clean up carousel component
   * Override from BaseComponent
   */
  destroy() {
    // Cleanup event listeners and resources
    this.pause();
    this.slides.forEach((slide) =>
      slide.removeEventListener("transitionend", this.handleTransitionEnd)
    );
    // Additional cleanup as needed
    super.destroy();
  }
}

export default SpotAICarousel;
