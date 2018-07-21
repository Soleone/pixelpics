import Vue from 'vue'
import Vuex from 'vuex'
import { binaryRowsToCells } from './cells'

Vue.use(Vuex)

const binary10 = [
  '0000000000000000000000000000001101110111100101010010010101001101010111100101000110010100011101110111',
  '0100010001100110011011101111111101111110',
]

const rows = [
  [1,0,1,0,1,1,1,0],
  [1,1,1,1,1,0,0,1],
  [0,1,1,1,0,0,0,1],
  [0,1,0,1,0,0,0,1],
  [1,0,0,0,1,1,1,1],
  [1,0,0,0,1,1,1,1],
  [1,0,0,0,1,1,1,1],
]

export default new Vuex.Store({
  state: {
    default: {
      cells: binaryRowsToCells(rows),
    },
    cells: [],
    editMode: true,
  },
  mutations: {
    increment (state) {
      state.count++
    },
  }
})
