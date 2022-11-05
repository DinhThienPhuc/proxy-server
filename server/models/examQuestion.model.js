const { DataTypes } = require('sequelize')
const sequelize = require('./init')
const Exam = require('./exam.model')
const Question = require('./question.model')

const ExamQuestion = sequelize.define(
  'ExamQuestion',
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
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
  },
  {
    tableName: 'exams_questions',
  }
)

module.exports = ExamQuestion
