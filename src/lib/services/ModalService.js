/**
 * @file ModalService.js
 * @description Enhanced modal management service with accessibility features
 * @module services/ModalService
 */

import { BaseComponent, PSAI } from '../psai.js';
import eventBus from './EventBus.js';

/**
 * Modal service for managing modals across the application
 * @extends BaseComponent
 */
export class ModalService extends BaseComponent {
  /**
   * Create a new ModalService instance
   * @param {Object} config - Configuration options
   */
  constructor(config = {}) {
    super({
      modalSelector: '.modal',
      modalContainerSelector: '.modal-container',
      modalContentSelector: '.modal-content',
      closeButtonSelector: '[data-close-modal]',
      activeClass: 'show',
      animationDuration: 300,
      lockBodyScroll: true,
      closeOnEscape: true,
      closeOnOutsideClick: true,
      ...config
    });

    // Bind methods to preserve context
    if (typeof this.handleKeyDown === 'function') {
      this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    if (typeof this.handleOutsideClick === 'function') {
      this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }
    
    // State
    this.activeModal = null;
    this.modals = new Map();
    this.lastFocusedElement = null;
    this.firstFocusableElement = null;
    this.lastFocusableElement = null;
  }

  /**
   * Initialize the modal service
   * @returns {Promise} Promise that resolves when initialization is complete
   */
  init() {
    // Call parent init which returns a Promise
    return super.init().then(() => {
      // Find all modals
      this.findModals();
      
      // Setup global event listeners
      this.setupGlobalEvents();
      
      // Set up modal events via event bus
      this.setupEventBusListeners();
      
      // Emit initialized event
      this.emit('modal:initialized');
      
      return this;
    });
  }

  /**
   * Find all modals on the page
   */
  findModals() {
    const modalElements = document.querySelectorAll(this.config.modalSelector);
    
    modalElements.forEach(modal => {
      const id = modal.id;
      if (!id) return;
      
      // Store modal reference
      this.modals.set(id, {
        element: modal,
        container: modal.querySelector(this.config.modalContainerSelector),
        content: modal.querySelector(this.config.modalContentSelector),
        closeButton: modal.querySelector(this.config.closeButtonSelector),
        isOpen: false,
        data: null
      });
      
      // Set up modal-specific events
      this.setupModalEvents(id);
    });
  }

  /**
   * Set up global event listeners
   */
  setupGlobalEvents() {
    // Keyboard events (escape key)
    if (this.config.closeOnEscape) {
      this.addSafeEventListener(document, 'keydown', this.handleKeyDown);
    }
  }

  /**
   * Set up event bus listeners
   */
  setupEventBusListeners() {
    // Listen for open modal events
    this.listen('modal:open', ({ modalId, data }) => {
      this.openModal(modalId, data);
    });
    
    // Listen for close modal events
    this.listen('modal:close', ({ modalId }) => {
      this.closeModal(modalId);
    });
    
    // Listen for close all modals event
    this.listen('modal:closeAll', () => {
      this.closeAllModals();
    });
  }

  /**
   * Set up events for a specific modal
   * @param {string} modalId - Modal ID
   */
  setupModalEvents(modalId) {
    const modal = this.modals.get(modalId);
    if (!modal) return;
    
    // Close button click
    if (modal.closeButton) {
      this.addSafeEventListener(modal.closeButton, 'click', () => {
        this.closeModal(modalId);
      });
    }
    
    // Outside click (if enabled)
    if (this.config.closeOnOutsideClick) {
      this.addSafeEventListener(modal.element, 'click', (e) => {
        // Only close if clicking directly on the modal backdrop
        if (e.target === modal.element) {
          this.closeModal(modalId);
        }
      });
    }
  }

  /**
   * Handle keyboard events
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyDown(e) {
    if (!this.activeModal) return;
    
    // Close on escape key
    if (e.key === 'Escape' && this.config.closeOnEscape) {
      this.closeModal(this.activeModal);
    }
    
    // Handle tab key for focus trapping
    if (e.key === 'Tab') {
      this.handleTabKey(e);
    }
  }

  /**
   * Handle tab key for focus trapping
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleTabKey(e) {
    const modal = this.modals.get(this.activeModal);
    if (!modal || !this.firstFocusableElement || !this.lastFocusableElement) return;
    
    // If shift + tab and on first element, move to last
    if (e.shiftKey && document.activeElement === this.firstFocusableElement) {
      e.preventDefault();
      this.lastFocusableElement.focus();
    } 
    // If tab and on last element, move to first
    else if (!e.shiftKey && document.activeElement === this.lastFocusableElement) {
      e.preventDefault();
      this.firstFocusableElement.focus();
    }
  }

  /**
   * Get focusable elements within a modal
   * @param {Element} modalElement - Modal element
   * @returns {Array<Element>} Array of focusable elements
   */
  getFocusableElements(modalElement) {
    const focusableSelectors = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(modalElement.querySelectorAll(focusableSelectors));
  }

  /**
   * Set up focus trapping for a modal
   * @param {string} modalId - Modal ID
   */
  setupFocusTrap(modalId) {
    const modal = this.modals.get(modalId);
    if (!modal) return;
    
    // Get all focusable elements
    const focusableElements = this.getFocusableElements(modal.element);
    
    if (focusableElements.length) {
      this.firstFocusableElement = focusableElements[0];
      this.lastFocusableElement = focusableElements[focusableElements.length - 1];
      
      // Focus the first element
      this.firstFocusableElement.focus();
    } else {
      // If no focusable elements, focus the modal itself
      modal.element.setAttribute('tabindex', '-1');
      modal.element.focus();
    }
  }

  /**
   * Open a modal
   * @param {string} modalId - Modal ID
   * @param {Object} data - Modal data
   */
  openModal(modalId, data = null) {
    const modal = this.modals.get(modalId);
    if (!modal || modal.isOpen) return;
    
    // Store active modal
    this.activeModal = modalId;
    
    // Store last focused element
    this.lastFocusedElement = document.activeElement;
    
    // Store modal data
    modal.data = data;
    
    // Update modal state
    modal.isOpen = true;
    
    // Update ARIA attributes
    modal.element.setAttribute('aria-hidden', 'false');
    
    // Show modal
    modal.element.style.display = 'flex';
    
    // Add active class (with small delay to ensure display change takes effect)
    setTimeout(() => {
      modal.element.classList.add(this.config.activeClass);
    }, 10);
    
    // Lock body scroll if enabled
    if (this.config.lockBodyScroll) {
      document.body.style.overflow = 'hidden';
    }
    
    // Set up focus trap
    this.setupFocusTrap(modalId);
    
    // Trigger custom event
    this.emit('modal:opened', { modalId, data });
  }

  /**
   * Close a modal
   * @param {string} modalId - Modal ID
   */
  closeModal(modalId) {
    const modal = this.modals.get(modalId);
    if (!modal || !modal.isOpen) return;
    
    // Update modal state
    modal.isOpen = false;
    
    // Remove active class
    modal.element.classList.remove(this.config.activeClass);
    
    // Hide modal after animation completes
    setTimeout(() => {
      modal.element.style.display = 'none';
      modal.element.setAttribute('aria-hidden', 'true');
      
      // Clear active modal if this is the active one
      if (this.activeModal === modalId) {
        this.activeModal = null;
      }
      
      // Restore focus
      if (this.lastFocusedElement) {
        this.lastFocusedElement.focus();
        this.lastFocusedElement = null;
      }
      
      // Clear focusable elements
      this.firstFocusableElement = null;
      this.lastFocusableElement = null;
    }, this.config.animationDuration);
    
    // Unlock body scroll if enabled and no other modals are open
    if (this.config.lockBodyScroll && !this.hasOpenModals()) {
      document.body.style.overflow = '';
    }
    
    // Trigger custom event
    this.emit('modal:closed', { modalId, data: modal.data });
    
    // Clear modal data
    modal.data = null;
  }

  /**
   * Close all open modals
   */
  closeAllModals() {
    this.modals.forEach((modal, modalId) => {
      if (modal.isOpen) {
        this.closeModal(modalId);
      }
    });
  }

  /**
   * Check if any modals are open
   * @returns {boolean} True if any modals are open
   */
  hasOpenModals() {
    for (const [_, modal] of this.modals.entries()) {
      if (modal.isOpen) return true;
    }
    return false;
  }

  /**
   * Update modal content
   * @param {string} modalId - Modal ID
   * @param {string|Element} content - New content (HTML string or Element)
   */
  updateContent(modalId, content) {
    const modal = this.modals.get(modalId);
    if (!modal || !modal.content) return;
    
    // Update content
    if (typeof content === 'string') {
      modal.content.innerHTML = content;
    } else if (content instanceof Element) {
      modal.content.innerHTML = '';
      modal.content.appendChild(content);
    }
    
    // Trigger custom event
    this.emit('modal:contentUpdated', { modalId });
  }

  /**
   * Get modal data
   * @param {string} modalId - Modal ID
   * @returns {Object|null} Modal data
   */
  getModalData(modalId) {
    const modal = this.modals.get(modalId);
    return modal ? modal.data : null;
  }

  /**
   * Check if a modal is open
   * @param {string} modalId - Modal ID
   * @returns {boolean} True if modal is open
   */
  isModalOpen(modalId) {
    const modal = this.modals.get(modalId);
    return modal ? modal.isOpen : false;
  }

  /**
   * Pause the service (for when tab is inactive)
   * Override from BaseComponent
   */
  pause() {
    // Nothing to pause
  }

  /**
   * Resume the service
   * Override from BaseComponent
   */
  resume() {
    // Nothing to resume
  }
}

export default ModalService;
