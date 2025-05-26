/**
 * @file App.js
 * @description Simple app management with component registration
 */

import events from './events.js';

class App {
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
    events.emit('app:ready');
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
    events.clear();
  }
}

export default new App();
