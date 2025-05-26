/**
 * Utility class for common DOM operations
 */
export class DOMUtils {
  /**
   * Create an element with attributes and children
   * @param {string} tag - The tag name
   * @param {Object} attributes - The attributes to set
   * @param {string|Node|Array<Node>} children - The children to append
   * @returns {HTMLElement} - The created element
   */
  static createElement(tag, attributes = {}, children = null) {
    const element = document.createElement(tag);

    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
      if (key === "classList" && Array.isArray(value)) {
        value.forEach((cls) => element.classList.add(cls));
      } else if (key === "style" && typeof value === "object") {
        Object.entries(value).forEach(([prop, val]) => {
          element.style[prop] = val;
        });
      } else if (key.startsWith("on") && typeof value === "function") {
        element.addEventListener(key.substring(2).toLowerCase(), value);
      } else {
        element.setAttribute(key, value);
      }
    });

    // Add children
    if (children) {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          if (child) {
            this.appendToElement(element, child);
          }
        });
      } else {
        this.appendToElement(element, children);
      }
    }

    return element;
  }

  /**
   * Append a child to an element
   * @param {HTMLElement} element - The element to append to
   * @param {string|Node} child - The child to append
   */
  static appendToElement(element, child) {
    if (typeof child === "string" || typeof child === "number") {
      element.appendChild(document.createTextNode(child));
    } else if (child instanceof Node) {
      element.appendChild(child);
    }
  }

  /**
   * Set CSS transition for smooth animation
   * @param {HTMLElement} element - The element to animate
   * @param {Object} properties - The properties to animate
   * @param {number} duration - The duration in ms
   * @param {string} easing - The easing function
   * @returns {Promise} - Resolves when the animation is complete
   */
  static animateElement(element, properties, duration = 300, easing = "ease") {
    return new Promise((resolve) => {
      // Save original transition
      const originalTransition = element.style.transition;

      // Set new transition
      element.style.transition = Object.keys(properties)
        .map((prop) => `${prop} ${duration}ms ${easing}`)
        .join(", ");

      // Set up transitionend listener
      const onTransitionEnd = () => {
        element.removeEventListener("transitionend", onTransitionEnd);
        element.style.transition = originalTransition;
        resolve();
      };

      element.addEventListener("transitionend", onTransitionEnd, {
        once: true,
      });

      // Force reflow
      element.offsetHeight;

      // Apply new properties
      Object.entries(properties).forEach(([prop, value]) => {
        element.style[prop] = value;
      });

      // Safety timeout in case transitionend doesn't fire
      setTimeout(onTransitionEnd, duration + 50);
    });
  }

  /**
   * Check if an element is in the viewport
   * @param {HTMLElement} element - The element to check
   * @param {number} offset - Offset before element is considered in viewport
   * @returns {boolean} - Whether the element is in the viewport
   */
  static isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= window.innerHeight - offset &&
      rect.left <= window.innerWidth - offset &&
      rect.bottom >= offset &&
      rect.right >= offset
    );
  }
}
