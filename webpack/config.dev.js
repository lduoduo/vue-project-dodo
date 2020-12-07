const path = require('path');
const webpack = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./config.base.js');

const resolve = pn => path.resolve(__dirname, `../${pn}`);

const port = process.env.PORT || 10001;

module.exports = merge(baseConfig, {
  stats: 'errors-warnings',
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: resolve('src/main.ts'),
  output: {
    path: resolve('dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    disableHostCheck: true,
    // contentBase: dist,
    host: '0.0.0.0',
    port,
    compress: true,
    hot: true,
    inline: true
    // historyApiFallback: true,
    // openPage: getOpenUrl(),
    // useLocalIp: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"', VUE_ENV: '"client"' },
      __IS_PROD__: false,
      __SERVER__: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css' //设置名称
    })
  ]
});

console.log(chalk.green(`开发地址:http://localhost:${port}`));
