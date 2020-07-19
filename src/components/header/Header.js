import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor(root, options) {
    super(root, {
      name: 'Header',
      ...options
    });
  }

  toHTML() {
    return '       <input class="excel__title-input"\n' +
      '                   type="text"\n' +
      '                   value="Новая таблица"/>\n' +
      '            <div class="excel__header-buttons">\n' +
      '                <div class="excel__button excel__button-delete">\n' +
      '                       <span class="material-icons">\n' +
      '                            delete\n' +
      '                       </span>\n' +
      '                </div>\n' +
      '                <div class="excel__button excel__button-exit">\n' +
      '                        <span class="material-icons">\n' +
      '                            clear\n' +
      '                        </span>\n' +
      '                </div>\n' +
      '            </div>';
  }
}
