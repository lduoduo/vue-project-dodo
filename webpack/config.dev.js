const path = require('path');
const webpack = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    publicPath: '/',
    // contentBase: dist,
    host: '0.0.0.0',
    port,
    compress: true,
    hot: true,
    inline: true,
    index: 'index.html',
    writeToDisk: true,
    // historyApiFallback: true,
    // openPage: getOpenUrl(),
    // useLocalIp: true,
    // before: function(app, server, compiler) {
    //   app.get('*', function(req, res) {
    //     console.log('req', req, res);
    //     res.render('index', {title: 'dodo'});
    //   });
    // }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"development"', VUE_ENV: '"client"' },
      __IS_PROD__: false,
      __SERVER__: false
    }),
    new HtmlWebpackPlugin({
      template: resolve('w-template/t-dev.html'),
      filename: 'index.html',
      inject: true,
    }),
    // new MiniCssExtractPlugin({
    //   filename: '[name].[chunkhash].css' //设置名称
    // })
  ]
});

console.log(`开发地址:http://localhost:${port}`);
