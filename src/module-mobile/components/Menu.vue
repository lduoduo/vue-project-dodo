<template>
  <div class="mobile-menu">
    <div
      v-for="item in list"
      :key="item.value"
      :class="['menu-item', item.path === currPath ? 'active' : '']"
      @click="onClick(item)"
    >
      <Iconfont class="item-icon" :type="item.icon" />
      <p>{{ item.label }}</p>
    </div>
  </div>
</template>

<style lang="scss">
.mobile-menu {
  display: flex;
  align-items: center;
  box-shadow: 0 -10px 20px 0 rgba(0, 0, 0, 0.06), inset 0 0.5px 0 0 #ddd;

  .menu-item {
    padding: 10px 0;
    flex: none;
    width: 25%;
    text-align: center;
    font-size: 10px;
    p {
      margin: 0;
    }
    .item-icon {
      display: inline-block;
      font-size: 24px;
      margin-bottom: 4px;
    }

    &.active {
      color: #42b983;
    }
  }
}
</style>

<script>
import Iconfont from '@/components/Iconfont.vue';

export default {
  name: 'Menu',
  components: {
    Iconfont,
    // [Iconfont.name]: Iconfont
  },
  data() {
    return {
      list: [
        {
          icon: 'icon-ddj-naozhong',
          value: 'category',
          label: '应用列表',
          path: '/m/categorylist',
        },
        {
          icon: 'icon-ddj-shezhi',
          value: 'szrd',
          label: '时政热点',
          path: '/m/hotlist',
        },
        {
          icon: 'icon-ddj-shouhuodizhi',
          value: 'pyq',
          label: '朋友圈',
          path: '/m/pyqlist',
        },
        {
          icon: 'icon-ddj-shouye',
          value: 'mine',
          label: '个人中心',
          path: '/m/mine',
        },
      ],
      currPath: this.$route.path,
    };
  },
  beforeMount() {
    // console.log("this router", this.$route, this);
  },
  watch: {
    $route: 'onRouteChange',
  },
  methods: {
    onRouteChange(e) {
      console.log('onRouteChange', e, this.$route);
    },
    onClick(e) {
      const { path } = e;
      if (path === this.$route.path) return;

      this.$router.push(path);
    },
  },
};
</script>
