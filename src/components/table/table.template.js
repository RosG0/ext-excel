const CODES = {
  A: 65,
  Z: 95
};

function toCell(_, index) {
  return `
    <div class="cell" contenteditable="true" data-col="${index}"></div>
  `;
}

function generateColumn(col, index) {
  return `
    <div class="excel__table-column" data-type="resizable" data-col="${index}">
        ${col}
        <div class="col-resize" data-resize="col"></div>
    </div>
    `;
}

function generateRow(index = '', content) {
  const resizerIfNeed = index ?
    '<div class="row-resize" data-resize="row"></div>' : '';
  return `
    <div class="excel__table-row" data-type="resizable">
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

export function createTable(rowCount = 15) {
  const colsColumn = CODES.Z - CODES.A + 1;
  const rows = [];
  const columns = new Array(colsColumn)
      .fill('')
      .map(toChar)
      .map(generateColumn)
      .join('');

  rows.push(generateRow('', columns));

  for (let i = 0; i< rowCount; i++) {
    const cells = new Array(colsColumn)
        .fill('')
        .map(toCell)
        .join('');
    rows.push(generateRow(i + 1, cells));
  }
  return rows.join('');
}
