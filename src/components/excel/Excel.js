import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';

export class Excel {
  constructor(selector, options) {
    this._rootElement = $(selector);
    this._components = options.components || [];
    this._emitter = new Emitter();
  }

  getRoot() {
    const root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this._emitter
    };

    this._components = this._components.map((Component) => {
      const element = $.create('div', Component.className);
      const component = new Component(element, componentOptions);
      element.html(component.toHTML());
      root.append(element);

      return component;
    });

    return root;
  }

  render() {
    this._rootElement.append(this.getRoot());

    this._components.forEach((component) => component.init());
  }

  destroy() {
    this._components.forEach((component) => component.destroy());
  }
}
