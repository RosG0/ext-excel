import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';

export class Excel {
  constructor(selector, options) {
    this._rootElement = $(selector);
    this._components = options.components || [];
    this._emitter = new Emitter();
    this._store = options.store;
    this._subscriber = new StoreSubscriber(this._store);
  }

  getRoot() {
    const root = $.create('div', 'excel');
    const componentOptions = {
      emitter: this._emitter,
      store: this._store
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
    this._subscriber.subscribeComponents(this._components);
    this._components.forEach((component) => component.init());
  }

  destroy() {
    this._subscriber.unsubscribeFromStore();
    this._components.forEach((component) => component.destroy());
  }
}
