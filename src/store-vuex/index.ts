import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu';
import goods from './modules/goods';
// import hotList from './modules/hotList';
import getters from './getters';

import api from '../network/api';

Vue.use(Vuex);

//不是在生产环境debug为true
const debug = process.env.NODE_ENV !== 'production';

// Declare empty store first, dynamically register all modules later.
export function createStore() {
  return new Vuex.Store({
    strict: debug, //在不是生产环境下都开启严格模式
    state: {},
    mutations: {},
    actions: {},
    modules: {
      menu,
      goods,
      // hotList
    },
    getters
  });
}

export default new Vuex.Store({
  strict: debug, //在不是生产环境下都开启严格模式
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    goods,
    // hotList
  },
  getters
});
