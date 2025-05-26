/**
 * @file ModalService-simple.js
 * @description Simplified modal service
 */

import BaseComponent from '../BaseComponent.js';
import events from '../events.js';
import { $ } from '../dom.js';

export default class ModalService extends BaseComponent {
  constructor() {
    super();
    this.activeModal = null;
  }

  init() {
    // Close modal on escape key
    this.on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && this.activeModal) {
        this.close();
      }
    });

    // Close modal on backdrop click
    this.on(document, 'click', (e) => {
      if (e.target.matches('.modal')) {
        this.close();
      }
    });

    // Close modal on close button click
    this.on(document, 'click', (e) => {
      if (e.target.matches('[data-close-modal]')) {
        this.close();
      }
    });

    // Listen for modal events
    events.on('modal:open', (modalId) => this.open(modalId));
    events.on('modal:close', () => this.close());

    return super.init();
  }

  open(modalId) {
    const modal = $(`#${modalId}`);
    if (!modal) return;

    this.activeModal = modal;
    modal.style.display = 'flex';
    requestAnimationFrame(() => modal.classList.add('show'));
    document.body.style.overflow = 'hidden';
    
    events.emit('modal:opened', modalId);
  }

  close() {
    if (!this.activeModal) return;

    this.activeModal.classList.remove('show');
    setTimeout(() => {
      this.activeModal.style.display = 'none';
      this.activeModal = null;
    }, 300);
    
    document.body.style.overflow = '';
    events.emit('modal:closed');
  }
}
