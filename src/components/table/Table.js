import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown']
    });
  }

  omMousedown(event) {
    let target = event.target;
    const resizeName = target.dataset.resize;

    if (resizeName) {
      target = $(target);
      const parent = target.closest('[data-type="resizable"]');
      const coords = parent.getCoords();

      document.onmousemove = (e) => {
        const dif = e.pageX - coords.right;
        parent.style.width = (coords.width + dif) + 'px';
      };

      document.onmouseup = () => {
        document.onmousemove = null;
      };
    }
  }

  omMousemove() {

  }

  omMouseup() {

  }

  toHTML() {
    return createTable(20);
  }
}
