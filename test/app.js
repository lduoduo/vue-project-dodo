//web 服务启动入口对象

// import path from 'path';
const Koa = require('koa');
const fs = require('fs');
const path = require('path');

const app = new Koa();

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');

console.log('html', html);

//设置可访问的静态资源
//TODO:生产换需要删除此功能
app.use((ctx, next) => {
  ctx.body = html;
});

//启动服务
app.listen(10001, (e) => {
  console.log('w', e);
});

console.log('\n\n SERVER APP @', `http://localhost:10001\n`);
