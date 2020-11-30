const path = require('path');
const webpack = require('webpack');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./base.config.js');

const resolve = pn => path.resolve(__dirname, `../${pn}`);

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig, {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'cheap-module-source-map',
  entry: resolve('ssr/entry-client-before-page.ts'),
  output: {
    path: resolve('dist-csr'),
    publicPath: '/dist-csr/',
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
  // 重要信息：这将 webpack 运行时分离到一个引导 chunk 中，
  // 以便可以在之后正确注入异步 chunk。
  // 这也为你的 应用程序/vendor 代码提供了更好的缓存。
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
      'process.env': { NODE_ENV: '"production"', VUE_ENV: '"client"' },
      __IS_PROD__: !!isProd,
      __SERVER__: false
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css' //设置名称
    }),
    new TerserPlugin(),
    new HtmlWebpackPlugin(
      Object.assign(
        {
          filename: 'index.html',
          inject: true,
          // chunks: [srcModule, 'vendor', 'common', 'runtime']
        },
        isProd
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
          : undefined
      )
    ),
    new PrerenderSPAPlugin({
      // Required - The path to the webpack-outputted app to prerender.
      staticDir: resolve('dist-csr'),
      // Required - Routes to render.
      routes: ['/m', '/m/categorylist', '/m/hotlist']
    })
  ]
});
