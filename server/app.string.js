const Vue = require('vue');
const Koa = require('koa2');

const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync('./template.html', 'utf-8');

const serverBundle = require('../dist/vue-ssr-server-bundle.json');
const clientManifest = require('../dist/vue-ssr-client-manifest.json');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false, // 推荐
  template, // （可选）页面模板
  clientManifest, // （可选）客户端构建 manifest
});

const app = new Koa();

const port = process.env.PORT || 10001;

//ssr 中间件
app.use(async (ctx, next) => {
  const context = { url: ctx.req.url };
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    console.log('err html', err, html);
    if (err) {
      ctx.status = 500;
      // ctx.redirect('/cart');
      ctx.body = `<div style="color: red;">${err.message}</div>`;
      return;
    }

    ctx.body = html;
  });
});

//启动服务
app.listen(port, () => {
  console.log('\n\n SERVER APP @', `http://localhost:${port}\n`);
});
