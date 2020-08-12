import Vue from 'vue'
import Vuex from 'vuex'
import global from './models/global'
import chat from './models/chat'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    global,
    chat
  },
  getters

})

export default store
