import Vue from 'vue';
import Vuex from 'vuex';

import menu from './modules/menu';
import goods from './modules/goods';
import getters from './getters'

Vue.use(Vuex);

//不是在生产环境debug为true
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug, //在不是生产环境下都开启严格模式
  state: {},
  mutations: {},
  actions: {},
  modules: {
    menu,
    goods,
  },
  getters,
});
