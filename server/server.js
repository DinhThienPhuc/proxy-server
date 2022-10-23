const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mysql = require('mysql2')
const { queryPromise, parseAnswerRightOrWrong } = require('./utils')

const app = express()
const port = process.env.PORT || 8000

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

const mysqlConnector = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'quizz',
  database: 'quizz',
})

mysqlConnector.connect((err) => {
  if (err) throw err
  console.log('Connected!')
})

const FAKE_USER_ID = 123456

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

app.listen(port, () => console.log('Server is running'))
