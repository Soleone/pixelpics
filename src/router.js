import Vue from 'vue'
import Router from 'vue-router'
import Board from './components/Board.vue'
import { createCells } from './cells'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Board,
    },
    {
      path: '/new',
      name: 'new',
      component: Board,
      props() {
        return {
          cells: createCells(10, 10),
          editMode: true
        }
      }
    }
  ]
});
