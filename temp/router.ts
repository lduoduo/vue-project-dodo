const Vue = require('vue');
const Router = require('vue-router');

const routes = require('../client/router/routes');

Vue.use(Router);

module.exports = function createRouter() {
  return new Router({
    mode: 'history',
    routes,
  });
};
