import Vue from "vue";
import Vuex from "Vuex";
import * as getters from './getters';
import * as actions from './actions';

Vue.use(Vuex);

let state={
        wrapper:false,
    };


const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations: {
        wrapperDisplay(state) {
            let html=document.getElementsByTagName('html')[0]
            state.wrapper?(state.wrapper=false,html.style.overflow='initial'):(state.wrapper=true,html.style.overflow='hidden');
        }
    }
});

export default store;