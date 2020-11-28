
import VueRouter, { RouteConfig } from 'vue-router';

import routeMobile from '../module-mobile/router';
// import routePc from '../module-pc/router';

import Home from '../views/Home.vue';
import Other from '../views/Other.vue';
import Person from '../views/Person.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  routeMobile,
  {
    path: '/p/start',
    name: 'person',
    component: Person,
  },
  {
    path: '/o',
    name: 'other',
    // component: Home,
    children: [
      {
        path: 'dodo',
        component: Other,
      },
      {
        path: '',
        component: Home,
      },
    ],
  },
];

export default routes;