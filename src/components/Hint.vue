<template>
  <div class="hint">

  </div>
</template>


<script>
import { hintsForCells } from '../hint_generator';

export default {
  name: 'Hint',
  props: [
    'vertical',
    'series'
  ],
  methods: {
    hints(index) {
      let row = this.cells[index];
      return hintsForCells(row).join(' ');
    },
    columnHints(x) {
      let column = this.transposedCells[x];
      return hintsForCells(column);
    },

  },
  computed: {
  },
}
</script>


<style scoped>
  .hint {
    display: inline-block;
    margin: 2px;
    padding: 4px;
    text-align: right;
    font-weight: bold;
    font-size: 12px;
    color: #666666;
    background-color: #ffffff;
    cursor: default;
  }

  .hint-row {
    width: 64px;
    padding:0;
    margin: 0 8px 0 0;
  }

  .hint-column {
    height: 96px;
    width: 32px;
    padding-right: 8px;
    display: flex;
    flex-direction: column-reverse;
  }

  .hint-item {
    align-self: flex-end;
  }

  .hint-header td {
    width: 32px;
  }

  .hint-header .hint-header-spacer {
    width: 64px;
  }
</style>
