export function capitalize(line) {
  if (typeof line !== 'string') {
    return '';
  }
  return `${line[0].toUpperCase()}${line.slice(1)}`;
}
