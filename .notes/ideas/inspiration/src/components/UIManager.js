import { BaseComponent } from "./BaseComponent.js";
import { RoleSelector } from "./RoleSelector.js";
import { NavigationManager } from "./NavigationManager.js";
import { ScrollManager } from "./ScrollManager.js";
import { AnimationManager } from "./AnimationManager.js";
import { FormManager } from "./FormManager.js";
import { HeroAnimationManager } from "./HeroAnimationManager.js";
import { ContactFormEnhancer } from "./ContactFormEnhancer.js";
import "./KeywordAnimationFix.js"; // Import the fix

/**
 * Main UI Manager that coordinates all UI components
 */
export class UIManager extends BaseComponent {
  constructor(config = {}) {
    // Default configuration with any provided overrides
    super({
      scheduleText:
        "I wish to schedule a call to discuss executive search options.",
      ...config,
    });

    // Component registry
    this.components = {};

    // Register default components
    this.registerComponent("roleSelector", new RoleSelector(this.config));
    this.registerComponent("navigationManager", new NavigationManager());
    this.registerComponent("scrollManager", new ScrollManager());
    this.registerComponent("animationManager", new AnimationManager());
    this.registerComponent("formManager", new FormManager());
    this.registerComponent("heroAnimationManager", new HeroAnimationManager());
  }

  /**
   * Register a component
   * @param {string} name - The name of the component
   * @param {BaseComponent} component - The component instance
   * @returns {UIManager} - This instance for chaining
   */
  registerComponent(name, component) {
    this.components[name] = component;
    return this;
  }

  /**
   * Get a component by name
   * @param {string} name - The name of the component
   * @returns {BaseComponent} - The component instance
   */
  getComponent(name) {
    return this.components[name];
  }

  /**
   * Initialize all UI components
   */
  init() {
    // Call parent init
    super.init();

    // Initialize all components
    const initComponents = () => {
      Object.values(this.components).forEach((component) => {
        try {
          component.init();
        } catch (error) {
          console.error(`Error initializing component:`, error);
        }
      });

      // Reset role selector on page load
      if (this.components.roleSelector && this.components.roleSelector.reset) {
        this.components.roleSelector.reset();
      }
    };

    // Initialize on DOM content loaded
    if (document.readyState === "loading") {
      this.addSafeEventListener(document, "DOMContentLoaded", initComponents);
    } else {
      // DOM already loaded, initialize immediately
      initComponents();
    }
  }

  /**
   * Clean up all components
   */
  destroy() {
    // Destroy all components
    Object.values(this.components).forEach((component) => {
      if (component.destroy) {
        try {
          component.destroy();
        } catch (error) {
          console.error(`Error destroying component:`, error);
        }
      }
    });

    // Call parent destroy
    super.destroy();
  }
}
