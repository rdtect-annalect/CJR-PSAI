/**
 * @file EventBus.js
 * @description Event bus service for component communication
 */

class EventBus {
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

export default new EventBus();
