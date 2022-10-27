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
    // const listExams = await queryPromise(
    //   mysqlConnector,
    //   `SELECT * FROM exams INNER JOIN users_exams ON users_exams.user_id=${FAKE_USER_ID} AND users_exams.exam_id=exams.id`
    // )
    res.json({ status: req.body })
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
    const examQuestions = await queryPromise(
      mysqlConnector,
      `SELECT * FROM questions INNER JOIN exams ON exams.id=${req.params.id} INNER JOIN users_questions ON users_questions.question_id=questions.id`
    )
    res.json({
      ...(!!examInfo?.length ? examInfo?.[0] : {}),
      questions: parseAnswerRightOrWrong(examQuestions),
    })
  } catch (error) {
    res.json(error)
  }
})

app.get('/exams', async (req, res) => {
  try {
    const listExams = await queryPromise(
      mysqlConnector,
      `SELECT * FROM exams INNER JOIN users_exams ON users_exams.user_id=${FAKE_USER_ID} AND users_exams.exam_id=exams.id`
    )
    res.json(listExams)
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
