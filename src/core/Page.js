export class Page {
  constructor(params) {
    this._params = params;
  }

  getRoot() {
    throw new Error('Отсутствует метод getRoot');
  }

  afterRender() {
  }

  destroy() {
  }
}
