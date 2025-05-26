import { BaseComponent } from "./BaseComponent.js";
import { DOMUtils } from "../utils/DOMUtils.js";
import { Constants } from "../utils/Constants.js";

/**
 * Manages animation effects and transitions
 */
export class AnimationManager extends BaseComponent {
  /**
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    super({
      fadeInSelector: ".fade-in",
      logoSelector: ".logo",
      expertiseChipSelector: ".expertise-chip",
      counterSelector: ".counter",
      glassCardSelector: ".glass-card",

      // Animation configuration
      counterDuration: Constants.ANIMATION.COUNTER_DURATION,
      counterStepTime: Constants.ANIMATION.COUNTER_STEP_TIME,
      counterThreshold: Constants.ANIMATION.COUNTER_THRESHOLD,
      fadeThreshold: Constants.ANIMATION.FADE_THRESHOLD,
      fadeRootMargin: Constants.ANIMATION.FADE_ROOT_MARGIN,
      logoPulseDuration: Constants.ANIMATION.LOGO_PULSE_DURATION,
      maxCardRotation: Constants.ANIMATION.MAX_CARD_ROTATION,
      transitionDelayBase: Constants.ANIMATION.TRANSITION_DELAY_BASE,
      ...config,
    });

    // DOM Elements - will be initialized in init()
    this.faders = null;
    this.logoElement = null;
    this.expertiseChips = null;
    this.counters = null;
    this.glassCard = null;

    // Store observers for cleanup
    this._observers = [];

    // Store animation timers for cleanup
    this._animationTimers = [];
  }

  /**
   * Initialize animations
   * @override
   */
  init() {
    // Call parent init first
    super.init();

    // Initialize all DOM elements
    this.faders = document.querySelectorAll(this.config.fadeInSelector);
    this.logoElement = document.querySelector(this.config.logoSelector);
    this.expertiseChips = document.querySelectorAll(
      this.config.expertiseChipSelector
    );
    this.counters = document.querySelectorAll(this.config.counterSelector);
    this.glassCard = document.querySelector(this.config.glassCardSelector);

    // Initialize all animations
    this.initFadeInEffects();
    this.initLogoAnimation();
    this.initExpertiseChipsAnimation();
    this.initCounterAnimation();
    this.initGlassCardAnimation();

    // Publish initialization complete
    this.publish("animationManagerInitialized", { component: this });
  }

  /**
   * Initialize fade-in animations
   * @private
   */
  initFadeInEffects() {
    if (!this.faders || this.faders.length === 0) return;

    const appearOptions = {
      threshold: this.config.fadeThreshold,
      rootMargin: this.config.fadeRootMargin,
    };

    const appearOnScroll = this.createFadeInObserver(appearOptions);

    this.faders.forEach((fader) => {
      appearOnScroll.observe(fader);
    });
  }

