const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const CLIENT_PORT = 3000;

const corsConfig = {
  origin: [`http://localhost:${CLIENT_PORT}`]
}


app.use(async ctx => {
  ctx.body = 'Hello World';
})
  .use(cors(corsConfig))
  .use(bodyParser())
  .use(router.routes());

app.listen(SERVER_PORT);
