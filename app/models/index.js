const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  //operatorsAliases: false,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.login = require("./user.model.js")(sequelize, Sequelize);
db.departmentss = require("./departments.model.js")(sequelize, Sequelize);
db.ambulance_log = require("./ambulance_log.model.js")(sequelize, Sequelize);
db.ambulance = require("./ambulance.model.js")(sequelize,Sequelize);
db.appointments =require("./appointments.model.js")(sequelize,Sequelize);
db.billing =require("./billing.model.js")(sequelize,Sequelize);
db.blood_bank =require("./blood_bank.model.js")(sequelize,Sequelize);
db.doctors =require("./doctors.model.js")(sequelize,Sequelize);
module.exports = db;
