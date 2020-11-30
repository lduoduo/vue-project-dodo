const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 10001
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...

      if (process.env.CSR_FLAT) {
        config.plugins.push(
          new PrerenderSPAPlugin({
            // Required - The path to the webpack-outputted app to prerender.
            staticDir: path.join(__dirname, 'dist'),
            // Required - Routes to render.
            routes: ['/m', '/m/categorylist', '/m/hotlist']
          })
        );
      }
    } else {
      // 为开发环境修改配置...
    }

    config.resolve.alias = Object.assign(config.resolve.alias, {
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      utils: resolve('src/utils')
    });

    // console.log('config', config.module && JSON.stringify(config.module.rules));
  }
};
