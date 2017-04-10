import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title1: '',
    title2: ''
  },
  mutations: {
    changeTitle (state, titles) {
      state.title1 = titles.title1;
      state.title2 = titles.title2;
    }
  }
})