  /**
   * Create an intersection observer for fade-in animations
   * @param {Object} options - IntersectionObserver options
   * @returns {IntersectionObserver} The created observer
   * @private
   */
  createFadeInObserver(options) {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        this.handleFadeInElement(entry.target, observer);
      });
    }, options);

    // Store the observer for later cleanup
    this._observers.push(observer);

    return observer;
  }

  /**
   * Handle fade-in animation for an element
   * @param {HTMLElement} element - The element to animate
   * @param {IntersectionObserver} observer - The observer to unobserve with
   * @private
   */
  handleFadeInElement(element, observer) {
    // Get any custom delay class (e.g., fade-in-1, fade-in-2)
    const delayClass = this.getDelayClass(element);

    // Add will-change just before animating
    element.style.willChange = "opacity, transform";

    // Add visible class with a slight delay for staggered effect
    const delay = delayClass
      ? parseInt(delayClass.split("-")[2]) * this.config.transitionDelayBase
      : 0;

    const timer = setTimeout(() => {
      element.classList.add(Constants.CSS_CLASSES.VISIBLE);
      observer.unobserve(element); // Stop observing once visible

      this.addTransitionEndCleanup(element);
    }, delay);

    // Store timer for cleanup
    this._animationTimers.push(timer);
  }

  /**
   * Get delay class from element
   * @param {HTMLElement} element - The element to check
   * @returns {string|null} The delay class if found
   * @private
   */
  getDelayClass(element) {
    return Array.from(element.classList).find(
      (cls) =>
        cls.startsWith(`${Constants.CSS_CLASSES.FADE_IN}-`) &&
        cls !== Constants.CSS_CLASSES.FADE_IN
    );
  }

  /**
   * Add transition end event listener to clean up will-change property
   * @param {HTMLElement} element - The element to add listener to
   * @private
   */
  addTransitionEndCleanup(element) {
    // Set up transition end handler with a fallback timeout
    const removeWillChange = (e) => {
      // Only remove for opacity/transform transitions
      if (e.propertyName === "opacity" || e.propertyName === "transform") {
        element.style.willChange = "";
        element.removeEventListener("transitionend", removeWillChange);
        // Clear the fallback timer if transition completed naturally
        clearTimeout(fallbackTimer);
      }
    };

    element.addEventListener("transitionend", removeWillChange);

    // Fallback timeout in case the transitionend event doesn't fire
    const fallbackTimer = setTimeout(() => {
      element.style.willChange = "";
      element.removeEventListener("transitionend", removeWillChange);
    }, 1000); // 1 second fallback

    // Store the fallback timer for cleanup
    this._animationTimers.push(fallbackTimer);
  }

  /**
   * Initialize logo animation
   * @private
   */
  initLogoAnimation() {
    if (!this.logoElement) return;

    this.addSafeEventListener(this.logoElement, "mouseenter", () => {
      this.logoElement.classList.add(Constants.CSS_CLASSES.PULSE);

      const timer = setTimeout(() => {
        this.logoElement.classList.remove(Constants.CSS_CLASSES.PULSE);
      }, this.config.logoPulseDuration);

      // Store timer for cleanup
      this._animationTimers.push(timer);
    });
  }

  /**
   * Initialize expertise chips animation
   * @private
   */
  initExpertiseChipsAnimation() {
    if (!this.expertiseChips || this.expertiseChips.length === 0) return;

    this.expertiseChips.forEach((chip) => {
      this.addSafeEventListener(chip, "mouseenter", () => {
        chip.classList.add("expertise-chip-hover");
      });

      this.addSafeEventListener(chip, "mouseleave", () => {
        chip.classList.remove("expertise-chip-hover");
      });
    });
  }

  /**
   * Initialize counter animation
   * @private
   */
  initCounterAnimation() {
    if (!this.counters || this.counters.length === 0) return;

    // Set up Intersection Observer for counters
    const counterObserver = this.createCounterObserver();

    // Observe all counters
    this.counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  /**
   * Create an intersection observer for counter animations
   * @returns {IntersectionObserver} The created observer
   * @private
   */
  createCounterObserver() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            // Once the counter is animated, no need to observe it anymore
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: this.config.counterThreshold,
      }
    );

    // Store the observer for later cleanup
    this._observers.push(observer);

    return observer;
  }

  /**
   * Animate a counter element
   * @param {HTMLElement} counter - The counter element to animate
   * @private
   */
  animateCounter(counter) {
    // Check if counter has already been animated
    if (counter.classList.contains(Constants.CSS_CLASSES.ANIMATED)) return;

    const target = parseInt(
      counter.getAttribute(Constants.ATTRIBUTES.DATA_COUNT)
    );
    const duration = this.config.counterDuration;
    const stepTime = this.config.counterStepTime;
    const steps = duration / stepTime;
    const increment = target / steps;

    // Mark as animated to prevent re-animation
    counter.classList.add(Constants.CSS_CLASSES.ANIMATED);

    // Use requestAnimationFrame for smoother animation
    let current = 0;
    let lastTimestamp = null;
    let accumulatedTime = 0;

    const animateFrame = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;

      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      accumulatedTime += deltaTime;

      if (accumulatedTime >= stepTime) {
        // How many steps to advance based on accumulated time
        const stepsToAdvance = Math.floor(accumulatedTime / stepTime);
        accumulatedTime %= stepTime; // Remainder

        current += increment * stepsToAdvance;
        const progress = Math.min(Math.round(current), target);
        counter.textContent = progress;

        if (progress >= target) {
          counter.textContent = target;
          // Optional: Publish an event when counter animation completes
          this.publish("counterAnimationComplete", { counter, value: target });
          return; // Stop animation
        }
      }

      // Continue animation
      requestAnimationFrame(animateFrame);
    };

    // Start the animation
    requestAnimationFrame(animateFrame);
  }

  /**
   * Initialize glass card animation
   * @private
   */
  initGlassCardAnimation() {
    if (!this.glassCard) return;

    this.addSafeEventListener(document, "mousemove", (e) => {
      this.updateGlassCardEffect(e);
    });

    // Reset on mouse leave
    this.addSafeEventListener(this.glassCard, "mouseleave", () => {
      this.resetGlassCardEffect();
    });
  }

  /**
   * Update glass card effect based on mouse position
   * @param {MouseEvent} e - The mouse event
   * @private
   */
  updateGlassCardEffect(e) {
    if (!this.glassCard) return;

    const { rotateX, rotateY, percentX, percentY } =
      this.calculateGlassCardValues(e);

    // Apply smooth rotation with subtle parallax effect
    this.glassCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Add light reflection effect
    this.glassCard.style.backgroundImage = `radial-gradient(circle at ${percentX}% ${percentY}%, rgba(255, 255, 255, 0.1) 0%, rgba(21, 21, 37, 0.7) 50%)`;
  }

  /**
   * Calculate glass card effect values
   * @param {MouseEvent} e - The mouse event
   * @returns {Object} Object containing rotation and percentage values
   * @private
   */
  calculateGlassCardValues(e) {
    const rect = this.glassCard.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center (as a percentage)
    const distX = ((e.clientX - centerX) / window.innerWidth) * 10;
    const distY = ((e.clientY - centerY) / window.innerHeight) * 10;

    // Calculate rotation based on mouse position
    // Limit rotation to a small range for subtle effect
    const maxRotation = this.config.maxCardRotation;
    const rotateY = Math.max(-maxRotation, Math.min(maxRotation, distX));
    const rotateX = Math.max(-maxRotation, Math.min(maxRotation, -distY));

    // Calculate percentages for reflection effect
    const percentX = ((e.clientX - rect.left) / rect.width) * 100;
    const percentY = ((e.clientY - rect.top) / rect.height) * 100;

    return { rotateX, rotateY, percentX, percentY };
  }

  /**
   * Reset glass card effect
   * @private
   */
  resetGlassCardEffect() {
    if (!this.glassCard) return;

    this.glassCard.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    this.glassCard.style.backgroundImage = "none";
  }

  /**
   * Clean up resources before component is destroyed
   * @override
   */
  destroy() {
    // Clean up all IntersectionObservers
    this._observers.forEach((observer) => {
      observer.disconnect();
    });
    this._observers = [];

    // Clean up all animation timers
    this._animationTimers.forEach((timer) => {
      clearTimeout(timer);
    });
    this._animationTimers = [];

    // Reset glass card effect
    this.resetGlassCardEffect();

    // Call parent destroy to clean up event listeners
    super.destroy();

    // Publish destruction event
    this.publish("animationManagerDestroyed", { component: this });
  }
}
