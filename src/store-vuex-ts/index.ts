import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import conf from '../../../scripts/config';

import { IstateGoods } from './modules/goods';
import { IStateUser } from './modules/user';
import { IstateHotList } from './modules/hotList';

Vuex.Store.prototype.$request = axios.create({
  baseURL: 'http://' + conf.app.devHost + ':' + conf.app.port,
  timeout: 1000,
});

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export interface IstateRoot {
  goods: IstateGoods;
  user: IStateUser;
  hotList: IstateHotList;
}

// Declare empty store first, dynamically register all modules later.
export function createStore() {
  return new Vuex.Store<IstateRoot>({
    strict: debug,
  });
}
