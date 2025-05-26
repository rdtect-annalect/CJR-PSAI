import { BaseComponent } from "./BaseComponent.js";
import { Throttle } from "../utils/Throttle.js";

/**
 * Manages scroll-related functionality
 */
export class ScrollManager extends BaseComponent {
  constructor(config = {}) {
    super({
      backToTopThreshold: 500,
      footerObserverThreshold: 0.15,
      scrollThrottle: 100,
      ...config,
    });
    // DOM Elements - will be initialized in init()
    this.backToTopBtn = null;
    this.footer = null;
    this.isFooterVisible = false;
    this.footerObserver = null;
  }

  /**
   * Initialize scroll functionality
   */
  init() {
    super.init();
    this.initBackToTopButton();
    this.initServicesTabs();
  }

  /**
   * Initialize back to top button functionality
   */
  initBackToTopButton() {
    // Create back to top button
    this.backToTopBtn = document.createElement("button");
    this.backToTopBtn.id = "backToTopBtn";
    this.backToTopBtn.className = "back-to-top-btn";
    this.backToTopBtn.innerHTML = "<span>↑</span>";
    this.backToTopBtn.title = "Back to top";
    document.body.appendChild(this.backToTopBtn);

    // Setup footer visibility detection
    this.footer = document.querySelector("footer");
    this.isFooterVisible = false;

    if (this.footer) {
      this.footerObserver = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            this.isFooterVisible = entry.isIntersecting;
            this.updateBackToTopVisibility();
          });
        },
        { threshold: this.config.footerObserverThreshold }
      );
      this.footerObserver.observe(this.footer);
    }

    // Add scroll event listener
    this.addSafeEventListener(
      window,
      "scroll",
      Throttle.create(
        this.updateBackToTopVisibility.bind(this),
        this.config.scrollThrottle
      )
    );

    // Add click event to scroll to top
    this.addSafeEventListener(
      this.backToTopBtn,
      "click",
      this.handleBackToTopClick
    );
  }

  handleBackToTopClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  /**
   * Update back to top button visibility
   */
  updateBackToTopVisibility() {
    if (!this.backToTopBtn) return;

    if (
      window.scrollY > this.config.backToTopThreshold &&
      !this.isFooterVisible
    ) {
      this.backToTopBtn.classList.add("visible");
    } else {
      this.backToTopBtn.classList.remove("visible");
    }
  }

  /**
   * Initialize services tabs functionality
   */
  initServicesTabs() {
    const tabs = document.querySelectorAll(".service-tab");
    const panels = document.querySelectorAll(".service-panel");

    if (tabs.length > 0 && panels.length > 0) {
      tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
          // Remove active class from all tabs
          tabs.forEach((t) => t.classList.remove("active"));
          // Add active class to clicked tab
          tab.classList.add("active");

          // Get the service type from data attribute
          const serviceType = tab.getAttribute("data-service");

          // Hide all panels
          panels.forEach((panel) => {
            panel.classList.remove("active");
            // Fade out effect
            panel.style.opacity = "0";
          });

          // Show the selected panel
          const activePanel = document.getElementById(`${serviceType}-panel`);
          if (activePanel) {
            activePanel.classList.add("active");
            // Slight delay for the fade-in effect
            setTimeout(() => {
              activePanel.style.opacity = "1";
            }, 50);
          }
        });
      });
    }
  }

  /**
   * Clean up event listeners and observers
   */
  destroy() {
    if (this.footerObserver) {
      this.footerObserver.disconnect();
    }
    super.destroy();
  }
}
