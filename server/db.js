'use strict';
require("dotenv").config();
const Sequelize = require('sequelize');
const {readdir} = require('node:fs/promises')
const {join} = require('node:path');

const modelDir = 'model';

const dbConfig = {
  name: "everlearn",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  dialect: "postgres",
  logging: false,
};
const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);
const db = {};

// add all tables (model files) to db
(async () => {
  try {
    const modelFiles = await readdir(join(__dirname, modelDir))
    for (let file of modelFiles) {
      // skip models
      if (file !== 'gemini.js') {
        // invoke function in each model which returns the model
        const model = require(join(__dirname, modelDir, file))(sequelize)
        db[model.name] = model;
        console.log(`🧩 Model ${model.name} in database`)
      }
    }
    // create table relations using associate method of the model
    for (let modelName in db) {
      if (db[modelName].associate) db[modelName].associate(db)
    }
  } catch (error) {
    console.log('Error loading model files into db: ', error)
  }
})();

db.sequelize = sequelize;

module.exports = db;
