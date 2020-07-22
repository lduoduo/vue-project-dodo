<template>
  <div class="page page-hotlist">
    <Search
      v-model="search"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
    <div class="page-body">
      <CompItem class="body-item" v-for="item in list" :key="item.id" :data="item" />
    </div>
    <Menu />
  </div>
</template>
<style lang="scss">
.page-hotlist {
  .page-body {
    flex: 1;
    overflow: auto;
    background-color: #f5f5f9;
  }

  .body-item {
    background-color: #fff;
    & + .body-item {
      margin-top: 12px;
    }
  }
}
</style>
<script>
import Search from "../components/Search.vue";
import Menu from "../components/Menu.vue";
import CompItem from "../components/Hot/Item.vue";

import { getHotList } from "@/network/api";

export default {
  name: "HotList",
  components: {
    Search,
    Menu,
    CompItem
  },
  data() {
    return {
      search: "",
      pageNo: 1,
      loading: false,
      finished: false,
      list: []
    };
  },
  beforeMount() {
    this.fetchtHotList();
  },
  methods: {
    onSearch(val) {
      console.log("onSearch", val);
    },
    onCancel() {
      console.log("onCancel");
    },
    fetchtHotList() {
      getHotList().then(e => {
        const { list = [], totalcount = 0 } = e;
        this.list = list;
      });
    }
  }
};
</script>