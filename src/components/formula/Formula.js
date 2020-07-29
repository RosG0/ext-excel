import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor(root, options) {
    super(root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    });
  }

  init() {
    super.init();
    this._formula = this._root.find('.excel__formula-input');
    this._on('tableSelectedCell', (cell) => {
      this._formula.text(cell.getData('value'));
    });
    // this._on('tableCellValueChanged', (cell) => {
    //   this._formula.text(cell.text());
    // });
    // this._subscribe((state) => {
    //   this._formula.text(state.currentText);
    // });
  }

  storeChanged({currentText}) {
    this._formula.text(currentText);
  }

  toHTML() {
    return '<div class="excel__formula-info">f(x)</div>\n' +
      // eslint-disable-next-line max-len
      '<div class="excel__formula-input" contenteditable="true" spellcheck="false"></div>';
  }

  onInput(event) {
    this._emit('formulaTextChanged', $(event.target).text(), event);
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();
      this._emit('formulaEnter', event);
    }
  }
}
