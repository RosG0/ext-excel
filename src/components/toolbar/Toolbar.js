import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor(root, options) {
    super(root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    });
  }

  onClick(event) {
    console.log(event.target);
  }

  toHTML() {
    return '<div class="excel__button excel__button-exit">\n' +
      '                        <span class="material-icons">\n' +
      '                            format_align_left\n' +
      '                        </span>\n' +
      '            </div>\n' +
      '            <div class="excel__button excel__button-exit">\n' +
      '                        <span class="material-icons">\n' +
      '                            format_align_center\n' +
      '                        </span>\n' +
      '            </div>\n' +
      '            <div class="excel__button excel__button-exit">\n' +
      '                        <span class="material-icons">\n' +
      '                           format_align_right\n' +
      '                        </span>\n' +
      '            </div>\n' +
      '            <div class="excel__button excel__button-exit">\n' +
      '                        <span class="material-icons">\n' +
      '                            format_bold\n' +
      '                        </span>\n' +
      '            </div>\n' +
      '            <div class="excel__button excel__button-exit">\n' +
      '                        <span class="material-icons">\n' +
      '                            format_italic\n' +
      '                        </span>\n' +
      '            </div>\n' +
      '            <div class="excel__button excel__button-exit">\n' +
      '                        <span class="material-icons">\n' +
      '                           format_underlined\n' +
      '                        </span>\n' +
      '            </div>';
  }
}
