const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: "root",
  database: "todos_db",
});

const ToDo = require("./toDoModel");

sequelize.sync();

module.exports = { sequelize, ToDo };
