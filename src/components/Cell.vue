<template>
  <div class="cell"
       v-bind:class="{filled: cell.filled, selected: cell.selected}"
       v-on:click="toggleSelect">
  </div>
</template>


<script>
import store from '../store'

export default {
  name: 'Cell',
  props: ['cell'],
  methods: {
    toggleSelect() {
      this.cell.selected = !this.cell.selected
    },
    toggleMark() {
      this.cell.marked = !this.cell.marked
    }
  },
  computed: {
    cells() {
      return store.state.cells
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cell {
    height: 32px;
    width: 32px;
    padding: 0px;
    margin: 2px;
    display: inline-block;
    background-color: #ffffff;
    cursor: pointer;
  }

  .empty {
    background-color: #eeeeee;
  }

  .filled {
    background-color: #333333;
  }

  .selected {
    background-color: lightblue;
  }
</style>
