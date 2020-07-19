const SELECTED_CLASS = 'cell_selected';

export default class TableSelection {
  constructor() {
    this._group = [];
    this._current = null;
  }

  get current() {
    return this._current;
  }

  select(element) {
    this.clear();
    this._group.push(element);
    element.focus().addClass(SELECTED_CLASS);
    this._current = element;
  }

  selectGroup(group = []) {
    this.clear();
    this._group = group;
    this._group.forEach((element) => element.addClass(SELECTED_CLASS));
  }

  clear() {
    this._group.forEach((element) => element.removeClass(SELECTED_CLASS));
    this._group = [];
  }
}
