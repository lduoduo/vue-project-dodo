import { action, computed, observable } from 'mobx';

const fetchData = (d: any) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(d);
    }, 1000);
  });

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
    this.count++;
  }

  @action.bound async fetchUsers() {
    this.text = await fetchData('users');
  }
}

export const createStore = () => new MobxGoods();

export default new MobxGoods();
