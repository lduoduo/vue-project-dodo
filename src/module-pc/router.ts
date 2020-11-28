import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";


const routes: Array<RouteConfig> = [
  {
    path: "/taskapproval",
    name: "TaskListApproval",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "module-mobile" */ "./pages/TaskListApproval.vue")
  },
  {
    path: "/categorylist",
    name: "category",
    component: () => import(/* webpackChunkName: "module-mobile" */ "./pages/CategoryList.vue")
  },
  {
    path: "/taskcomm",
    name: "TaskListComm",
    component: () => import(/* webpackChunkName: "module-mobile" */ "./pages/TaskListComm.vue")
  },
  {
    path: "/taskcopy",
    name: "TaskListCopy",
    component: () => import(/* webpackChunkName: "module-mobile" */ "./pages/TaskListCopy.vue")
  },
  {
    path: "/taskrequest",
    name: "TaskListRequest",
    component: () => import(/* webpackChunkName: "module-mobile" */ "./pages/TaskListRequest.vue")
  },
];


export default routes;
