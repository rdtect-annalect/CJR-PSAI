/**
 * @file BaseComponent.js
 * @description Minimal component base with cleanup
 */

export default class BaseComponent {
  constructor(config = {}) {
    this.config = config;
    this._cleanup = [];
  }

  // Helper to track cleanup functions
  track(cleanupFn) {
    this._cleanup.push(cleanupFn);
    return cleanupFn;
  }

  // Add event with auto cleanup
  on(element, type, handler, options) {
    element.addEventListener(type, handler, options);
    this.track(() => element.removeEventListener(type, handler, options));
    return this;
  }

  // Set timeout with auto cleanup
  timeout(callback, delay) {
    const id = setTimeout(callback, delay);
    this.track(() => clearTimeout(id));
    return id;
  }

  // Set interval with auto cleanup
  interval(callback, delay) {
    const id = setInterval(callback, delay);
    this.track(() => clearInterval(id));
    return id;
  }

  async init() {
    return this;
  }

  destroy() {
    this._cleanup.forEach(fn => fn());
    this._cleanup = [];
    return this;
  }
}
