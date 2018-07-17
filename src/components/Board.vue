<template>
  <div class="board">
    <div v-for="(row, x) in cells" class="row" v-bind:key="`row-${x}`">
      <div class="hint">{{ hints(x) }}</div>
      <cell v-for="cell in row" v-bind:cell="cell" v-bind:key="cell.id">
      </cell>
    </div>

    <div class="options">
      <input type="text" v-bind:value="cellsToBinaryString" class="cells-binary-string">
    </div>
  </div>
</template>


<script>
import Cell from './Cell.vue'
import store from '../store'
import { cellsToBinaryRows } from '../board_serializer'
import { hintsForCells } from '../hint_generator'

export default {
  name: 'Board',
  methods: {
    cellKey(x, y) {
      return x + "-" + y;
    },
    numberToFilled(number) {
      return number != 0;
    },
    hints(index) {
      let row = store.state.cells[index]
      return hintsForCells(row).join(' ')
    }
  },
  computed: {
    cells() {
      return store.state.cells
    },
    cellsToBinaryString() {
      return cellsToBinaryRows(store.state.cells).map( rows => rows.join('')).join('')
    },
  },
  components: {
    Cell
  }
}
</script>


<style scoped>
  .board {
    padding:0;
    margin:0;
  }

  .row {
    padding:0;
    margin:0;
    height:36px
  }

  .hint {
    display: inline-block;
    line-height: 32px;
    height: 32px;
    width: 32px;
    padding: 0px;
    margin: 2px;
    background-color: #ffffff;
  }

  .options {
    padding-top: 12px;
  }

  .cells-binary-string {
    width: 300px;
    font-size: 14px;
    font-family: monospace;
  }

</style>
