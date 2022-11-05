const { DataTypes } = require('sequelize')
const sequelize = require('./init')

const Question = sequelize.define(
  'Question',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      unique: true,
    },
    type: {
      type: DataTypes.STRING,
    },
    a: {
      type: DataTypes.STRING,
    },
    b: {
      type: DataTypes.STRING,
    },
    c: {
      type: DataTypes.STRING,
    },
    d: {
      type: DataTypes.STRING,
    },
    answer: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'questions',
  }
)

module.exports = Question
