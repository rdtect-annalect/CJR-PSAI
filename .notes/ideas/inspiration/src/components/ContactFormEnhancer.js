// Contact Form Enhancement Script
import { BaseComponent } from "./BaseComponent.js";
import { DOMUtils } from "../utils/DOMUtils.js";

/**
 * Enhanced contact form with improved validation, feedback, and animations
 */
export class ContactFormEnhancer extends BaseComponent {
  constructor(config = {}) {
    super(config);

    // DOM Elements - will be initialized in init()
    this.contactForm = null;
    this.formWrapper = null;
    this.submitBtn = null;
    this.selectRolesBtn = null;
    this.selectedRoles = null;
    this.selectedRolesInput = null;
    this.inputs = [];
    
    // Sample roles for demonstration
    this.sampleRoles = [
      'CTO', 'VP Engineering', 'Product Manager', 'Director of AI',
      'Engineering Manager', 'Technical Lead', 'Data Science Lead'
    ];
  }

  /**
   * Initialize form functionality
   */
  init() {
    super.init();

    this.contactForm = document.getElementById("contact-form");
    if (!this.contactForm) return;
    
    this.formWrapper = this.contactForm.closest('.contact-form-wrapper');
    this.submitBtn = document.getElementById('contact-submit-btn');
    this.selectRolesBtn = document.getElementById('selectRolesBtn');
    this.selectedRoles = document.getElementById('selectedRoles');
    this.selectedRolesInput = document.getElementById('selectedRolesInput');
    this.inputs = this.contactForm.querySelectorAll('.floating-input');
    
    this.enhanceInputFields();
    this.setupFormValidation();
    this.enhanceRoleSelection();
    this.initFormSubmission();
  }

  /**
   * Enhance form input fields with better focus handling
   */
  enhanceInputFields() {
    if (!this.inputs.length) return;
    
    this.inputs.forEach(input => {
      // Add focus classes to parent when input is focused
      this.addSafeEventListener(input, 'focus', () => {
        if (this.formWrapper) {
          this.formWrapper.classList.add('form-active');
        }
      });
      
      this.addSafeEventListener(input, 'blur', () => {
        if (this.formWrapper) {
          this.formWrapper.classList.remove('form-active');
        }
      });
    });
  }

  /**
   * Set up enhanced form validation
   */
  setupFormValidation() {
    this.inputs.forEach(input => {
      // Handle validation feedback
      this.addSafeEventListener(input, 'invalid', (event) => {
        // Prevent the browser's default error popup
        event.preventDefault();
        input.classList.add('has-error');
        
        // Mark parent wrapper with error state
        const parentGroup = input.closest('.floating-label-group');
        if (parentGroup) {
          parentGroup.classList.add('has-error');
        }
      });
      
      this.addSafeEventListener(input, 'input', () => {
        input.classList.remove('has-error');
        
        // Remove error state from parent
        const parentGroup = input.closest('.floating-label-group');
        if (parentGroup) {
          parentGroup.classList.remove('has-error');
        }
      });
    });
  }

