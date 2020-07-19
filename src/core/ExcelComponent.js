import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners);
    this._name = options.name;
    this._emitter = options.emitter;
    this._unsubscribers = [];

    this._beforeInit();
  }

  _beforeInit() {
  }

  /**
   * Возвращает базовый шаблон компонента
   * @return {string}
   */
  toHTML() {
    return '';
  }

  // protected
  _emit(event, ...args) {
    this._emitter.emit(event, ...args);
  }
  _on(event, func) {
    const unsub = this._emitter.subscribe(event, func);
    this._unsubscribers.push(unsub);
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
    this._unsubscribers.forEach((unsub) => unsub());
  }
}
