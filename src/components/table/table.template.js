const CODES = {
  A: 65,
  Z: 95
};

function toCell(row) {
  return function(_, col) {
    return `
      <div class="cell"
       contenteditable="true"
       data-type="cell"
       data-id="${row}:${col}"
       data-col="${col}"></div>
  `;
  };
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

  for (let row = 0; row < rowCount; row++) {
    const cells = new Array(colsColumn)
        .fill('')
        .map((toCell(row)))
        .join('');
    rows.push(generateRow(row + 1, cells));
  }
  return rows.join('');
}
