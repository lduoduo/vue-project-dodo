const path = require('path');
const webpack = require('webpack');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./base.config.js');

const resolve = pn => path.resolve(__dirname, `../${pn}`);

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig, {
  entry: path.resolve(__dirname, '../src/entry-client-before-page.ts'),
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
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
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
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 10
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' },
      __IS_PROD__: !!isProd,
      __SERVER__: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css' //设置名称
    }),
    // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
    // 以便可以在之后正确注入异步 chunk。
    // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    //   minChunks: Infinity,
    // }),
    new TerserPlugin(),
    // 此插件在输出目录中
    // 生成 `vue-ssr-client-manifest.json`。
    new VueSSRClientPlugin()
  ]
});
