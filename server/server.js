const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql2')
const { queryPromise, parseAnswerRightOrWrong } = require('./utils')

const app = express()

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))
app.use(express.json())

const databaseInfo = {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
}

const mysqlConnector = mysql.createConnection(databaseInfo)

mysqlConnector.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

const FAKE_USER_ID = 123456

app.post('/exams/:id', async (req, res) => {
  try {
    const examData = await queryPromise(
      mysqlConnector,
      `SELECT * FROM users_exams_questions WHERE users_exams_questions.user_id=${FAKE_USER_ID} AND users_exams_questions.exam_id=${req.params.id} LIMIT 1`
    )
    if (examData.length) {
      await queryPromise(
        mysqlConnector,
        `DELETE FROM users_exams_questions WHERE users_exams_questions.user_id=${FAKE_USER_ID} AND users_exams_questions.exam_id=${req.params.id}`
      )
    }
    // TODO: cham diem
    // const examQuestions = await queryPromise(
    //   mysqlConnector,
    //   `SELECT * FROM questions INNER JOIN exams ON exams.id=${req.params.id} INNER JOIN users_questions ON users_questions.question_id=questions.id`
    // )
    const score = '70/100'
    // TODO: create a calculate-score function
    const parsedQuestionAnswers = Object.keys(req.body).map((questionId) => {
      return `('${FAKE_USER_ID}', '${req.params.id}', '${questionId}', '${
        req.body[questionId] || ''
      }', '${score}')`
    })

    await queryPromise(
      mysqlConnector,
      `INSERT INTO users_exams_questions (user_id, exam_id, question_id, user_answer, exam_score) VALUES ${parsedQuestionAnswers}`
    )
    console.log('result', result)
    res.json({ status: 'result' })
  } catch (error) {
    res.json(error)
  }
})

app.get('/exams/:id', async (req, res) => {
  try {
    const examInfo = await queryPromise(
      mysqlConnector,
      `SELECT * FROM exams WHERE exams.id=${req.params.id}`
    )
    const questions = await queryPromise(
      mysqlConnector,
      `SELECT * FROM questions INNER JOIN exams_questions ON exams_questions.exam_id = ${req.params.id} AND exams_questions.question_id=questions.id`
    )
    // const examQuestions = await queryPromise(
    //   mysqlConnector,
    //   `SELECT DISTINCT questions.id, questions.title, questions.type, questions.option_1, questions.option_2, questions.option_3, questions.option_4, users_exams_questions.user_answer, users_exams_questions.exam_score FROM questions INNER JOIN users_exams_questions ON users_exams_questions.exam_id=${req.params.id}`
    // )
    console.log('questions', questions)
    // res.json({
    //   ...(!!examInfo?.length ? examInfo?.[0] : {}),
    //   // questions: parseAnswerRightOrWrong(examQuestions),
    // })
    res.json(questions)
  } catch (error) {
    res.json(error)
  }
})

app.get('/exams', async (req, res) => {
  try {
    const listExams = await queryPromise(mysqlConnector, `SELECT * FROM exams`)
    const userExams = await queryPromise(
      mysqlConnector,
      `SELECT DISTINCT * FROM users_exams_questions WHERE users_exams_questions.user_id=${FAKE_USER_ID}`
    )
    const result = listExams?.map((exam) => ({
      ...exam,
      score: userExams?.find((e) => exam.id === e.exam_id)?.exam_score ?? null,
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
