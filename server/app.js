const Vue = require('vue');
const Koa = require('koa2');
const Readable = require('stream').Readable;

const { createBundleRenderer } = require('vue-server-renderer');

const template = require('fs').readFileSync('./template.html', 'utf-8');
const serverBundle = require('./assets/vue-ssr-server-bundle.json');
const clientManifest = require('./assets/vue-ssr-client-manifest.json');

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

  /** 必须 */
  const view = new Readable();
  view._read = () => {};

  ctx.body = view;
  ctx.type = 'html';

  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  const stream = renderer.renderToStream(context);

  stream.on('data', (data) => {
    console.log('onData', data.toString());
    //全部写完后，结束掉http response
    view.push(data.toString());
  });

  stream.on('end', () => {
    console.log(html); // 渲染完成
    //全部写完后，结束掉http response
    view.push(null);
  });

  stream.on('error', (err) => {
    // handle error...
    //全部写完后，结束掉http response
    view.push(`<div style="color: red;">${err.message}</div>`);
  });

  await next();
});

//启动服务
app.listen(port, () => {
  console.log('\n\n SERVER APP @', `http://localhost:${port}\n`);
});
