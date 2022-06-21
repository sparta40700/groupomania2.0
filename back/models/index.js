const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");

const sequelizeInstance = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelizeInstance
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const db = {};
db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

db.User = require("./User.js")(sequelizeInstance, Sequelize);

db.Post = require("./Post.js")(sequelizeInstance, Sequelize);

db.Comment = require("./Comment")(sequelizeInstance, Sequelize)

module.exports = db;
