<template>
  <div class="board">
    <div v-for="(row, x) in cells" class="row" :key="`row-${x}`">
      <cell v-for="(cell, y) in row" v-bind:key="cellKey(x, y)" v-bind:filled="cell.filled">
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
import { cellsToBinaryRows } from '../board'

export default {
  name: 'Board',
  methods: {
    cellKey(x, y) {
      return x + "-" + y;
    },
    numberToFilled(number) {
      return number != 0;
    },
    saveNew() {

    }
  },
  computed: {
    cells() {
      return store.state.cells
    },
    cellsToBinaryString() {
      return cellsToBinaryRows(store.state.cells).map( rows => rows.join('')).join('')
    }
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

  .options {
    padding-top: 12px;
  }

  .cells-binary-string {
    width: 300px;
    font-size: 14px;
    font-family: monospace;
  }

</style>
