<template>
  <div class="cell"
       v-bind:class="{filled: filled, selected: selected}"
       v-on:click="toggleSelect">
  </div>
</template>


<script>
export default {
  name: 'Cell',
  props: ['id','filled', 'selected', 'marked'],
  methods: {
    toggleSelect() {
      this.selected = !this.selected
    },
    toggleMark() {
      this.marked = !this.marked
    }
  },
  calculated: {
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
