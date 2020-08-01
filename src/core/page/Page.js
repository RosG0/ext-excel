export class Page {
  constructor(params) {
    this._params = params || Date.now().toString();
  }

  getRoot() {
    throw new Error('Отсутствует метод getRoot');
  }

  afterRender() {
  }

  destroy() {
  }
}
