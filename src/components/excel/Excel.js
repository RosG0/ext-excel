import {$} from '@core/dom';

export class Excel {
  constructor(selector, options) {
    this._rootElement = $(selector);
    this._components = options.components || [];
  }

  getRoot() {
    const root = $.create('div', 'excel');

    this._components = this._components.map((Component) => {
      const element = $.create('div', Component.className);
      const component = new Component(element);
      element.html(component.toHTML());
      root.append(element);

      return component;
    });

    return root;
  }

  render() {
    this._rootElement.append(this.getRoot());

    this._components.forEach((component) => {
      component.init();
    });
  }
}
