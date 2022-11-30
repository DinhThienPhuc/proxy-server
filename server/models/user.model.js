const { DataTypes } = require("sequelize");
const sequelize = require("./init");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.TEXT("long"),
    },
    lastName: {
      type: DataTypes.TEXT("long"),
    },
    description: {
      type: DataTypes.TEXT("long"),
    },
    email: {
      type: DataTypes.TEXT("long"),
    },
    gender: {
      type: DataTypes.TEXT("long"),
    },
    age: {
      type: DataTypes.INTEGER,
    },
    password: {
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    refreshToken: {
      type: DataTypes.TEXT("long"),
    },
  },
  {
    tableName: "users",
  }
);

module.exports = User;
