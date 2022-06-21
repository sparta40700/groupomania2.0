module.exports = {
  HOST: "localhost",
  //PORT: 8889,
  PORT: 3306,
  USER: "root",
  PASSWORD: "",
  DB: "groupomania",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
