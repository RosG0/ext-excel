import {ActiveRoute} from './ActiveRoute';
import {$} from '../dom';
import {Loader} from '@/components/Loader';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Отсутствует селектор для Router');
    }

    this._placeHolder = $(selector);
    this._routes = routes;
    this._loader = new Loader();

    this._page = null;

    this._changePageHandler = this._changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this._changePageHandler);
    this._changePageHandler();
  }

  async _changePageHandler(event) {
    if (this._page) {
      this._page.destroy();
    }
    this._placeHolder.clear().append(this._loader);

    const Page = ActiveRoute.path.includes('excel') ?
      this._routes.excel :
      this._routes.dashboard;

    this._page = new Page(ActiveRoute.param);

    const root = await this._page.getRoot();

    this._placeHolder.clear().append(root);
    this._page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this._changePageHandler);
  }
}
