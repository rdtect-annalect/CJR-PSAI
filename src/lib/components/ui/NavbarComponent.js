import BaseComponent from '../base/BaseComponent.js';
import { $ } from '../../utils/dom.js';

export default class NavbarComponent extends BaseComponent {
  constructor(config = {}) {
    super(config);
    this.navbar = null;
    this.menuToggle = null;
    this.navMenu = null;
    this.isMenuOpen = false;
  }

  async init() {
    try {
      this.navbar = $('[data-navbar]');
      if (!this.navbar) throw new Error('Navbar not found');
      this.menuToggle = this.navbar.querySelector('.menu-toggle');
      this.navMenu = this.navbar.querySelector('.nav-menu');
      this.setupEventListeners();
      return this;
    } catch (error) {
      console.error('Failed to initialize NavbarComponent:', error);
      throw error;
    }
  }

  setupEventListeners() {
    if (this.menuToggle) {
      this.on(this.menuToggle, 'click', () => this.toggleMenu());
    }
    if (this.navMenu) {
      this.on(this.navMenu, 'click', (e) => {
        const link = e.target.closest('a');
        if (link) {
          if (this.isMenuOpen) this.closeMenu();
          this.updateActiveLink(link);
        }
      });
    }
    this.on(document, 'click', (e) => {
      if (this.isMenuOpen && !this.navbar.contains(e.target)) {
        this.closeMenu();
      }
    });
  }
  toggleMenu() {
    if (this.isMenuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isMenuOpen = true;
    this.navbar.classList.add('menu-open');
    this.navMenu?.classList.add('active'); // Fix: CSS expects .active on nav-menu
    this.menuToggle?.setAttribute('aria-expanded', 'true');
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.navbar.classList.remove('menu-open');
    this.navMenu?.classList.remove('active'); // Fix: CSS expects .active on nav-menu
    this.menuToggle?.setAttribute('aria-expanded', 'false');
  }

  updateActiveLink(activeLink) {
    const allLinks = this.navMenu.querySelectorAll('a');
    allLinks.forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
  }
}