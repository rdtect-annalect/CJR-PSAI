import { BaseComponent } from "./BaseComponent.js";
import { DOMUtils } from "../utils/DOMUtils.js";
import { ContactFormEnhancer } from "./ContactFormEnhancer.js";

/**
 * Manages form submission and validation
 */
export class FormManager extends BaseComponent {
  constructor(config = {}) {
    super(config);

    // DOM Elements - will be initialized in init()
    this.contactForm = null;
    this.contactFormEnhancer = null;
  }

  /**
   * Initialize form functionality
   */
  init() {
    super.init();

    this.contactForm = document.getElementById("contact-form");
    
    if (this.contactForm) {
      // Initialize the enhanced contact form
      this.contactFormEnhancer = new ContactFormEnhancer();
      this.contactFormEnhancer.init();
      
      // Subscribe to form submission events
      this.subscribe("formSubmitted", this.onFormSubmitted);
    }
  }

  /**
   * Handle form submission event
   * @param {Object} data - Form submission data
   */
  onFormSubmitted(data) {
    console.log("Form submitted:", data);
    // Here you would typically handle form data, send to server, etc.
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    if (this.contactFormEnhancer) {
      this.contactFormEnhancer.destroy();
    }
    
    super.destroy();
  }
}
