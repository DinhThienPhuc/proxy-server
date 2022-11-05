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
const examsQuestionsData = require('./database/examsQuestions.json')
const userExamsQuestionsData = require('./database/userExamsQuestions.json')

const app = express()

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

const FAKE_USER_ID = 1000
const TYPE = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  FILL_MISSING_TEXT: 'FILL_MISSING_TEXT',
}

// TODO: apply redis later

// app.post('/exams/:id', async (req, res) => {
//   try {
//     const examData = await queryPromise(
//       mysqlConnector,
//       `SELECT * FROM users_exams_questions WHERE users_exams_questions.user_id=${FAKE_USER_ID} AND users_exams_questions.exam_id=${req.params.id} LIMIT 1`
//     )
//     if (examData.length) {
//       await queryPromise(
//         mysqlConnector,
//         `DELETE FROM users_exams_questions WHERE users_exams_questions.user_id=${FAKE_USER_ID} AND users_exams_questions.exam_id=${req.params.id}`
//       )
//     }
//     // TODO: cham diem
//     // const examQuestions = await queryPromise(
//     //   mysqlConnector,
//     //   `SELECT * FROM questions INNER JOIN exams ON exams.id=${req.params.id} INNER JOIN users_questions ON users_questions.question_id=questions.id`
//     // )
//     const score = '70/100'
//     // TODO: create a calculate-score function
//     const parsedQuestionAnswers = Object.keys(req.body).map((questionId) => {
//       return `('${FAKE_USER_ID}', '${req.params.id}', '${questionId}', '${
//         req.body[questionId] || ''
//       }', '${score}')`
//     })

//     await queryPromise(
//       mysqlConnector,
//       `INSERT INTO users_exams_questions (user_id, exam_id, question_id, user_answer, exam_score) VALUES ${parsedQuestionAnswers}`
//     )
//     console.log('result', result)
//     res.json({ status: 'result' })
//   } catch (error) {
//     res.json(error)
//   }
// })

app.post('/exams/:id', async (req, res) => {
  res.json({ data: req.body })
})

app.get('/exams/:id', async (req, res) => {
  try {
    const examInfo = await models.Exam.findOne({
      where: {
        id: +req.params.id,
      },
    })

    const listQuestionsOfExam = await models.ExamQuestion.findAll({
      where: {
        examId: +req.params.id,
      },
    })

    listQuestionsWithDetailOfExam = await models.Question.findAll({
      where: {
        id: listQuestionsOfExam?.map((data) => data.questionId),
      },
    })

    const listQuestionsOfUser = await models.UserExamQuestion.findAll({
      where: {
        examId: +req.params.id,
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

    res.json(result)
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

app.get('/init-data/exams-questions', async (_, res) => {
  try {
    const response = await models.ExamQuestion.bulkCreate(examsQuestionsData)
    res.json({
      response,
    })
  } catch (error) {
    res.json(error)
  }
})

app.get('/init-data/users-exams-questions', async (_, res) => {
  try {
    const response = await models.UserExamQuestion.bulkCreate(
      userExamsQuestionsData
    )
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

app.listen(process.env.PORT, () => console.log('Server is running'))
