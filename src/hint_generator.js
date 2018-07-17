function hintsForCells(cellsArray) {
  const numbers = []
  let pending = null

  cellsArray.forEach( cell => {
    if (cell.filled && !pending) {
      pending = 1
    } else if (cell.filled && pending) {
      pending++
    } else if (!cell.filled && pending) {
      numbers.push(pending)
      pending = null
    }
  });
  if (pending) {
    numbers.push(pending)
  }
  return numbers
}

export { hintsForCells }
