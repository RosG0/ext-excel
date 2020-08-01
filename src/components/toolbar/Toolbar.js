import {createToolbar} from '@/components/toolbar/toolbar.template';
import {$} from '@core/dom';
import {ExcelStateComponent} from '@core/ExcelStateComponent';
import {defaultStyles} from '@/constants';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  get template() {
    return createToolbar(this._state || {});
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  onClick(event) {
    const target = $(event.target);
    if (target.getData('type') === 'button') {
      const value = JSON.parse(target.getData('value'));

      this._emit('styleChanged', value);

      const key = Object.keys(value)[0];
      this.setState({[key]: value[key]});
    }
  }

  toHTML() {
    return this.template;
  }
}
