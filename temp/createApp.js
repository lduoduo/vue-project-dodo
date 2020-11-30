/*
 * @Author: lduoduo
 * @Date: 2020-08-02 12:12:34
 * @Last Modified by: lduoduo
 * @Last Modified time: 2020-11-28 18:37:56
 * ssr 通用 entry(universal entry)
 */
const Vue = require('vue');
// const Router = require('./router.ts');

// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例
module.exports = function createApp(context) {
  // 创建 router 实例
  // const router = Router.createRouter();

  // const app = new Vue({
  //   // 注入 router 到根 Vue 实例
  //   router,
  //   // 根实例简单的渲染应用程序组件。
  //   render: h => h(App)
  // })

  const vue = new Vue({
    data: {
      url: context.url,
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`,
  });
  return { vue };
};
