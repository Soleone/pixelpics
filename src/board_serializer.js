function binaryRowsToCells(rows) {
  return rows.map( (row, x) => {
    return row.map( (cell, y) => {
      return {
        filled: (cell == 1),
        id: `${x}-${y}`,
        selected: false,
        marked: false
      }
    })
  })
}

function cellsToBinaryRows(cells) {
  return cells.map( row => {
    return row.map( cell => cell.filled ? 1 : 0 )
  })
}

export { binaryRowsToCells, cellsToBinaryRows }
