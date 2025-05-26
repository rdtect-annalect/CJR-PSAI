/**
 * NavbarComponent - Enhanced, accessible navigation component
 * Handles responsive behavior, smooth scrolling, and optimized animations
 * with improved accessibility, performance, and cross-browser compatibility
 */
import { BaseComponent, PSAI } from "../../psai.js";
import eventBus from "../../services/EventBus.js";

/**
 * Enhanced navbar component with improved accessibility and performance
 * @extends BaseComponent
 */
export class NavbarComponent extends BaseComponent {
  /**
   * Create a new NavbarComponent instance
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    super({
      navbarSelector: ".site-nav",
      toggleSelector: ".menu-toggle",
      menuSelector: ".nav-content",
      linkSelector: ".nav-menu a",
      logoSelector: ".logo",
      mobileBreakpoint: 991, // px
      scrollThreshold: 100, // px
      scrollClass: "scrolled",
      activeClass: "active",
      openClass: "active", // changed to match our new class names
      animationDuration: 300, // ms
      animationEasing: "ease-in-out",
      useRequestAnimationFrame: true, // Use rAF for smoother animations
      ...config,
    });

    // Bind methods to preserve context
    this.handleScroll = this.handleScroll.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocusTrap = this.handleFocusTrap.bind(this);
    this.animateMenuItems = this.animateMenuItems.bind(this);
    this.animateNavbar = this.animateNavbar.bind(this);

    // State
    this.isOpen = false;
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.scrollDirection = "none";
    this.isMobile = window.innerWidth <= this.config.mobileBreakpoint;
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.supportsSmoothScroll =
      "scrollBehavior" in document.documentElement.style;
    this.supportsBackdropFilter = this._checkBackdropFilterSupport();
    this.animationFrame = null;
    this.currentAnimation = null;
    this.focusableElements = null;
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }

  /**
   * Initialize the navbar
   * @returns {Promise} Promise that resolves when initialization is complete
   */
  init() {
    // Call parent init which returns a Promise
    return super.init().then(() => {
      // Find DOM elements
      this.navbar = document.querySelector(this.config.navbarSelector);
      this.toggleBtn = this.navbar?.querySelector(this.config.toggleSelector);
      this.menu = this.navbar?.querySelector(this.config.menuSelector);
      this.logo = this.navbar?.querySelector(this.config.logoSelector);
      this.links = Array.from(
        this.navbar?.querySelectorAll(this.config.linkSelector) || []
      );
      this.sections = Array.from(document.querySelectorAll("section[id]"));

      if (!this.navbar) {
        console.warn("Navbar element not found");
        return this;
      }

      // Setup
      this._applyBrowserSupport();
      this._setupAria();
      this.setupEventListeners();
      this.setupScrollSpy();
      this.setupAnimations();

      // Apply initial state based on scroll position
      this.handleScroll();

      // Emit initialized event
      this.emit("navbar:initialized");

      return this;
    });
  }

  /**
   * Check for backdrop-filter support
   * @returns {boolean} Whether backdrop-filter is supported
   * @private
   */
  _checkBackdropFilterSupport() {
    // Check for backdrop-filter or -webkit-backdrop-filter support
    return (
      CSS.supports("(backdrop-filter: blur(1px))") ||
      CSS.supports("(-webkit-backdrop-filter: blur(1px))")
    );
  }

  /**
   * Apply browser-specific adjustments
   * @private
   */
  _applyBrowserSupport() {
    // Add class indicating backdrop-filter support
    if (this.navbar) {
      this.navbar.classList.toggle(
        "supports-backdrop-filter",
        this.supportsBackdropFilter
      );
      this.navbar.classList.toggle(
        "supports-smooth-scroll",
        this.supportsSmoothScroll
      );
    }
  }

