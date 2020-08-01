import Vue from "vue";
import Vuex from "vuex";
import { IstateGoods } from "./modules/goods";
import { IStateUser } from "./modules/user";

Vue.use(Vuex);

export interface IstateRoot {
  goods: IstateGoods;
  user: IStateUser;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IstateRoot>({});
