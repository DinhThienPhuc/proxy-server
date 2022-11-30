const { DataTypes } = require("sequelize");
const sequelize = require("./init");

const Exam = sequelize.define(
  "Exam",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
    },
  },
  {
    tableName: "exams",
  }
);

module.exports = Exam;
