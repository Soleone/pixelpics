import Vue from 'vue'
import Vuex from 'vuex'
import { binaryStringToCells } from './cells'
import BINARY_CELLS from './cell_data'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    default: {
      cells: binaryStringToCells(Object.values(BINARY_CELLS)[1]),
    },
    cells: [],
    editMode: true,
    id: null,
    title: null,
    isCompleted: false,
    //lastAction: null,

  },
  mutations: {
    toggleCellSelected(state, cellPosition) {
      const cell = this.getters.cellAt(cellPosition.x, cellPosition.y);
      cell.marked = false;
      cell.selected = !cell.selected;
      this.checkIsComplete(state);
    },
    toggleCellMarked(state, cellPosition) {
      const cell = this.getters.cellAt(cellPosition.x, cellPosition.y);
      cell.selected = false;
      cell.marked = !cell.marked;
    },
  },
  getters: {
    cellAt(state) {
      return (x, y) => {
        return state.cells[x][y];
      }
    }
  },
})

store.checkIsComplete = (state) => {
  const isCompleted = state.cells.every( (row) => {
    return row.every( (cell) => {
      return cell.filled ? cell.selected : !cell.selected;
    });
  });
  if (isCompleted) {
    state.isCompleted = true;
  }
}

export default store;
