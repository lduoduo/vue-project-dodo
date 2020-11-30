import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import routes from './routes';

Vue.use(VueRouter);

export function createRouter() {
  return new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    fallback: false,
    // scrollBehavior: () => ({ y: 0 }),
    routes
  });
}
