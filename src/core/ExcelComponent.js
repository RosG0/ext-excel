import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor(root, options = {}) {
    super(root, options.listeners);
    this._name = options.name;
  }

  /**
   * Возвращает базовый шаблон компонента
   * @return {string}
   */
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }
  destroy() {
    this.removeDOMListeners();
  }
}
