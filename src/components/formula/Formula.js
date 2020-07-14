import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  constructor(root) {
    super(root, {
      name: 'Formula',
      listeners: ['input']
    });
  }

  toHTML() {
    return '<div class="excel__formula-info">f(x)</div>\n' +
      // eslint-disable-next-line max-len
      '<div class="excel__formula-input" contenteditable="true" spellcheck="false"></div>';
  }

  onInput(event) {
    console.log(event);
  }
}
