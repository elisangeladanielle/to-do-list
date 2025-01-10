const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ToDo = sequelize.define("ToDo", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = ToDo;
