import {ExcelComponent} from '@core/ExcelComponent';

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args);
  }

  get template() {
    return JSON.stringify(this._state, null, 2);
  }

  initState(state = {}) {
    this._state = {...state};
  }

  setState(newState) {
    this._state = {...this._state, ...newState};
    this._root.html(this.template);
  }
}
