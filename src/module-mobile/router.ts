import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import ComApp from '@/components/ComApp.vue';

const routes: Array<RouteConfig> = [
  {
    path: 'categorylist',
    name: 'category',
    component: () =>
      import(/* webpackChunkName: "module-mobile" */'./pages/CategoryList.vue'),
  },
  {
    path: 'hotlist',
    name: 'hotlist',
    component: () =>
      import(
        /* webpackChunkName: "module-mobile" */ './pages/HotList.vue'
      ),
  },
  {
    path: 'pyqlist',
    name: 'pyqlist',
    component: () =>
      import(
        /* webpackChunkName: "module-mobile" */ './pages/PyqList.vue'
      ),
  },
  {
    path: 'mine',
    name: 'mine',
    component: () =>
      import(
        /* webpackChunkName: "module-mobile" */ './pages/Mine.vue'
      ),
  },
];

export default {
  path: '/m',
  name: 'mobile',
  component: ComApp,
  children: routes,
};
