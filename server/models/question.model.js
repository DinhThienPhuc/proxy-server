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
    option1: {
      type: DataTypes.STRING,
    },
    option2: {
      type: DataTypes.STRING,
    },
    option3: {
      type: DataTypes.STRING,
    },
    option4: {
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
