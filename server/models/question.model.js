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
      type: DataTypes.STRING,
      unique: true,
    },
    type: {
      type: DataTypes.TEXT("long"),
    },
    a: {
      type: DataTypes.TEXT("long"),
    },
    b: {
      type: DataTypes.TEXT("long"),
    },
    c: {
      type: DataTypes.TEXT("long"),
    },
    d: {
      type: DataTypes.TEXT("long"),
    },
    answer: {
      type: DataTypes.TEXT("long"),
    },
  },
  {
    tableName: "questions",
  }
);

module.exports = Question;
