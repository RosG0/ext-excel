import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Отсутствует селектор для Router');
    }

    this._placeHolder = selector;
    this._routes = routes;
    this._page = null;

    this._changePageHandler = this._changePageHandler.bind(this);

    this.init();
  }

  init() {
    window.addEventListener('hashchange', this._changePageHandler);
    this._changePageHandler();
  }

  _changePageHandler(event) {
    if (this._page) {
      this._page.destroy();
    }
    this._placeHolder.clear();

    const Page = ActiveRoute.path.includes('excel') ?
      this._routes.excel :
      this._routes.dashboard;

    this._page = new Page(ActiveRoute.param);

    this._placeHolder.append(this._page.getRoot());
    this._page.afterRender();
  }

  destroy() {
    window.removeEventListener('hashchange', this._changePageHandler);
  }
}
