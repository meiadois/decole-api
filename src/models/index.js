require('dotenv/config');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const db = {};
const sequelize = new Sequelize(dbConfig);

fs
    .readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
    .forEach((file) => {
        let path_ = path.join(__dirname, file);
        const model = sequelize.import(path_);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    console.log(`Recognizing ${modelName}`)
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
