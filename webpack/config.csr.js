const path = require('path');
const webpack = require('webpack');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = require('./config.base.js');

const resolve = pn => path.resolve(__dirname, `../${pn}`);

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge(baseConfig, {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'cheap-module-source-map',
  entry: resolve('src/main.ts'),
  output: {
    path: resolve('dist-csr'),
    publicPath: '/',
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
          template: resolve('w-csr/template.html')
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
      routes: ['/m', '/m/categorylist', '/m/hotlist', '/m/pyqlist', '/m/mine'],
      postProcess(renderedRoute) {
        // add CDN
        // 由于CDN是以"/"结尾的，所以资源开头的“/”去掉
        // renderedRoute.html = renderedRoute.html
        //   .replace(
        //     /(<script[^<>]*src=\")(?!http|https|\/{2})\/([^<>\"]*)(\"[^<>]*>[^<>]*<\/script>)/gi,
        //     `$1${config[env].assetsPublicPath}$2$3`
        //   )
        //   .replace(
        //     /(<link[^<>]*href=\")(?!http|https|\/{2})\/([^<>\"]*)(\"[^<>]*>)/gi,
        //     `$1${config[env].assetsPublicPath}$2$3`
        //   )
        //   .replace(
        //     /(<img[^<>]*src=\")(?!http|https|data:image|\/{2})\/([^<>\"]*)(\"[^<>]*>)/gi,
        //     `$1${config[env].assetsPublicPath}$2$3`
        //   )
        //   .replace(
        //     /(:url\()(?!http|https|data:image|\/{2})\/([^\)]*)(\))/gi, // 样式内联,格式必须是":url(/xxx)"，其他格式都不行【用来剔除js代码中类似的字段】
        //     `$1${config[env].assetsPublicPath}$2$3`
        //   )
        //   .replace(
        //     /(<div class="dialog_mask_\w+">)[\s\S]*<\/div>(<\/body>)/gi,
        //     `$2`
        //   ); // 去掉警告弹窗(因为部分调用比较早的ajax会报错导致多出了弹出框)

        return renderedRoute;
      }
      // renderer: new Renderer({
      //   injectProperty: '__PRERENDER_INJECTED__',
      //   inject: 'prerender',
      //   renderAfterDocumentEvent: 'render-event' // vue可能需要使用预渲染何时开始的事件
      // })
    })
  ]
});
