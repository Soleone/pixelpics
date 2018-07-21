import Vue from 'vue'
import Router from 'vue-router'
import Board from './components/Board.vue'
import { createCells } from './cells'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sample',
      name: 'sample',
      component: Board,
      props() {
        return {
          params: {
            editMode: false
          }
        }
      }
    },
    {
      path: '/new',
      name: 'new',
      component: Board,
      props() {
        return {
          params: {
            cells: createCells(10, 10),
            editMode: true
          }
        }
      }
    }
  ]
});
