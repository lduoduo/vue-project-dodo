# vue-project

## node >= 10.13.0

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
- yarn mock
- yarn serve
```

### Compiles and minifies for production

- SSR

```
yarn build:ssr
```

- CSR

```
yarn build:csr
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 注意点

1. 嵌套子路由：

- 父路由一定要有个模板文件，添加 `<router-view />` 用于展示里面的子路由内容
- 子路由 path 一定一定一定不要加 '/' 前缀，否则匹配不到

2. mock 数据安装：npm install -g json-server
3. 使用 vuex-ts 版本时，初始访问页面，getter 上不一定有值，如果不做兼容会报错

### BUG

1. vue Cannot convert object to primitive value

- template 上设置本该为 string 的值为对象

### 其他

1. ERROR: Failed to download Chromium r686378! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.

- npm config set puppeteer_download_host=https://npm.taobao.org/mirrors
- node node_modules/puppeteer/install.js

1. vue Cannot convert object to primitive value

- template 上设置本该为 string 的值为对象

2. webpack4 配置 ssr 环境遇到“document is not defined”

- 问题原因：在服务端渲染打包的配置中使用了 mini-css-extract-plugin 是的 server bundle 中会使用到 document，node 环境中不存在 window 对象，所以报错。

3. SSR modOpt.store.registerModule is not a function

- 注册的模块代码格式不对

4. Must use import to load ES Module:

- https://github.com/shuidi-fed/vapper/issues/107

5. stream error Error: connect ECONNREFUSED 127.0.0.1:80

- axios 请求头一定要写全： http:// 这种 [参考地址](https://stackoverflow.com/questions/61530897/axios-error-connect-econnrefused-127-0-0-180)

6. CSR https://www.cnblogs.com/chuaWeb/p/prerender-plugin.html

7. Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-

8. [prerender-spa-plugin] Unable to prerender all routes!

9. - configuration has an unknown property 'postcss'. These properties are valid:

- https://stackoverflow.com/questions/40922052/webpack-error-configuration-has-an-unknown-property-postcss

10. [预渲染配合 CDN](https://www.liangzl.com/get-article-detail-182141.html)
