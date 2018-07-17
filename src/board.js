function binaryRowsToCells(rows) {
  return rows.map( (row) => {
    return row.map( (cell) => {
      return { filled: (cell == 1) }
    })
  })
}

function cellsToBinaryRows(cells) {
  return cells.map( row => {
    return row.map( cell => cell.filled ? 1 : 0 )
  })
}

export { binaryRowsToCells, cellsToBinaryRows }
