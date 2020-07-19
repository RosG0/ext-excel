export class Emitter {
  constructor() {
    this._listeners = {};
  }

  emit(eventName, ...args) {
    if (Array.isArray(this._listeners[eventName])) {
      this._listeners[eventName].forEach((handler) => handler(...args));
    }
  }

  subscribe(eventName, func) {
    this._listeners[eventName] = this._listeners[eventName] || [];
    this._listeners[eventName].push(func);

    return () => {
      this._listeners[eventName] = this._listeners[eventName]
          .filter((listener) => listener !== func);
    };
  }
}
