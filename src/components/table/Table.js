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
import * as actions from '@/redux/actions';
import {defaultStyles} from "@/constants";
import {parse} from "@core/parse";

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
      this._selection.current
        .attr('data-value', text)
        .text(parse(text));
      this._updateTextInStore(text);
    });
    this._on('formulaEnter', () => {
      this._selection.current.focus();
    });
    this._on('styleChanged', (value) => {
      this._selection.setStyle(value);
      this._dispatch(actions.applyStyle({
        value,
        ids: this._selection.selectedIds;
      }))
    });
  }

  async resizeTable(event) {
    const data = await resizeHandler(event, this._root);
    this._dispatch(actions.tableResize(data));
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const target = $(event.target);
      if (event.shiftKey) {
        const cells = matrix(target, this._selection.current)
            .map((id) => this._root.find(`[data-id="${id}"]`));
        this._selection.selectGroup(cells);
      } else {
        this.selectCell(target);
        // this._selection.select(target);
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
    const styles = cell.getStyles(Object.keys(defaultStyles));
    this._dispatch(actions.changeStyles(styles));
  }

  onInput(event) {
    this._updateTextInStore($(event.target).text());
  }

  _updateTextInStore(value) {
    this._dispatch(actions.changeText({
      id: this._selection.current.id(),
      value
    }));
  }

  toHTML() {
    return createTable(20, this._store.getState());
  }
}