  /**
   * Enhance role selection functionality
   */
  enhanceRoleSelection() {
    if (!this.selectRolesBtn || !this.selectedRoles) return;
    
    // Simulate role selection (in a real app, this would connect to the expertise section)
    this.addSafeEventListener(this.selectRolesBtn, 'click', (e) => {
      e.preventDefault();
      
      // Navigate to expertise section
      const expertiseSection = document.getElementById('expertise');
      if (expertiseSection) {
        expertiseSection.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Clear the "No roles selected" message if present
      const noRolesMessage = this.selectedRoles.querySelector('.no-roles-message');
      if (noRolesMessage) {
        noRolesMessage.remove();
      }
      
      // Get currently selected roles
      const currentRoles = Array.from(this.selectedRoles.querySelectorAll('.role-tag'))
        .map(tag => tag.getAttribute('data-role'));
      
      // Add a random role that isn't already selected
      const availableRoles = this.sampleRoles.filter(role => !currentRoles.includes(role));
      
      if (availableRoles.length > 0) {
        const randomRole = availableRoles[Math.floor(Math.random() * availableRoles.length)];
        this.addRoleTag(randomRole);
        
        // Update hidden input with all selected roles
        this.updateSelectedRolesInput();
      }
    });
  }

  /**
   * Add a role tag to the selected roles area
   * @param {string} role - The role to add
   */
  addRoleTag(role) {
    const roleTag = document.createElement('div');
    roleTag.className = 'role-tag';
    roleTag.setAttribute('data-role', role);
    roleTag.innerHTML = `
      ${role}
      <span class="role-remove" aria-label="Remove ${role}">×</span>
    `;
    
    // Add remove functionality
    const removeBtn = roleTag.querySelector('.role-remove');
    this.addSafeEventListener(removeBtn, 'click', () => {
      roleTag.remove();
      
      // If no roles left, show the placeholder
      if (this.selectedRoles.children.length === 0) {
        this.selectedRoles.innerHTML = `
          <span class="no-roles-message">No roles selected yet. Click "Select Roles" to choose positions you're interested in.</span>
        `;
      }
      
      // Update hidden input
      this.updateSelectedRolesInput();
    });
    
    this.selectedRoles.appendChild(roleTag);
  }

  /**
   * Update the hidden input with selected roles
   */
  updateSelectedRolesInput() {
    if (!this.selectedRolesInput) return;
    
    const roles = Array.from(this.selectedRoles.querySelectorAll('.role-tag'))
      .map(tag => tag.getAttribute('data-role'));
    
    this.selectedRolesInput.value = roles.join(', ');
  }

  /**
   * Initialize form submission handling
   */
  initFormSubmission() {
    if (!this.contactForm || !this.submitBtn) return;

    this.addSafeEventListener(
      this.contactForm,
      "submit",
      this.handleFormSubmit
    );
  }

  /**
   * Handle form submission
   * @param {Event} e - The submit event
   */
  handleFormSubmit(e) {
    e.preventDefault();

    // Don't submit if there are validation errors
    const invalidInputs = Array.from(this.inputs).filter(input => !input.validity.valid);
    if (invalidInputs.length > 0) {
      invalidInputs[0].focus();
      return;
    }

    // Show loading state
    this.submitBtn.classList.add("loading");
    
    // Publish the form submission event
    this.publish("formSubmitted", {
      formId: this.contactForm.id,
      formData: new FormData(this.contactForm),
    });

    // Simulate form submission (replace with actual form submission in production)
    setTimeout(() => {
      this.showSuccessMessage();
      this.submitBtn.classList.remove("loading");
      
      // Reset form
      this.contactForm.reset();
      
      // Reset role selection
      if (this.selectedRoles) {
        this.selectedRoles.innerHTML = `
          <span class="no-roles-message">No roles selected yet. Click "Select Roles" to choose positions you're interested in.</span>
        `;
      }
      if (this.selectedRolesInput) {
        this.selectedRolesInput.value = '';
      }
    }, 1500);
  }

  /**
   * Show success message after form submission
   */
  showSuccessMessage() {
    // Create success message element
    const successMessage = DOMUtils.createElement(
      "div",
      { className: "form-success-message" },
      `
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <p>Thank you for reaching out!</p>
      <p class="success-detail">We've received your message and will get back to you within 24 hours.</p>
      `
    );

    // Animate form out and replace with success message
    DOMUtils.animateElement(this.contactForm, { opacity: "0" }, 500).then(
      () => {
        // Hide form temporarily
        this.contactForm.style.display = "none";
        
        // Add success message
        this.formWrapper.appendChild(successMessage);

        // Animate success message in
        setTimeout(() => {
          successMessage.classList.add("visible");
        }, 50);
        
        // Reset after some time
        setTimeout(() => {
          // Fade out success message
          successMessage.classList.remove("visible");
          
          setTimeout(() => {
            // Remove success message and show form again
            successMessage.remove();
            this.contactForm.style.display = "";
            
            // Animate form back in
            DOMUtils.animateElement(this.contactForm, { opacity: "1" }, 500);
          }, 500);
        }, 4000);
      }
    );
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    super.destroy();
  }
}
