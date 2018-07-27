<template>
  <div id="app">
    <nav>
      <router-link to="/new">Create</router-link>
      <router-link :to="{name: 'boards', params: {id: randomId}}">Random</router-link>
      <router-link :to="{name: 'boards', params: {id: nextId }}">Next</router-link>
    </nav>

    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import Cell from './components/Cell.vue'
import Board from './components/Board.vue'
import BINARY_CELLS from './cell_data'

export default {
  name: 'app',
  components: {
    Board,
    Cell
  },
  computed: {
    nextId() {
      if (this.$store.state.id == null) return 1;

      return (parseInt(this.$store.state.id) % Object.keys(BINARY_CELLS).length) + 1;
    },
    randomId() {
      return Math.floor(Math.random() * Math.floor(Object.keys(BINARY_CELLS).length));
    }
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Montserrat:400,700');
  @import '~bootstrap/dist/css/bootstrap.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';
  @import '~vue2-animate/dist/vue2-animate.min.css';

  body {
    background-color: #ffffff;
    font-family: 'Montserrat', sans-serif;
    display: grid;
    grid-template-rows: auto;
    justify-items: center;
    padding-top: 50px;
  }

  body, html {
    margin: 0;
    height: 100%;
  }

  #app {
    width: 50%;
  }

  nav {
    padding: 20px 20px 20px 0;
  }

  nav a {
    padding: 10px;
    text-decoration: none;
    background: #ffffff;
    border-radius: 3px;
    color: #333333;
    font-weight: bold;
    margin-right: 15px;
  }
</style>
