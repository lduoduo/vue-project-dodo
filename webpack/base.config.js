const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: isProd ? false : '#cheap-module-source-map',
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js',
  },
  resolve: {
    alias: {
      public: path.resolve(__dirname, '../public'),
      '@': path.resolve(__dirname, '../src'),
      assets: resolve('src/assets'),
      components: resolve('src/components'),
      utils: resolve('src/utils'),
    },
  },
  module: {
    noParse: /es6-promise\.js$/, // avoid webpack shimming process
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.(j|t)s$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]',
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: isProd
          ? MiniCssExtractPlugin.loader
          : [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'sass-loader',
              },
            ],
      },
    ],
  },
  performance: {
    hints: false,
  },
  plugins: isProd
    ? [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
          filename: '[name].[chunkhash].css', //设置名称
        }),
      ]
    : [new VueLoaderPlugin(), new FriendlyErrorsPlugin()],
};
