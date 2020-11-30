
import { getHotList } from '@/network/api';

export default {
  // ensure data for rendering given list type
  fetchtHotList: ({ commit, dispatch, state }, param = {}) => {
    console.log('fetchtHotList', param);
    return getHotList(param)
      .then(list => commit('SET_LIST', list))
  },
}
