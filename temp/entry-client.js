
import Vue from 'vue'
import { createApp } from './app';

// 客户端特定引导逻辑……
Vue.mixin({
  beforeMount() {
    const { getInitialProps } = this.$options
    if (getInitialProps) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = getInitialProps({
        store: this.$store,
        route: this.$route
      })
    }
  },
  beforeRouteUpdate(to, from, next) {
    const { getInitialProps } = this.$options
    if (getInitialProps) {
      getInitialProps({
        store: this.$store,
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

const { app, router } = createApp();

router.onReady(() => {

  // 注意，在没有 data-server-rendered 属性的元素上，还可以向 $mount 函数的 hydrating 参数位置传入 true，来强制使用激活模式(hydration)
  app.$mount('#app', true);
});
