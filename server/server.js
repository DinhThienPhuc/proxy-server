const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { models } = require('./models')
const uniqBy = require('lodash/uniqBy')
const Sequelize = require('sequelize')
const { sequelize } = require('./models')
const { isAnswerForThisQuestionRight } = require('./utils')

const questionsData = require('./database/questions.json')
const usersData = require('./database/users.json')
const examsData = require('./database/exams.json')

const app = express()

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

const FAKE_USER_ID = '4827b258-5fb2-43ed-b337-9f9ea18be3e0' // TODO: hardcode now. Real user id must be used later

// TODO: apply redis later

app.post('/exams/:id', async (req, res) => {
  try {
    await models.UserExamQuestion.destroy({
      where: {
        examId: req.params.id,
        userId: FAKE_USER_ID,
      },
    })

    let score = 0
    const questionsDictionary = {}
    const listQuestionIds = Object.keys(req.body.data)

    const listQuestions = await models.Question.findAll({
      where: {
        id: {
          [Sequelize.Op.or]: listQuestionIds,
        },
      },
    })

    listQuestions.forEach((questionData) => {
      questionsDictionary[questionData.id] = questionData
    })

    let data = listQuestionIds.map((questionId) => {
      const type = questionsDictionary[questionId]?.type
      const answer = questionsDictionary[questionId]?.answer
      score += isAnswerForThisQuestionRight(
        type,
        req.body.data[questionId],
        answer
      )
        ? 10
        : 0

      return {
        userId: FAKE_USER_ID,
        examId: req.params.id,
        questionId,
        userAnswer: req.body.data[questionId],
      }
    })

    data = data.map((d) => ({ ...d, examScore: `${score}/100` }))

    const response = await models.UserExamQuestion.bulkCreate(data)
    res.json({
      response,
    })
  } catch (error) {
    res.json(error)
  }
})

app.get('/exams/:id', async (req, res) => {
  try {
    const examInfo = await models.Exam.findOne({
      where: {
        id: req.params.id,
      },
    })

    const listQuestionsOfExam = await models.ExamQuestion.findAll({
      where: {
        examId: req.params.id,
      },
    })

    listQuestionsWithDetailOfExam = await models.Question.findAll({
      where: {
        id: listQuestionsOfExam?.map((data) => data.questionId),
      },
    })

    const listQuestionsOfUser = await models.UserExamQuestion.findAll({
      where: {
        examId: req.params.id,
        userId: FAKE_USER_ID,
      },
    })

    const result = listQuestionsWithDetailOfExam.map((questionData) => {
      const userQuestionData = listQuestionsOfUser?.find(
        (data) => data.questionId === questionData.id
      )

      const isRight = userQuestionData?.userAnswer
        ? isAnswerForThisQuestionRight(
            questionData.type,
            userQuestionData?.userAnswer,
            questionData.answer
          )
        : false

      return {
        id: questionData.id,
        title: questionData.title,
        type: questionData.type,
        a: questionData.a,
        b: questionData.b,
        c: questionData.c,
        d: questionData.d,
        examScore: userQuestionData?.examScore || null,
        userAnswer: userQuestionData?.userAnswer || null,
        // answer: questionData.answer,
        isRight,
        createdAt: questionData.createdAt,
        updatedAt: questionData.updatedAt,
      }
    })

    res.json({
      id: examInfo.id,
      name: examInfo.name,
      description: examInfo.description,
      examScore: listQuestionsOfUser?.[0]?.examScore || null,
      questions: result,
    })
  } catch (error) {
    res.json({ error })
  }
})

app.get('/exams', async (_, res) => {
  try {
    const listExams = await models.Exam.findAll()
    const userExams = await models.UserExamQuestion.findAll({
      where: { userId: FAKE_USER_ID },
    })

    const uniqUserExams = uniqBy(userExams, 'userId', 'examId')

    const result = listExams?.map((exam) => ({
      id: exam.id,
      name: exam.name,
      description: exam.description,
      createdAt: exam.createdAt,
      updatedAt: exam.updatedAt,
      score:
        uniqUserExams?.find((e) => exam.id === e.examId)?.examScore ?? null,
    }))

    res.json(result)
  } catch (error) {
    res.json(error)
  }
})

/**
 * Dashboard api --------------------------------------------------------------
 */
app.get('/dashboard', async (_, res) => {
  try {
    const questions = await models.Question.findAll()
    const exams = await models.Exam.findAll()
    const examsQuestions = await models.ExamQuestion.findAll()
    res.json({ questions, exams, examsQuestions })
  } catch (error) {
    res.json(error)
  }
})

app.post('/dashboard/create', async (req, res) => {
  try {
    await models.ExamQuestion.destroy({
      where: {
        examId: req.body.data.examId,
      },
    })
    const data = req.body.data.questionIds?.map((questionId) => ({
      examId: req.body.data.examId,
      questionId,
    }))
    const response = await models.ExamQuestion.bulkCreate(data)
    res.json(response)
  } catch (error) {
    res.json(error)
  }
})
/**
 * Dashboard api --------------------------------------------------------------
 */

/**
 * Start seeding database -----------------------------------------------------
 */
app.get('/init-data/questions', async (_, res) => {
  try {
    const response = await models.Question.bulkCreate(questionsData)
    res.json({
      response,
    })
  } catch (error) {
    res.json(error)
  }
})

app.get('/init-data/users', async (_, res) => {
  try {
    const response = await models.User.bulkCreate(usersData)
    res.json({
      response,
    })
  } catch (error) {
    res.json(error)
  }
})

app.get('/init-data/exams', async (_, res) => {
  try {
    const response = await models.Exam.bulkCreate(examsData)
    res.json({
      response,
    })
  } catch (error) {
    res.json(error)
  }
})
/**
 * End seeding database -------------------------------------------------------
 */

sequelize.sync()

app.listen(process.env.PORT, () => console.log('Server is running'))
