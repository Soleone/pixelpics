<template>
  <div class="board-wrapper">
    <div class="options" v-if="editMode">
      <b-input-group size="lg" prepend="Editing Board" id="options-input-group">
        <b-form-input :value="cellsToBinaryString" class="cells-binary-string" id="binary-board-input"></b-form-input>

        <b-input-group-append>
          <b-btn id="copy-button" variant="primary" @click="copyToClipboard">
            <icon name="copy"></icon>
          </b-btn>
          <b-tooltip target="copy-button" placement="top">
            Copy to clipboard
          </b-tooltip>
          <b-tooltip triggers="" ref="copiedFeedbackTooltip" target="options-input-group" placement="top">
            Copied to clipboard!
          </b-tooltip>
        </b-input-group-append>
      </b-input-group>
    </div>

    <table class="board">
      <tr class="hint-header row">
        <td class="hint-header-spacer">
          <div class="hint hint-row">
            <!-- empty placeholder -->
          </div>
        </td>
        <td v-for="(_, y) in cells[0]" :key="`hint-col-${y}`">
          <div class="hint hint-column">
            <div v-for="(hint, index) in columnHints(y).reverse()" :key="`hint-item-${index}`" class="hint-item">
              {{ hint }}
            </div>
          </div>
        </td>
      </tr>

      <tr v-for="(row, x) in cells" class="row" :key="`row-${x}`">
        <td>
          <div class="hint hint-row">
            {{ hints(x) }}
          </div>
        </td>

        <cell v-for="cell in row" :key="cell.id" :cell="cell">
        </cell>
      </tr>
    </table>
  </div>
</template>


<script>
import Cell from './Cell.vue';
import { cellsToBinaryRows } from '../cells';
import { hintsForCells } from '../hint_generator';
import { mapState } from 'vuex';

export default {
  name: 'Board',
  props: ['params'],
  methods: {
    cellKey(x, y) {
      return x + "-" + y;
    },
    hints(index) {
      let row = this.cells[index];
      return hintsForCells(row).join(' ');
    },
    columnHints(x) {
      let column = this.transposedCells[x];
      return hintsForCells(column);
    },
    copyToClipboard() {
      let input = document.getElementById('binary-board-input');
      input.select();
      document.execCommand('copy');
      input.blur();
      this.$root.$emit('bv::hide::tooltip');
      this.$refs.copiedFeedbackTooltip.$emit('open');
      setTimeout( () => {
        this.$root.$emit('bv::hide::tooltip');
      }, 1000);
    }
  },
  computed: {
    ...mapState([
      'editMode',
      'cells'
    ]),
    cellsToBinaryString() {
      return cellsToBinaryRows(this.cells).map( rows => rows.join('')).join('');
    },
    transposedCells() {
      return this.cells[0].map( (column, columnIndex) => {
        return this.cells.map(row => row[columnIndex]);
      });
    },
  },
  created() {
    this.$store.state.cells = this.params.cells || this.$store.state.default.cells;
    this.$store.state.editMode = this.params.editMode || false;
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
    border-collapse: inherit;
    border-spacing: 0px;
  }

  .board tr {
    padding:0;
    margin:0;
  }

  .board td {
    padding:0;
    margin:1px;
  }

  .cell:nth-child(6) {
    margin-right: 3px;
  }

  .row:nth-child(6) {
    margin-bottom: 3px;
  }

  .row {
    padding:0;
    margin:0;
  }

  .cell-row {
    height: 32px;
  }

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

  .options {
    padding-top: 12px;
  }

  .cells-binary-string {
    font-family: monospace;
  }

</style>
