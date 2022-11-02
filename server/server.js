const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { models } = require('./models')
const uniqBy = require('lodash/uniqBy')
const Sequelize = require('sequelize')
const { isAnswerForThisQuestionRight } = require('./utils')

const app = express()

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

const FAKE_USER_ID = 123456

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

app.get('/exams/:id', async (req, res) => {
  try {
    const examInfo = await models.Exam.findOne({
      where: {
        id: +req.params.id,
      },
    })

    const listQuestions = await models.Question.findAll({
      attributes: [
        'id',
        'title',
        'type',
        'option1',
        'option2',
        'option3',
        'option4',
        'answer',
        'createdAt',
        'updatedAt',
      ],
      include: {
        model: models.UserExamQuestion,
        attributes: ['userAnswer', 'examScore'],
        where: {
          questionId: Sequelize.col('Question.id'),
          examId: +req.params.id,
        },
      },
      include: {
        model: models.Exam,
        attributes: ['userAnswer', 'examScore'],
        where: {
          questionId: Sequelize.col('Question.id'),
          examId: +req.params.id,
        },
      },
    })

    // TODO: re add exams_questions table

    const result = listQuestions.map((questionData) => ({
      id: questionData.id,
      title: questionData.title,
      type: questionData.type,
      option1: questionData.option1,
      option2: questionData.option2,
      option3: questionData.option3,
      option4: questionData.option4,
      examScore: '80/100',
      createdAt: '2022-11-02T14:23:41.000Z',
      updatedAt: '2022-11-02T14:23:41.000Z',
    }))

    // const examQuestions = await queryPromise(
    //   mysqlConnector,
    //   `SELECT DISTINCT questions.id, questions.title, questions.type, questions.option_1, questions.option_2, questions.option_3, questions.option_4, users_exams_questions.user_answer, users_exams_questions.exam_score FROM questions INNER JOIN users_exams_questions ON users_exams_questions.exam_id=${req.params.id}`
    // )
    // res.json({
    //   ...(!!examInfo?.length ? examInfo?.[0] : {}),
    //   // questions: parseAnswerRightOrWrong(examQuestions),
    // })

    res.json(listQuestions)
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

app.get('/test', async (req, res) => {
  try {
    res.json(databaseInfo)
  } catch (error) {
    res.json(error)
  }
})

app.listen(process.env.PORT, () => console.log('Server is running'))
