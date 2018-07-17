import Vue from 'vue'
import Vuex from 'vuex'
import { binaryRowsToCells } from './board'

Vue.use(Vuex)

const rows = [
  [1,0,1,0,1],
  [1,1,1,1,1],
  [0,0,1,0,0],
  [0,1,0,1,0],
  [1,0,0,0,1],
]

export default new Vuex.Store({
  state: {
    cells: binaryRowsToCells(rows),
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
