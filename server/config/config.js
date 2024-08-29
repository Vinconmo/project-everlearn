const fs = require("fs");

module.exports = {
  development: {
    username: "database_dev",
    password: "database_dev",
    database: "database_dev",
    host: "127.0.0.1",
    port: 3306,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  test: {
    username: process.env.CI_DB_USERNAME,
    password: process.env.CI_DB_PASSWORD,
    database: process.env.CI_DB_NAME,
    host: "127.0.0.1",
    port: 3306,
    dialect: "postgres",
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  production: {
    database: process.env.DATABASE_URL,
    host: process.env.PROD_DB_HOSTNAME,
    dialect: "postgres",
  },
};
