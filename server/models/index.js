const sequelize = require('./init')
const Exam = require('./exam.model')
const Question = require('./question.model')
const User = require('./user.model')
const UserExamQuestion = require('./user_exam_question.model')

User.hasMany(UserExamQuestion)
Exam.hasMany(UserExamQuestion)
Question.hasMany(UserExamQuestion)

UserExamQuestion.belongsTo(User)
UserExamQuestion.belongsTo(Exam)
UserExamQuestion.belongsTo(Question)

module.exports = {
  sequelize,
  models: {
    Exam,
    Question,
    User,
    UserExamQuestion,
  },
}
