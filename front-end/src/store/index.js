import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
    LOG_OUT() {
      sessionStorage.clear();
    },
  },
  actions: {
  },
  modules: {
  }
})