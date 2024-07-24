const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const {db, sequelize} = require('./db');
const router = require('./router');
const app = new Koa();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const CLIENT_PORT = 3000;

const corsConfig = {
  origin: [`http://localhost:${CLIENT_PORT}`]
}


app.use(cors(corsConfig))
  .use(bodyParser())
  .use(router.routes());

(async () => {
  await sequelize.sync();
  console.log('💾 Database along with all models connected')
  app.listen(SERVER_PORT, console.log(`🚀 Server running on port ${SERVER_PORT}`));
})()
