import {capitalize} from '@core/helper';

export class DomListener {
  constructor(root, listeners = []) {
    if (!root) {
      throw new Error('Отсутствует root в базовом модуле управления событиями');
    }
    this._root = root;
    this._listeners = listeners;
  }

  initDOMListeners() {
    this._listeners.forEach((listener) => {
      const method = getListenerFuncName(listener);
      if (!this[method]) {
        throw new Error(`Метод ${method} не сущетсвует в классе ${this._name}`);
      }
      this[method] = this[method].bind(this);

      this._root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this._listeners.forEach((listener) => {
      this._root.off(listener, this[getListenerFuncName(listener)]);
    });
  }
}

function getListenerFuncName(eventName) {
  return `on${capitalize(eventName)}`;
}
