const GOODS = {
  state: {
    data: {
      goodsName: '',
      goodsId: ''
    }
  },
  mutations: {
    SET_GOODS: (state: any, data: object) => {
      state.data = data;
    },
  },
  actions: {
    // setMenu(opt: any, a: any, b: any) {
    //   console.log('opt a b', opt, a, b);
    //   // commit('SET_MENU', data ? data : { unit: 'E豆', ratio: 100 })
    //   // commit('SET_MENU', 'aaa');
    // },

    setGoods(opt: any) {
      console.log('opt a b', opt);
      // commit('SET_MENU', data ? data : { unit: 'E豆', ratio: 100 })
      // commit('SET_MENU', 'aaa');
    },
  },
  getters: {
    currGoods: (state :any)=> state.data
  }
};

export default GOODS;
