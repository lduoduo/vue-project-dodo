import Vue from 'vue';
import Router from 'vue-router';

import routes from '../router/routes';

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: 'history',
    routes,
  });
}
