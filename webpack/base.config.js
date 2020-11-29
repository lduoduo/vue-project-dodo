const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

const resolve = pn => path.resolve(__dirname, `../${pn}`);

console.log('isProd', isProd);

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  resolve: {
    alias: {
      public: resolve('public'),
      '@': resolve('src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      utils: resolve('src/utils')
    },
    extensions: ['.js', '.ts', '.vue', '.scss', '.css'] // 省略后缀名
  },
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vant: 'vant',
    _: 'lodash'
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader', // 处理vue文件，会将ts代码转交给babel-loader
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                [
                  '@babel/preset-typescript',
                  {
                    allExtensions: true
                  }
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  plugins: isProd
    ? [new VueLoaderPlugin()]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()]
};
