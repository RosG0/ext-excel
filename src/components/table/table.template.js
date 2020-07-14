const CODES = {
  A: 65,
  Z: 95
};

function toCell() {
  return `
    <div class="cell" contenteditable="true"></div>
  `;
}

function generateColumn(col) {
  return `
    <div class="excel__table-column">${col}</div>
    `;
}

function generateRow(index = '', content) {
  return `
    <div class="excel__table-row">
      <div class="excel__table-row-info">${index}</div>
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
