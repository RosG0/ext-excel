import {$} from '@core/dom';
import {Emitter} from '@core/Emitter';
import {StoreSubscriber} from '@core/StoreSubscriber';
import {updateDate} from '@/redux/actions';
import {preventDefault} from '@core/helper';

export class Excel {
  constructor(options) {
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

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault);
    }
    this._store.dispatch(updateDate());

    this._subscriber.subscribeComponents(this._components);
    this._components.forEach((component) => component.init());
  }

  destroy() {
    this._subscriber.unsubscribeFromStore();
    document.removeEventListener('contextmenu', preventDefault);
    this._components.forEach((component) => component.destroy());
  }
}
