/**
 * @file events.js
 * @description Minimal event system for component communication
 */

class SimpleEventBus {
  constructor() {
    this._events = new Map();
  }

  on(event, handler) {
    if (!this._events.has(event)) {
      this._events.set(event, new Set());
    }
    this._events.get(event).add(handler);
    
    // Return unsubscribe function
    return () => this._events.get(event)?.delete(handler);
  }

  emit(event, data) {
    this._events.get(event)?.forEach(handler => handler(data));
  }

  clear() {
    this._events.clear();
  }
}

export default new SimpleEventBus();
