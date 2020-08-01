import {toInlineStyles} from '@core/helper';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

const CODES = {
  A: 65,
  Z: 95
};
const DEFAULT_WIDTH = '120px';
const DEFAULT_HEIGHT = '24px';

function toCell(state, row) {
  return function(_, col) {
    const id = `${row}:${col}`;
    const data = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    });
    return `
      <div class="cell"
       style="width: ${getWidth(state.colState, col)}; ${styles};"
       contenteditable="true"
       data-type="cell"
       data-id="${id}"
       data-value="${data || ''}"
       data-col="${col}">${parse(data)}</div>
  `;
  };
}

function generateColumn({col, index, width}) {
  return `
    <div class="excel__table-column"
         data-type="resizable"
         data-col="${index}"
         style="width: ${width}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function generateRow(index = '', content, state) {
  const height = getHeight(state, index);
  const resizerIfNeed = index ?
    '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="excel__table-row"
        style="height:${height}"
        data-type="resizable"
        data-row="${index}">
      <div class="excel__table-row-info">
        ${index}
        ${resizerIfNeed}
       </div>
      <div class="excel__table-row-data">${content}</div>
    </div>
  `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
  return state[index] || DEFAULT_WIDTH;
}

function getHeight(state, index) {
  return state[index] || DEFAULT_HEIGHT;
}

function widthFromState(state) {
  return function(col, index) {
    return {
      col,
      index,
      width: getWidth(state.colState, index)
    };
  };
}

export function createTable(rowCount = 15, state) {
  const colsColumn = CODES.Z - CODES.A + 1;
  const rows = [];
  const columns = new Array(colsColumn)
      .fill('')
      .map(toChar)
      .map(widthFromState(state))
      .map(generateColumn)
      .join('');

  rows.push(generateRow('', columns, {}));

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colsColumn)
        .fill('')
        .map((toCell(state, row)))
        .join('');
    rows.push(generateRow(row + 1, cells, state.rowState || {}));
  }
  return rows.join('');
}
