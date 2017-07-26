import Vue from "vue";
import Vuex from "Vuex";
import * as getters from './getters';
import * as actions from './actions';

Vue.use(Vuex);

let state = {
  wrapper: false,
  wrapperRegister: false,
  wrapperQuestion: false,

};


const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations: {
    wrapperDisplay(state, type) {
      let html = document.getElementsByTagName('html')[0]
      state[type] = true;
      if (state.wrapper) {
        state.wrapper = false;
        html.style.overflow = 'initial'
      }
      else {
        state.wrapper = true;
        html.style.overflow = 'hidden'
      }
    },
  }
});

export default store;
