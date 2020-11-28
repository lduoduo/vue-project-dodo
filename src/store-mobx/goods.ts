import { action, computed, observable } from 'mobx';

const fetchData = (d: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(d);
    }, 1000);
  });

interface GoodsItemData {
  goodsId: number | string;
  goodsName: string;
}

class MobxGoods {
  @observable data = {
    goodsName: '',
    goodsId: '',
  };

  @observable count = 0;
  @observable text: any = '';

  @computed get computedAge() {
    return this.count + 1;
  }

  @action.bound setAge() {
    console.log('setAge');
    this.count++;
  }

  @action.bound setGoods(d: GoodsItemData) {
    const { goodsId, goodsName } = d;
    console.log('setGoods', d);
    this.data = { ...this.data, goodsId, goodsName };
  }

  @action.bound async fetchUsers() {
    console.log('fetchUsers');
    this.text = await fetchData('users');
  }
}

export const createStore = () => new MobxGoods();

export default new MobxGoods();
