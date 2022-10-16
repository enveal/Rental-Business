const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

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
db.accounts = require("./account.model.js")(sequelize, Sequelize);
db.items = require("./items.model.js")(sequelize, Sequelize);
db.transactions = require("./transaction.model.js")(sequelize, Sequelize);

db.accounts.belongsToMany(db.transactions, {
  through: "account_transaction",
  as: "transaction",
  foreignKey: "account_transaction_id",
});

db.transactions.belongsToMany(db.accounts, {
  through: "account_transaction",
  as: "accounts",
  foreignKey: "transaction_account_id",
});

module.exports = db;