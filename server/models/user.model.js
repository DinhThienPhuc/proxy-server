const { DataTypes } = require('sequelize')
const sequelize = require('./init')

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    age: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'users',
  }
)

module.exports = User
