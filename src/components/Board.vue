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
import { cellsToBinaryRows } from '../cells'
import { hintsForCells } from '../hint_generator'

export default {
  name: 'Board',
  props: ['cells', 'editMode'],
  methods: {
    cellKey(x, y) {
      return x + "-" + y;
    },
    hints(index) {
      let row = this.cells[index]
      return hintsForCells(row).join(' ')
    }
  },
  computed: {
    cellsToBinaryString() {
      return cellsToBinaryRows(this.cells).map( rows => rows.join('')).join('')
    },
  },
  created() {
    this.cells = this.cells || this.$store.state.default.cells
    this.$store.state.cells = this.cells
    this.$store.state.EditMode = this.editMode
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
    height: 32px;
    width: 64px;
    padding: 0 8px 0 0;
    margin: 2px;
    text-align: right;
    font-weight: bold;
    font-size: 12px;
    color: #666666;
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
