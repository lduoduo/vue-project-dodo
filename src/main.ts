import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store-vuex';
// import storeTs from './store-vuex-ts';

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

// 设置为 true 以在浏览器开发工具的性能/时间线面板中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器上
Vue.config.performance = true;


Vue.config.errorHandler = function (err, vm, info) {
  // `info` 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 只在 2.2.0+ 可用
  console.log('errorHandler', err, vm, info);
}

Vue.config.warnHandler = function (msg, vm, trace) {
  // `trace` 是组件的继承关系追踪
  console.log('warnHandler', msg, vm, trace);
}

// 给 v-on 自定义键位别名。
Vue.config.keyCodes = {
  v: 86,
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  "media-play-pause": 179,
  up: [38, 87]
}

// router.beforeEach((to, from, next) => {
//   /* 路由发生变化修改页面title */
//   if (to.meta.title) {
//     document.title = to.meta.title;
//   }
// });

new Vue({
  router,
  store,
  // store: storeTs,
  render: (h) => h(App),
}).$mount('#app');
