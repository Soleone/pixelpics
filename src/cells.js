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
    return row.map( cell => cell.filled ? 1 : 0 )
  })
}

function createCells(rows, columns) {
  const cells = []
  for (let i=0; i<rows; i++) {
    const row = []
    for (let j=0; j<columns; j++) {
      row.push(newCell())
    }
    cells.push(row)
  }
  return cells
}

function newCell() {
  return {
    filled: false,
    selected: false,
    marked: false
  }
}


export { binaryRowsToCells, cellsToBinaryRows, createCells }
