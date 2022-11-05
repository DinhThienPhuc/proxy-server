const { DataTypes } = require('sequelize')
const sequelize = require('./init')
const Exam = require('./exam.model')
const User = require('./user.model')
const Question = require('./question.model')

const UserExamQuestion = sequelize.define(
  'UserExamQuestion',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    examId: {
      type: DataTypes.INTEGER,
      references: {
        model: Exam,
        key: 'id',
      },
    },
    questionId: {
      type: DataTypes.INTEGER,
      references: {
        model: Question,
        key: 'id',
      },
    },
    userAnswer: {
      type: DataTypes.STRING,
    },
    examScore: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'users_exams_questions',
  }
)

module.exports = UserExamQuestion
