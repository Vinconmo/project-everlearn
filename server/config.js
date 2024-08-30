require("dotenv").config({path: '../.env'});

let DB_URI, CLIENT_URLS, SERVER_URL, ENV, SERVER_PORT;

switch (process.env.NODE_ENV) {
  case "development":
    // DB connection
    if (
      process.env.DB_USERNAME &&
      process.env.DB_PASSWORD &&
      process.env.DB_HOST &&
      process.env.DB_PORT
    )
      DB_URI = `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`;
    else "postgres://postgres:postgres@localhost:5432";
    // server url
    SERVER_PORT = process.env.VITE_SERVER_PORT || 3000;
    SERVER_URL = `http://localhost:${process.env.VITE_SERVER_PORT || 3000}`;
    // client url
    CLIENT_URLS = [
      `http://${process.env.VITE_LOCAL_HOST}:${process.env.CLIENT_PORT || 5173}`,
      `http://localhost:${process.env.CLIENT_PORT || 5173}`,
    ];
    // Environment
    ENV = "development";
    break;
  case "production":
    // DB connection
    DB_URI = process.env.DATABASE_URL;
    // server url
    SERVER_URL = process.env.VITE_SERVER_DEPLOY;
    SERVER_PORT = process.env.VITE_SERVER_PORT || 3000;
    // client url
    CLIENT_URLS = [process.env.CLIENT_DEPLOY, process.env.CLIENT_PREVIEW];
    // environment
    ENV = "production";
    break;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY

module.exports = {
  DB_URI,
  CLIENT_URLS,
  SERVER_URL,
  ENV,
  SERVER_PORT,
  GEMINI_API_KEY
};