  /**
   * Setup ARIA attributes for accessibility
   * @private
   */
  _setupAria() {
    if (!this.navbar) return;

    // Set navbar role
    this.navbar.setAttribute("role", "navigation");
    this.navbar.setAttribute("aria-label", "Main Navigation");

    // Setup toggle button ARIA
    if (this.toggleBtn) {
      this.toggleBtn.setAttribute("aria-expanded", "false");
      this.toggleBtn.setAttribute(
        "aria-controls",
        this.menu?.id || "navbar-menu"
      );
      this.toggleBtn.setAttribute("aria-label", "Toggle navigation menu");
    }

    // Setup menu ARIA
    if (this.menu) {
      if (!this.menu.id) {
        this.menu.id = "navbar-menu";
      }
      this.menu.setAttribute("role", "menu");
      this.menu.setAttribute(
        "aria-labelledby",
        this.toggleBtn?.id || "navbar-toggle"
      );
      this.menu.setAttribute("aria-hidden", "true");
    }

    // Setup links ARIA
    this.links.forEach((link, index) => {
      link.setAttribute("role", "menuitem");
      link.setAttribute("tabindex", "0");
      link.setAttribute(
        "aria-current",
        link.classList.contains(this.config.activeClass) ? "page" : "false"
      );

      // Set data index for keyboard navigation
      link.setAttribute("data-nav-index", index.toString());
    });
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Toggle button
    if (this.toggleBtn) {
      this.addSafeEventListener(this.toggleBtn, "click", this.toggleMenu);
    }

    // Nav links
    this.links.forEach((link) => {
      this.addSafeEventListener(link, "click", this.handleLinkClick);
      // Add keyboard event listeners for better keyboard navigation
      this.addSafeEventListener(link, "keydown", this.handleKeyDown);
    });

    // Close menu when clicking outside
    this.addSafeEventListener(document, "click", this.handleOutsideClick);

    // Keyboard events for accessibility
    this.addSafeEventListener(this.navbar, "keydown", this.handleKeyDown);

    // Handle scroll events with optimized throttling/debouncing
    if (this.config.useRequestAnimationFrame) {
      // More efficient scroll handling with rAF
      let ticking = false;
      const scrollHandler = () => {
        if (!ticking) {
          this.animationFrame = requestAnimationFrame(() => {
            this.handleScroll();
            ticking = false;
          });
          this.addAnimationFrame(this.animationFrame);
          ticking = true;
        }
      };
      this.addSafeEventListener(window, "scroll", scrollHandler, {
        passive: true,
      });
    } else {
      // Fallback to throttled scroll handler
      const throttledScrollHandler = this.createThrottle(this.handleScroll, 50);
      this.addSafeEventListener(window, "scroll", throttledScrollHandler, {
        passive: true,
      });
    }

    // Handle resize events with debounce
    const resizeHandler = this.createDebounce(this.handleResize, 100);
    this.addSafeEventListener(window, "resize", resizeHandler);

    // Handle focus trapping in mobile menu
    this.addSafeEventListener(this.menu, "keydown", this.handleFocusTrap);

    // Handle page visibility for performance optimization
    this.addSafeEventListener(document, "visibilitychange", () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.resume();
      }
    });
  }

  /**
   * Handle keyboard navigation between nav links
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyDown(e) {
    // If Escape key is pressed, close the menu
    if (e.key === "Escape") {
      this.closeMenu();
      return;
    }

    const target = e.target;
    const isLink = target.classList.contains("navbar__link");

    if (!isLink) return;

    // Get current index
    const currentIndex = parseInt(target.getAttribute("data-nav-index"), 10);
    let nextIndex = currentIndex;

    // Handle arrow keys for navigation
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (currentIndex + 1) % this.links.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextIndex = (currentIndex - 1 + this.links.length) % this.links.length;
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
        e.preventDefault();
        nextIndex = this.links.length - 1;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        target.click();
        break;
    }

    if (nextIndex !== currentIndex) {
      this.links[nextIndex].focus();
    }
  }

  /**
   * Handle focus trapping in the mobile menu
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleFocusTrap(e) {
    // Only trap focus when menu is open
    if (!this.isOpen) return;

    // Get all focusable elements if we haven't already
    if (!this.focusableElements) {
      this.updateFocusableElements();
    }

    const isTabPressed = e.key === "Tab";

    if (!isTabPressed) return;

    // If shift key pressed for shift + tab combination
    if (e.shiftKey) {
      if (document.activeElement === this.firstFocusableElement) {
        e.preventDefault();
        this.lastFocusableElement.focus();
      }
    } else {
      // If tab key is pressed without shift
      if (document.activeElement === this.lastFocusableElement) {
        e.preventDefault();
        this.firstFocusableElement.focus();
      }
    }
  }

  /**
   * Update the list of focusable elements in the menu
   * Called when menu opens and on resize
   */
  updateFocusableElements() {
    if (!this.menu) return;

    // Get all focusable elements
    this.focusableElements = this.menu.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );

    if (this.focusableElements.length > 0) {
      this.firstFocusableElement = this.focusableElements[0];
      this.lastFocusableElement =
        this.focusableElements[this.focusableElements.length - 1];
    }
  }

  /**
   * Toggle the mobile menu with enhanced accessibility
   * @param {Event} e - Click event
   */
  toggleMenu(e) {
    if (e) e.preventDefault();

    this.isOpen = !this.isOpen;

    // Update ARIA attributes
    this.toggleBtn?.setAttribute("aria-expanded", String(this.isOpen));
    this.menu?.setAttribute("aria-hidden", String(!this.isOpen));

    // Toggle classes
    this.navbar.classList.toggle(this.config.openClass, this.isOpen);
    document.body.classList.toggle("nav-open", this.isOpen);

    // Use requestAnimationFrame for smoother animation if supported
    if (this.config.useRequestAnimationFrame) {
      // Cancel any ongoing animation
      if (this.currentAnimation) {
        cancelAnimationFrame(this.currentAnimation);
      }

      // Prepare for animation
      if (this.menu) {
        this.menu.style.willChange = "transform, opacity";

        // Animate with requestAnimationFrame
        const startTime = performance.now();
        const duration = this.config.animationDuration;
        const startTransform = this.isOpen
          ? "translateY(-100%)"
          : "translateY(0)";
        const endTransform = this.isOpen
          ? "translateY(0)"
          : "translateY(-100%)";
        const startOpacity = this.isOpen ? 0 : 1;
        const endOpacity = this.isOpen ? 1 : 0;

        // Force reflow to ensure transition works
        void this.menu.offsetHeight;

        const animate = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedProgress = this._easeInOutQuad(progress);

          // Calculate current transform and opacity values
          const translateY = this.isOpen
            ? `translateY(${-100 * (1 - easedProgress)}%)`
            : `translateY(${-100 * easedProgress}%)`;

          const opacity = this.isOpen
            ? startOpacity + (endOpacity - startOpacity) * easedProgress
            : startOpacity + (endOpacity - startOpacity) * easedProgress;

          // Apply current styles
          this.menu.style.transform = translateY;
          this.menu.style.opacity = String(opacity);

          // Continue animation if not complete
          if (progress < 1) {
            this.currentAnimation = requestAnimationFrame(animate);
            this.addAnimationFrame(this.currentAnimation);
          } else {
            // Clean up when animation completes
            this.menu.style.transform = endTransform;
            this.menu.style.opacity = String(endOpacity);
            this.menu.style.willChange = "auto";
            this.currentAnimation = null;

            // If menu is now open, focus the first focusable element
            if (this.isOpen) {
              this.updateFocusableElements();
              this.firstFocusableElement?.focus();
              this.animateMenuItems();
            }
          }
        };

        this.currentAnimation = requestAnimationFrame(animate);
        this.addAnimationFrame(this.currentAnimation);
      }
    } else {
      // Fallback to CSS transitions
      if (this.menu) {
        this.menu.style.transition = `transform ${this.config.animationDuration}ms ${this.config.animationEasing}, opacity ${this.config.animationDuration}ms ${this.config.animationEasing}`;
        this.menu.style.willChange = "transform, opacity";

        // Force reflow to ensure transition works
        void this.menu.offsetHeight;

        if (this.isOpen) {
          this.menu.style.transform = "translateY(0)";
          this.menu.style.opacity = "1";

          // Focus management
          setTimeout(() => {
            this.updateFocusableElements();
            this.firstFocusableElement?.focus();
            this.animateMenuItems();
            this.menu.style.willChange = "auto";
          }, this.config.animationDuration);
        } else {
          this.menu.style.transform = "translateY(-100%)";
          this.menu.style.opacity = "0";

          setTimeout(() => {
            this.menu.style.willChange = "auto";
          }, this.config.animationDuration);
        }
      }
    }

    // Lock body scroll when menu is open
    document.body.style.overflow = this.isOpen ? "hidden" : "";

    // Emit event
    this.emit("navbar:toggle", { isOpen: this.isOpen });
  }

  /**
   * Easing function for smoother animations
   * @param {number} t - Progress (0 to 1)
   * @returns {number} Eased value
   * @private
   */
  _easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }

  /**
   * Animate menu items with staggered entrance
   * Uses rAF for better performance and reduced motion support
   */
  animateMenuItems() {
    if (!this.isOpen || !this.menu) return;

    const items = this.menu.querySelectorAll(".navbar__link");
    if (!items.length) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Simple fade in for reduced motion
      items.forEach((item) => {
        item.style.opacity = "1";
        item.style.transform = "none";
      });
      return;
    }

    // Reset animations
    items.forEach((item) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(10px)";
      item.style.transition = "none";
    });

    // Force reflow
    void this.menu.offsetHeight;

    // Apply staggered animations using rAF for better performance
    const animateItem = (item, index) => {
      const delay = 50 + index * 50;

      setTimeout(() => {
        requestAnimationFrame(() => {
          item.style.transition = `opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)`;
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        });
      }, delay);
    };

    items.forEach(animateItem);
  }

  /**
   * Close the mobile menu
   */
  closeMenu() {
    if (!this.isOpen) return;

    this.toggleMenu();

    // Return focus to toggle button
    setTimeout(() => {
      this.toggleBtn?.focus();
    }, this.config.animationDuration);
  }

  /**
   * Handle link clicks with improved accessibility
   * @param {Event} e - Click event
   */
  handleLinkClick(e) {
    const targetId = e.currentTarget.getAttribute("href");

    if (targetId && targetId.startsWith("#")) {
      e.preventDefault();

      // Close menu on mobile
      if (this.isOpen) {
        this.closeMenu();
      }

      // Smooth scroll to section
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = this.navbar ? this.navbar.offsetHeight : 0;

        // Use native smooth scrolling if supported, otherwise use JS
        if (this.supportsSmoothScroll) {
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        } else {
          // Fallback for browsers without smooth scrolling
          this.smoothScrollPolyfill(targetElement, headerOffset);
        }

        // Update active state and ARIA attributes
        this.setActiveLink(targetId);

        // Emit event
        this.emit("navbar:navigate", { targetId });
      }
    }
  }

  /**
   * Smooth scroll polyfill for browsers without native support
   * @param {Element} targetElement - Element to scroll to
   * @param {number} headerOffset - Offset for fixed header
   */
  smoothScrollPolyfill(targetElement, headerOffset) {
    const startPosition = window.pageYOffset;
    const targetPosition =
      targetElement.getBoundingClientRect().top +
      window.pageYOffset -
      headerOffset;
    const distance = targetPosition - startPosition;
    const duration = 500; // ms
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = this._easeInOutQuad(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        const frameId = requestAnimationFrame(animation);
        this.addAnimationFrame(frameId);
      }
    };

    const frameId = requestAnimationFrame(animation);
    this.addAnimationFrame(frameId);
  }

  /**
   * Handle clicks outside the navbar
   * @param {Event} e - Click event
   */
  handleOutsideClick(e) {
    if (!this.isOpen) return;

    const isClickInside = this.navbar?.contains(e.target);
    const isToggleBtn = this.toggleBtn?.contains(e.target);

    if (!isClickInside && !isToggleBtn) {
      this.closeMenu();
    }
  }

  /**
   * Handle scroll events with improved performance
   */
  handleScroll() {
    const currentScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    const scrolled = currentScroll > this.config.scrollThreshold;

    // Determine scroll direction
    this.scrollDirection =
      currentScroll > this.lastScrollPosition ? "down" : "up";

    // For performance, only continue if there's a meaningful change
    const isSignificantChange =
      Math.abs(currentScroll - this.lastScrollPosition) > 5;

    if (!isSignificantChange && this.scrollPosition !== 0) {
      return;
    }

    // Toggle scroll class
    if (this.navbar) {
      this.navbar.classList.toggle(this.config.scrollClass, scrolled);

      // Enhanced scrolling behavior with better performance
      this.animateNavbar(currentScroll, scrolled);
    }

    // Update scroll position for next comparison
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = currentScroll;

    // Emit scroll event for other components
    this.emit("navbar:scroll", {
      position: currentScroll,
      scrolled,
      direction: this.scrollDirection,
    });
  }

  /**
   * Animate navbar based on scroll position
   * @param {number} currentScroll - Current scroll position
   * @param {boolean} scrolled - Whether page is scrolled beyond threshold
   */
  animateNavbar(currentScroll, scrolled) {
    if (!this.navbar) return;

    // Only animate if not in mobile menu open state
    if (this.isOpen) return;

    if (scrolled) {
      if (this.scrollDirection === "down" && currentScroll > 150) {
        // Scrolling down significantly - slightly hide navbar
        this.navbar.style.transform = "translateY(-10px)";
      } else if (this.scrollDirection === "up") {
        // Scrolling up - show navbar
        this.navbar.style.transform = "translateY(0)";
      }
    } else {
      // At the top or just beginning to scroll
      this.navbar.style.transform = "translateY(0)";
    }
  }

  /**
   * Handle window resize with improved performance
   */
  handleResize() {
    // Update viewport dimensions
    this.viewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Check if we need to reset mobile menu
    const wasMobile = this.isMobile;
    this.isMobile = this.viewport.width <= this.config.mobileBreakpoint;

    // If transitioning from mobile to desktop view
    if (wasMobile && !this.isMobile && this.isOpen) {
      // Reset mobile menu when viewport becomes desktop
      this.closeMenu();
    }

    // Update focus trap elements when menu is open
    if (this.isOpen) {
      this.updateFocusableElements();
    }

    // Emit resize event
    this.emit("navbar:resize", { viewport: this.viewport });
  }

  /**
   * Set up IntersectionObserver for scroll spy with improved performance
   */
  setupScrollSpy() {
    if (!this.links.length || !this.sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            this.setActiveLink(`#${id}`);

            // Emit section change event
            this.emit("navbar:sectionChange", { id });
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -20% 0px", // Adjusted for better accuracy
        threshold: [0.2, 0.5, 0.8], // Multiple thresholds for better detection
      }
    );

    // Observe all sections
    this.sections.forEach((section) => observer.observe(section));

    // Store observer for cleanup
    this.addObserver(observer);
  }

  /**
   * Set the active navigation link with improved accessibility
   * @param {string} sectionId - ID of the active section
   */
  setActiveLink(sectionId) {
    this.links.forEach((link) => {
      const isActive = link.getAttribute("href") === sectionId;
      link.classList.toggle(this.config.activeClass, isActive);
      link.setAttribute("aria-current", isActive ? "page" : "false");
    });
  }

  /**
   * Set up animations with improved performance
   */
  setupAnimations() {
    // Enable hardware acceleration for smoother animations
    if (this.navbar) {
      this.navbar.style.willChange = "transform, opacity";

      // Initial state
      this.navbar.style.opacity = "0";
      this.navbar.style.transform = "translateY(-20px)";
      this.navbar.style.transition = "opacity 0.5s ease, transform 0.5s ease";

      // Use rAF for smoother animation
      requestAnimationFrame(() => {
        // Trigger reflow
        void this.navbar.offsetHeight;

        // Animate in
        this.navbar.style.opacity = "1";
        this.navbar.style.transform = "translateY(0)";

        // Remove will-change after animation completes
        setTimeout(() => {
          this.navbar.style.willChange = "auto";
        }, 500);
      });
    }

    // Add staggered animation to nav items
    this.links.forEach((link, index) => {
      link.style.setProperty("--delay", `${index * 50}ms`);
    });
  }

  /**
   * Pause the component (e.g., when page is not visible)
   * Override from BaseComponent
   */
  pause() {
    // Pause any animations
    if (this.currentAnimation) {
      cancelAnimationFrame(this.currentAnimation);
      this.currentAnimation = null;
    }

    // Pause scroll events
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
  }

  /**
   * Resume the component
   * Override from BaseComponent
   */
  resume() {
    // Resume handling scroll position
    this.handleScroll();
  }

  /**
   * Clean up resources and state
   * Override from BaseComponent
   */
  destroy() {
    // Reset any styles applied to the navbar
    if (this.navbar) {
      this.navbar.style.transform = "";
      this.navbar.style.opacity = "";
      this.navbar.style.willChange = "";

      // Remove classes
      this.navbar.classList.remove(this.config.openClass);
      this.navbar.classList.remove(this.config.scrollClass);
      this.navbar.classList.remove("supports-backdrop-filter");
      this.navbar.classList.remove("supports-smooth-scroll");
    }

    // Reset body styles
    document.body.classList.remove("nav-open");
    document.body.style.overflow = "";

    // Reset menu styles
    if (this.menu) {
      this.menu.style.transform = "";
      this.menu.style.opacity = "";
      this.menu.style.willChange = "";
    }

    // Reset state
    this.isOpen = false;
    this.scrollPosition = 0;
    this.focusableElements = null;
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;

    // Call parent destroy to clean up event listeners, etc.
    super.destroy();
  }
}

export default NavbarComponent;
