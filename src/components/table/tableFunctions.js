export const isCell = (event) => event.target.dataset.type === 'cell';
export const shouldResize = (event) => event.target.dataset.resize;


export function range(start, end) {
  start = Number(start);
  end = Number(end);

  if (start > end) {
    [start, end] = [end, start];
  }
  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => index + start);
}
export function matrix(target, current) {
  target = target.id(true);
  current = current.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}

export function nextSelector(key, {col, row} ) {
  const minValue = 0;
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++;
      break;
    case 'Tab':
    case 'ArrowRight':
      col++;
      break;
    case 'ArrowLeft':
      col = col - 1 < minValue ? minValue : col - 1;
      break;
    case 'ArrowUp':
      row = row - 1 < minValue ? minValue : row - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
