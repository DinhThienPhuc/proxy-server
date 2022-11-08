const sequelize = require("./init");
const Exam = require("./exam.model");
const Question = require("./question.model");
const User = require("./user.model");
const UserExamQuestion = require("./userExamQuestion.model");
const ExamQuestion = require("./examQuestion.model");

module.exports = {
  sequelize,
  models: {
    Exam,
    Question,
    User,
    UserExamQuestion,
    ExamQuestion,
  },
};
