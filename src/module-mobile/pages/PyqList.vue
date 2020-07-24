<template>
  <div class="page page-pyqlist">
    <Search
      v-model="search"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="page-body">
      <CompItem
        class="body-item"
        v-for="item in list"
        :key="item.id"
        :data="item"
      />
    </div>
    <Menu />
  </div>
</template>
<style lang="scss">
.page-pyqlist {
  .page-body {
    flex: 1;
    padding: 1%;
    overflow: auto;
    background-color: #f5f5f9;
  }

  .body-item {
    background-color: #fff;
    width: 48%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: 16px;
    margin: 1%;
  }
}
</style>
<script>
import Search from '../components/Search.vue';
import Menu from '../components/Menu.vue';
import CompItem from '../components/Pyq/Item.vue';

import { getHotList } from '@/network/api';

export default {
  name: 'PyqList',
  components: {
    Search,
    Menu,
    CompItem,
  },
  data() {
    return {
      search: '',
      pageNo: 1,
      loading: false,
      finished: false,
      list: [],
    };
  },
  beforeMount() {
    this.fetchtHotList();
  },
  methods: {
    onSearch(val) {
      console.log('onSearch', val);
    },
    onCancel() {
      console.log('onCancel');
    },
    fetchtHotList() {
      getHotList().then((e) => {
        const { list = [], totalcount = 0 } = e;
        this.list = list;
      });
    },
  },
};
</script>
