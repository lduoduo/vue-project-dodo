const webpack = require('webpack')
const path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const { dependencies } = require('../package.json')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  name: 'app',
  target: 'node',
  devtool: '#cheap-module-source-map',
  mode: isProd ? 'production' : 'development',
  entry: path.join(__dirname, '../src/server/app.ts'),
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'app.js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src/client'),
      '~': path.join(__dirname, '../src/server')
    },
    extensions: ['.js']
  },
  externals: [
    ...Object.keys(dependencies || {})
  ],
  module: {
    rules: [{
      test: /\.(ts|js)$/,
      include: [path.resolve(__dirname, '../src/server')],
      exclude: /(node_modules|bower_components)/
      // use: [
      //   {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env']
      //     }
      //   },
      //   {
      //     loader: 'eslint-loader'
      //   }
      // ]
    }
    ]
  },
  plugins: [
    // new CaseSensitivePathsPlugin(),
    new FriendlyErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.API_ENV': '"server"'
    })
  ]
}
