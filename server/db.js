const {Sequelize} = require('sequelize');
const {readdir} = require('node:fs/promises')
const {join} = require('node:path');

const modelDir = 'model';

const dbConfig = {
  name: 'everlearn',
  username: 'postgres',
  password: 'postgres',
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
}
const sequelize = new Sequelize(
  dbConfig.name,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

const db = {};

// add all tables (model files) to db
(async () => {
  const files = await readdir(join(__dirname, modelDir))
  for (const file of files) {
    // invoke function in each model which returns the model
    const model = require(join(__dirname, modelDir, file))()
    db[model.name] = model;
    console.log(`🧩 Model ${model.name} in database`)
  }
  // create table relations using associate method of the model
  for (const model in db) {
    if (db[model].associate) db[model].associate(db)
  }
})()

module.exports = {db, sequelize};
