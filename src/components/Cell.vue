<template>
  <transition :name="enterTransition" appear>
    <td class="cell animated"
         :class="{filled: cell.filled, selected: cell.selected, marked: cell.marked, bounceIn: cell.filled}"
         @mousedown="primaryAction"
         @contextmenu.prevent="secondaryAction"
         @keyup.enter="primaryAction">
    </td>
  </transition>
</template>


<script>
export default {
  name: 'Cell',
  props: ['cell'],
  data() {
    return {
      enterTransition: null
    }
  },
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
    },
    randomBool() {
      return (Math.random() < 0.5);
    }
  },
  computed: {
    displayFilled() {
      return (this.cell.filled && this.editMode);
    }
  },
  created() {
    const verticalModifier = this.randomBool() ? '-vertical' : '';
    const reverseModifier = this.randomBool() ? '-reverse' : '';
    this.enterTransition = "slide-fade" + verticalModifier + reverseModifier;
  }
}
</script>


<style scoped>
  .cell {
    display: inline-block;
    height: 31px;
    width: 31px;
    border-top: 1px solid transparent;
    border-left: 1px solid transparent;
    background-color: #e8e8e8;
    cursor: pointer;
    -vendor-animation-duration: 0.1s;
  }

  .filled {
    background-color: #333;
    height: 31px;
    width: 31px;
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
  }

  .marked {
    background-color: #ffffb3 !important;
  }

  .selected {
    background-color: #666;
  }

  .slide-fade-enter-active,
  .slide-fade-reverse-enter-active,
  .slide-fade-vertical-enter-active,
  .slide-fade-vertical-reverse-enter-active {
    transition: all .5s ease-out;
  }

  .slide-fade-enter {
    transform: translateX(48px);
    opacity: 0;
  }

  .slide-fade-reverse-enter {
    transform: translateX(-48px);
    opacity: 0;
  }

  .slide-fade-vertical-enter {
    transform: translateY(48px);
    opacity: 0;
  }

  .slide-fade-vertical-reverse-enter {
    transform: translateY(-48px);
    opacity: 0;
  }
</style>
