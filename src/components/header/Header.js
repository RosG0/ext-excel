import {ExcelComponent} from '@core/ExcelComponent';
import {$} from "@core/dom";
import {changeTitle} from "@/redux/actions";
import {defaultTitle} from "@/constants";
import {debounce} from "@core/helper";

export class Header extends ExcelComponent {
  static className = 'excel__header';

  constructor(root, options) {
    super(root, {
      name: 'Header',
      ...options,
      listeners: ['input']
    });
  }
  prepare() {
    this.onInput = debounce(this.onInput, 300);
  }

  toHTML() {
    const title = this._store.getState().title || defaultTitle;
    return '       <input class="excel__title-input"\n' +
      '                   type="text"\n' +
      '                   value="' + title + '}"/>\n' +
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

  onInput(event) {
    const target = $(event.target);
    this._dispatch(changeTitle(target.text()));
  }
}
