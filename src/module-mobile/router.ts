import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import ComApp from '@/components/ComApp.vue';

const routes: Array<RouteConfig> = [
  {
    path: 'categorylist',
    name: 'category',
    component: () =>
      import(
        /* webpackChunkName: "module-mobile" */ './pages/CategoryList.vue'
      ),
    meta: {
      title: '应用列表',
      navShow: true,
      tabShow: true,
      navLeftShow: false,
      navRightShow: true,
      type: 'aaa',
    },
  },
  {
    path: 'hotlist',
    name: 'hotlist',
    component: () =>
      import(/* webpackChunkName: "module-mobile" */ './pages/HotList.vue'),
    meta: {
      title: '热点',
      navShow: true,
      tabShow: true,
      navLeftShow: false,
      navRightShow: true,
      type: 'bbb',
    },
  },
  {
    path: 'pyqlist',
    name: 'pyqlist',
    component: () =>
      import(/* webpackChunkName: "module-mobile" */ './pages/PyqList.vue'),
  },
  {
    path: 'mine',
    name: 'mine',
    component: () =>
      import(/* webpackChunkName: "module-mobile" */ './pages/Mine.vue'),
  },
];

export default {
  path: '/m',
  name: 'mobile',
  component: ComApp,
  children: routes,
};
