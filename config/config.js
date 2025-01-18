require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: 3306,
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "u96zumhqz01herwo",
    password: "QBiuWS7QaaDGyNYd22uv",
    database: "bynajquhkjla2xtreid3",
    host: "bynajquhkjla2xtreid3-mysql.services.clever-cloud.com",
    dialect: "mysql",
    port: 3306,
  },
};
