import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/tableResize';
import TableSelection from '@/components/table/TableSelection';
import {
  isCell,
  shouldResize,
  matrix,
  nextSelector
} from '@/components/table/tableFunctions';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor(root, options) {
    super(root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  _beforeInit() {
    this._selection = new TableSelection();
  }

  init() {
    super.init();
    const cell = this._root.find('[data-id="0:0"]');
    this.selectCell(cell);

    this._on('formulaTextChanged', (text) => {
      this._selection.current.text(text);
    });
    this._on('formulaEnter', () => {
      this._selection.current.focus();
    });
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this._root);
    } else if (isCell(event)) {
      const target = $(event.target);
      if (event.shiftKey) {
        const cells = matrix(target, this._selection.current)
            .map((id) => this._root.find(`[data-id="${id}"]`));
        this._selection.selectGroup(cells);
      } else {
        this._selection.select(target);
      }
    }
    this._emit('tableSelectedCell', $(event.target));
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowUp',
      'ArrowRight',
      'ArrowDown'
    ];
    const {key} = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this._selection.current.id(true);
      const nextCell = this._root.find(nextSelector(key, id));
      this.selectCell(nextCell);
    }
  }

  selectCell(cell) {
    this._selection.select(cell);
    this._emit('tableSelectedCell', cell);
  }

  onInput(event) {
    this._emit('tableCellValueChanged', $(event.target));
  }

  toHTML() {
    return createTable(20);
  }
}
