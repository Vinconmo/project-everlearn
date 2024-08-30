"use strict";

const Koa = require("koa");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const db = require("./db");
const router = require("./router");
const app = new Koa();
const config = require("./config.js");

const validOrigins = [...config.CLIENT_URLS];

// Origin verification generator
function verifyOrigin(ctx) {
  // Get requesting origin hostname
  const origin = ctx.headers.origin;

  // Make sure it's a valid origin
  if (validOrigins.indexOf(origin) != -1) {
    // Set the header to the requested origin
    ctx.set("Access-Control-Allow-Origin", origin);
    return origin;
  }
}

const corsConfig = {
  origin: verifyOrigin,
};

// Configure Koa to use kcors module with origin verification
app.use(cors(corsConfig)).use(bodyParser()).use(router.routes());

(async () => {
  console.log("⏳ Starting the server");
  console.log("🐳 Environment: ", config.ENV);
  try {
    await db.sequelize.authenticate();
    console.log("💾 Connected to the database!");
  } catch (err) {
    console.error("❌ Error connecting to the database:", err);
  }
  await db.sequelize.sync();
  console.log("💾 Database synced with all models");
  app.listen(config.SERVER_PORT, () =>
    console.log(
      `🚀 Server running on ${config.SERVER_URL}:${config.SERVER_PORT}`
    )
  );
})();
