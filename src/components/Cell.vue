<template>
  <div class="cell"
       v-bind:class="{filled: cell.filled, selected: cell.selected, marked: cell.marked}"
       v-on:mousedown="primaryAction"
       v-on:contextmenu.prevent="secondaryAction">
  </div>
</template>


<script>
export default {
  name: 'Cell',
  props: ['cell'],
  methods: {
    primaryAction() {
      if (this.$store.state.editMode) {
        this.toggleFilled()
      } else {
        this.toggleSelect()
      }
    },
    secondaryAction() {
      if (!this.$store.state.editMode) {
        this.toggleMark()
      }
    },
    toggleFilled() {
      this.cell.filled = !this.cell.filled
    },
    toggleSelect() {
      this.cell.selected = !this.cell.selected
    },
    toggleMark() {
      this.cell.marked = !this.cell.marked
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cell {
    display: inline-block;
    height: 32px;
    width: 32px;
    padding: 0px;
    margin: 2px;
    background-color: #e8e8e8;
    cursor: pointer;
  }

  .filled {
    background-color: #888888;
    height: 31px;
    width: 31px;
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
  }

  .marked {
    background-color: #ffffb3;
  }

  .selected {
    background-color: #b3e6ff;
  }
</style>
