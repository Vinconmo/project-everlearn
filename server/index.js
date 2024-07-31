'use strict';

const Koa = require('koa');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const db = require('./db');
const router = require('./router');
const app = new Koa();
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const CLIENT_PORT = 5173;

const validOrigins = [
  `http://localhost:${CLIENT_PORT}`,
  `http://127.0.0.1:${CLIENT_PORT}`
]

// Origin verification generator
function verifyOrigin (ctx) {
    // Get requesting origin hostname
    const origin = ctx.headers.origin;

    // Make sure it's a valid origin
    if (validOrigins.indexOf(origin) != -1) {
       // Set the header to the requested origin
      ctx.set('Access-Control-Allow-Origin', origin);
      return origin
    }
}

const corsConfig = {
  origin: verifyOrigin,
};

// Configure Koa to use kcors module with origin verification
app.use(cors(corsConfig))
  .use(bodyParser())
  .use(router.routes());

(async () => {
  await db.sequelize.sync();
  console.log('💾 Database along with all models connected')
  app.listen(SERVER_PORT, () => console.log(`🚀 Server running on port ${SERVER_PORT}`));
})()
