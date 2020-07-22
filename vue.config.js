
const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 10001,
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }

    config.resolve.alias = Object.assign(config.resolve.alias, {
      'assets': resolve('src/assets'),
      'components': resolve('src/components'),
    })

    console.log('config', config.devServer, config);
  }
}