function binaryStringToCells(binaryString) {
  const [sizeInfo, cellData] = binaryString.split(":");
  if (cellData === undefined) throw "Expected binary string to contain a colon : to denote the board size."

  const [rowSize, columnSize] = sizeInfo.split("x");

  // row = 1, column = 0, index = 8
  return createCells(rowSize, columnSize, (row, column) => {
    const index = (row * columnSize) + column;
    const filledBinary = cellData[index];
    const props = {filled: filledBinary != '0' };
    return newCell(props);
  });
}

function binaryRowsToCells(rows) {
  return rows.map( (row, x) => {
    return row.map( (cell, y) => {
      return {
        ...newCell(),
        filled: (cell == 1),
        id: `${x}-${y}`
      }
    })
  })
}

function cellsToBinaryRows(cells) {
  return cells.map( row => {
    return row.map( cell => cell.filled ? 1 : 0 );
  })
}

function createCells(rows, columns, cellFunction) {
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

function newCell(props = {}) {
  return {
    filled: false,
    selected: false,
    marked: false,
    ...props
  }
}


export { binaryStringToCells, binaryRowsToCells, cellsToBinaryRows, createCells, newCell }
