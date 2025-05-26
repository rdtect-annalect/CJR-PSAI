import { BaseComponent } from "./BaseComponent.js";
import { Throttle } from "../utils/Throttle.js";
import { DOMUtils } from "../utils/DOMUtils.js";

/**
 * Manages navigation and menu functionality
 */
export class NavigationManager extends BaseComponent {
  constructor(config = {}) {
    super({
      headerScrollThreshold: 100,
      scrollThrottle: 100,
      sectionObserverThreshold: 0.1,
      ...config,
    });

    // DOM Elements - will be initialized in init()
    this.mobileMenuBtn = null;
    this.navLinks = null;
    this.header = null;
    this.navItems = null;
    this.sections = null;
    this.lastScrollY = 0;
    this.observer = null;
  }

  /**
   * Initialize navigation functionality
   */
  init() {
    this.mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    this.navLinks = document.querySelector(".nav-links");
    this.header = document.getElementById("header");
    this.navItems = document.querySelectorAll(".nav-links a");
    this.sections = document.querySelectorAll("section[id]");
    this.lastScrollY = window.scrollY;

    this.initMobileMenu();
    this.initSectionTracking();
    this.initScrollEffects();
  }

  /**
   * Initialize mobile menu functionality
   */
  initMobileMenu() {
    if (!this.mobileMenuBtn || !this.navLinks) return;

    this.addSafeEventListener(
      this.mobileMenuBtn,
      "click",
      this.toggleMobileMenu
    );
    this.navItems.forEach((link) => {
      this.addSafeEventListener(link, "click", this.handleNavItemClick);
    });
    this.addSafeEventListener(document, "click", this.handleDocumentClick);
  }

  handleNavItemClick(e) {
    if (this.mobileMenuBtn.classList.contains("active")) {
      this.toggleMobileMenu();
    }
  }

  handleDocumentClick(e) {
    if (
      this.mobileMenuBtn.classList.contains("active") &&
      !e.target.closest(".nav-links") &&
      !e.target.closest(".mobile-menu-btn")
    ) {
      this.toggleMobileMenu();
    }
  }

  /**
   * Toggle mobile menu state
   */
  toggleMobileMenu() {
    const isOpening = !this.mobileMenuBtn.classList.contains("active");

    // Toggle active state
    this.mobileMenuBtn.classList.toggle("active");
    this.navLinks.classList.toggle("active");
    document.body.classList.toggle("no-scroll");

    // Add/remove scrolled class to header for better visual feedback
    if (isOpening) {
      this.header.classList.add("scrolled");
    } else if (window.scrollY < 100) {
      this.header.classList.remove("scrolled");
    }

    // Animate menu items with staggered delays
    if (isOpening) {
      this.navItems.forEach((item, index) => {
        item.style.setProperty("--i", index);
        item.style.opacity = "0";
        item.style.transform = "translateY(10px)";
      });
      // Trigger reflow
      void this.navItems[0].offsetHeight;
      this.navItems.forEach((item, index) => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      });
    } else {
      this.navItems.forEach((item) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(10px)";
      });
    }
  }

  /**
   * Initialize section tracking for navigation highlighting
   */
  initSectionTracking() {
    if (this.sections.length <= 0 || !this.header) return;

    const headerHeight = this.header.offsetHeight;
    const navLinks = document.querySelectorAll(".nav-links a");

    // Create intersection observer for section highlighting
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const navItem = document.querySelector(`.nav-links a[href="#${id}"]`);

          if (entry.isIntersecting) {
            // Remove active class from all nav items
            navLinks.forEach((item) => item.classList.remove("active"));
            // Add active class to corresponding nav item
            if (navItem) navItem.classList.add("active");
          }
        });
      },
      {
        root: null,
        rootMargin: `-${headerHeight}px 0px -70% 0px`,
        threshold: 0.1,
      }
    );

    // Observe all sections
    this.sections.forEach((section) => {
      observer.observe(section);
    });

    // Fallback for initial page load
    this.highlightNavItem();

    // Fallback for browsers that don't support IntersectionObserver
    if (!("IntersectionObserver" in window)) {
      window.addEventListener(
        "scroll",
        Throttle.create(this.highlightNavItem.bind(this), 100)
      );
    }
  }

  /**
   * Highlight the active nav item based on current scroll position
   */
  highlightNavItem() {
    if (!this.sections.length || !this.header) return;

    const scrollPosition = window.scrollY;
    const headerHeight = this.header.offsetHeight;
    const navLinks = document.querySelectorAll(".nav-links a");

    this.sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 20;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const correspondingNavItem = document.querySelector(
        `.nav-links a[href="#${sectionId}"]`
      );

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((item) => item.classList.remove("active"));
        if (correspondingNavItem) correspondingNavItem.classList.add("active");
      }
    });
  }

  /**
   * Initialize scroll effects for the header
   */
  initScrollEffects() {
    const handleScroll = Throttle.create(
      this.handleScrollEvent.bind(this),
      this.config.scrollThrottle
    );
    this.addSafeEventListener(window, "scroll", handleScroll);
    handleScroll();
  }

  handleScrollEvent() {
    const currentScrollY = window.scrollY;
    const scrollIndicator = document.querySelector(".hero-scroll-indicator");
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    // Add/remove scrolled class for header
    if (currentScrollY > 100) {
      this.header.classList.add("scrolled");
    } else {
      this.header.classList.remove("scrolled");
    }

    // Click handler for scroll indicator
    if (scrollIndicator && !scrollIndicator.hasClickListener) {
      scrollIndicator.hasClickListener = true;
      scrollIndicator.addEventListener("click", () => {
        const nextSection = document.getElementById("problem");
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Determine scroll direction and distance
    const scrollingDown = currentScrollY > this.lastScrollY;
    const scrollDistance = Math.abs(currentScrollY - this.lastScrollY);

    // Apply header classes based on scroll behavior
    if (currentScrollY > 100) {
      this.header.classList.add("scrolled");

      // Hide header when scrolling down fast, show when scrolling up
      if (scrollingDown && scrollDistance > 20) {
        this.header.classList.add("header-hidden");
      } else if (!scrollingDown) {
        this.header.classList.remove("header-hidden");
      }
    } else {
      this.header.classList.remove("scrolled", "header-hidden");
    }

    this.lastScrollY = currentScrollY;
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    super.destroy();
    // Any additional cleanup if needed
  }
}
