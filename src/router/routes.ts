import VueRouter, { RouteConfig } from 'vue-router';

import routeMobile from '../module-mobile/router';
// import routePc from '../module-pc/router';

import ComApp from '@/components/ComApp.vue';

import Home from '../views/Home.vue';
import Other from '../views/Other.vue';
import Person from '../views/Person.vue';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'VUE首页'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      title: '关于',
    }
  },
  routeMobile,
  {
    path: '/p/start',
    name: 'person',
    component: Person
  },
  {
    path: '/o',
    name: 'other',
    component: ComApp,
    children: [
      {
        path: 'todo',
        component: Other
      },
      {
        path: '',
        component: Other
      }
    ]
  }
];

const loopRoute = (basePath: string, e: Array<RouteConfig>) => {
  let arr: Array<string> = [];

  e.map(d => {
    const { path: pn, children } = d;

    if (!children) {
      const baseP = basePath === '/' ? '' : basePath;
      const bPn = pn === '/' ? '' : pn;

      return arr.push(
        `${baseP}${basePath === '/' || pn === '/' ? '' : '/'}${bPn}`
      );
    }

    arr = arr.concat(loopRoute(pn, children));
  });

  return arr;
};

export const routeList = loopRoute('', routes);

export default routes;
