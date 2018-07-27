<template>
  <transition :name="enterTransition" appear>
    <td class="cell animated"
         :class="classes"
         @click="primaryAction"
         @contextmenu.prevent="secondaryAction">
    </td>
  </transition>
</template>


<script>
import { mapState } from 'vuex';

export default {
  name: 'Cell',
  props: ['x', 'y'],
  data() {
    return {
      enterTransition: null
    }
  },
  methods: {
    primaryAction() {
      if (this.isCompleted) return;

      if (this.editMode) {
        this.toggleFilled();
      } else {
        this.toggleSelected();
      }
    },
    secondaryAction() {
      if (this.isCompleted) return;

      if (!this.editMode) {
        this.toggleMark();
      }
    },
    toggleFilled() {
      this.cell.filled = !this.cell.filled;
    },
    toggleSelected() {
      this.$store.commit('toggleCellSelected', { x: this.x, y: this.y });
    },
    toggleMark() {
      this.$store.commit('toggleCellMarked', { x: this.x, y: this.y });
    },
    randomBool() {
      return (Math.random() < 0.5);
    }
  },
  computed: {
    ...mapState([
      'editMode',
      'isCompleted'
    ]),
    cell() {
      return this.$store.getters.cellAt(this.x, this.y);
    },
    displayFilled() {
      return (this.cell.filled && this.editMode);
    },
    classes() {
      return {
        filled: this.displayFilled,
        selected: this.cell.selected,
        marked: this.cell.marked && !this.isCompleted,
        bounceIn: this.displayFilled || this.cell.selected,
        'solved-empty': this.isCompleted,
      }
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

  .solved-empty {
    background-color: #f8f8f8;
  }

  .filled {
    background-color: #333;
    height: 31px;
    width: 31px;
    border-top: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
  }

  .marked {
    background-color: orange !important;
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
