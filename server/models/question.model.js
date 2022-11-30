const { DataTypes } = require("sequelize");
const sequelize = require("./init");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      unique: true,
    },
    type: {
      type: DataTypes.TEXT,
    },
    a: {
      type: DataTypes.TEXT,
    },
    b: {
      type: DataTypes.TEXT,
    },
    c: {
      type: DataTypes.TEXT,
    },
    d: {
      type: DataTypes.TEXT,
    },
    answer: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "questions",
  }
);

module.exports = Question;
