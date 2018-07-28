const DIMENSION_DELIMITER = "x";
const DATA_DELIMITER = ":";

// Input: e.g."3x3:101101101"
// Output: 2-dimensional Array of cells
function binaryStringToCells(binaryString) {
  const [sizeInfo, cellData] = binaryString.split(DATA_DELIMITER);
  if (cellData === undefined) throw `Expected binary string to contain ${DATA_DELIMITER} to denote the board size.`

  const [rowSize, columnSize] = sizeInfo.split(DIMENSION_DELIMITER);
  if (columnSize === undefined) throw `Expected binary string to contain ${DIMENSION_DELIMITER} to denote row and column count.`

  return createCells(rowSize, columnSize, (row, column) => {
    const index = (row * columnSize) + column;
    const filledBinary = cellData[index];
    const props = {filled: filledBinary != '0' };
    return newCell(props);
  });
}

// Input: 2-dimensional Array of cells
// Output: e.g."3x3:101101101"
function cellsToBinaryString(cells) {
  const rowSize = cells.length;
  const columnSize = cells[0].length;
  const binaryRows = cellsToBinaryRows(cells).map( rows => rows.join('')).join('');
  return `${rowSize}${DIMENSION_DELIMITER}${columnSize}${DATA_DELIMITER}${binaryRows}`
}

function createCells(rows, columns, cellFunction = newCell) {
  const cells = [];
  for (let x=0; x<rows; x++) {
    const row = [];
    for (let y=0; y<columns; y++) {
      row.push(cellFunction(x, y));
    }
    cells.push(row);
  }
  return cells;
}

// private

function newCell(props = {}) {
  return {
    filled: false,
    selected: false,
    marked: false,
    ...props
  }
}

function cellsToBinaryRows(cells) {
  return cells.map( row => {
    return row.map( cell => cell.filled ? 1 : 0 );
  })
}


export { binaryStringToCells, cellsToBinaryString, createCells }
