const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("crud_db", "root", "senai", {
  host: "localhost",
  dialect: "mariadb",
  port: 3306, 
  logging: false
});

module.exports = sequelize;