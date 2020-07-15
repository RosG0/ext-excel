import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/tableResize';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  onMousedown(event) {
    const resizeName = event.target.dataset.resize;

    if (resizeName) {
      resizeHandler(event, this._root);
    }
  }

  toHTML() {
    return createTable(20);
  }
}
