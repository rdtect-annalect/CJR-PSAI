/**
 * @file AppService.js
 * @description Application service for component registration and lifecycle management
 */

import eventBus from './EventBus.js';

class AppService {
  constructor() {
    this.components = new Map();
    this.debug = false;
  }

  register(name, component) {
    this.components.set(name, component);
    if (this.debug) console.log(`📦 Registered: ${name}`);
    return this;
  }

  get(name) {
    return this.components.get(name);
  }

  async init() {
    const promises = [];
    for (const [name, component] of this.components) {
      promises.push(
        Promise.resolve(component.init?.()).catch(err => {
          console.error(`❌ ${name} init failed:`, err);
        })
      );
    }
    await Promise.all(promises);
    eventBus.emit('app:ready');
    if (this.debug) console.log('✅ App ready');
    return this;
  }

  destroy() {
    this.components.forEach((component, name) => {
      try {
        component.destroy?.();
      } catch (err) {
        console.error(`❌ ${name} destroy failed:`, err);
      }
    });
    this.components.clear();
    eventBus.clear();
  }
}

export default new AppService();
