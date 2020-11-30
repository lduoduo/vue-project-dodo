const Vue = require('vue');
const Koa = require('koa2');
const createApp = require('./createApp');

const template = require('fs').readFileSync('./template.html', 'utf-8');

const renderer = require('vue-server-renderer').createRenderer({
  template,
});

const vueContext = {
  title: 'vue ssr',
  meta: `
        <meta name="keyword" content="vue,ssr">
        <meta name="description" content="vue srr demo">
    `,
};

const app = new Koa();

const port = process.env.PORT || 10001;

//ssr 中间件
app.use(async (ctx, next) => {
  const { vue } = createApp(ctx.req);

  renderer.renderToString(vue, vueContext, (err, html) => {
    console.log('err html', err, html);
    if (err) {
      ctx.status = 500;
      // ctx.redirect('/cart');
      ctx.body = err.message;
      return;
    }

    ctx.body = html;
  });
});

//启动服务
app.listen(port, () => {
  console.log('\n\n SERVER APP @', `http://localhost:${port}\n`);
});
