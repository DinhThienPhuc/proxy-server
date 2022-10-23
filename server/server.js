const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = process.env.PORT || 8000

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

const QUESTION_TYPE = {
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE',
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  FILL_MISSING_TEXT: 'FILL_MISSING_TEXT',
}

const mockExams = [
  {
    name: 'Exam 1',
    description: 'This is exam 1 mock data',
    status: 'tested',
    id: '10-2n3-19321-83n2183n-183',
    score: '90/100',
  },
  {
    name: 'Exam 2',
    description: 'This is exam 2 mock data',
    status: 'tested',
    id: '10-2n3-19321-n0as8d12-183',
    score: '80/100',
  },
  {
    name: 'Exam 3',
    description: 'This is exam 3 mock data',
    status: 'tested',
    id: '10-2n3-19321-83n2183n-183',
    score: '90/100',
  },
  {
    name: 'Exam 4',
    description: 'This is exam 4 mock data',
    status: 'tested',
    id: '10-2n3-19321-sa0nd80-as98d-183',
    score: '90/100',
  },
  {
    name: 'Exam 5',
    description: 'This is exam 5 mock data',
    status: 'tested',
    id: '10-2n3-19321-a2321312-183',
    score: '90/100',
  },
  {
    name: 'Exam 6',
    description: 'This is exam 6 mock data',
    status: 'tested',
    id: '10-2n3-19321-bv3453szdg-183',
    score: '90/100',
  },
  {
    name: 'Exam 7',
    description: 'This is exam 7 mock data',
    status: 'tested',
    id: '10-2n3-19321-ff43q5435z-183',
    score: '90/100',
  },
  {
    name: 'Exam 8',
    description: 'This is exam 8 mock data',
    status: 'tested',
    id: '10-2n3-19321-v54y457d-183',
    score: '90/100',
  },
  {
    name: 'Exam 9',
    description: 'This is exam 9 mock data',
    status: 'tested',
    id: '10-2n3-19321-b36dfxfd-183',
    score: '90/100',
  },
  {
    name: 'Exam 10',
    description: 'This is exam 10 mock data',
    status: 'tested',
    id: '10-2n3-19321-btrs67346-183',
    score: '90/100',
  },
  {
    name: 'Exam 11',
    description: 'This is exam 11 mock data',
    status: 'tested',
    id: '10-2n3-19321-nhxzer7362-183',
    score: '90/100',
  },
  {
    name: 'Exam 12',
    description: 'This is exam 12 mock data',
    status: 'tested',
    id: '10-2n3-19321-ndxr63527c-183',
    score: '90/100',
  },
]

const mockQuestion = [
  {
    id: 'as0d-a08n-812n8asdasd',
    title:
      'When we went back to the bookstore, the bookseller _______ the book we wanted',
    type: QUESTION_TYPE.SINGLE_CHOICE,
    option1: 'sold',
    option2: 'had sold',
    option3: 'sells',
    option4: 'has sold',
    answer: 'had sold',
  },
  {
    id: 'as0d-a08n-ns0a9d8n9012709a0d8s',
    title: 'By the end of last summer, the farmers _______ all the crop',
    type: QUESTION_TYPE.SINGLE_CHOICE,
    option1: 'harvested',
    option2: 'had harvested',
    option3: 'harvest',
    option4: 'are harvested',
    answer: 'harvest',
  },
  {
    id: 'as0d-a08n-0as89d0812n-sa2',
    title: 'The room was infested ________ cockroaches',
    type: QUESTION_TYPE.MULTIPLE_CHOICE,
    option1: 'to',
    option2: 'by',
    option3: 'at',
    option4: 'with',
    answer: 'by:::at',
  },
  {
    id: 'as0d-a08n-as09na8012-sa2',
    title: 'Do you really believe ________ ghosts',
    type: QUESTION_TYPE.FILL_MISSING_TEXT,
    option1: null,
    option2: null,
    option3: null,
    option4: null,
    answer: 'in',
  },
]

app.get('/candidate/exams/:id', (req, res) => {
  res.json({ candidateAnswer: [] })
})

app.get('/exams/:id', (req, res) => {
  const detailExam = mockExams.find((exam) => exam.id === req.params.id)
  res.json({ ...detailExam, questions: mockQuestion })
})

app.get('/exams', (req, res) => {
  res.json(mockExams)
})

app.get('/exams', (req, res) => {
  res.json(mockExams)
})

app.get('/cache/:path', (req, res) => {
  const date = new Date()

  res.json({
    type: 'cache',
    route: `/${req.params.path}`,
    headers: req.headers,
    time: date.toLocaleString(),
  })
})

app.get('/:path', (req, res) => {
  const date = new Date()

  res.json({
    type: 'basic',
    route: `/${req.params.path}`,
    headers: req.headers,
    time: date.toLocaleString(),
  })
})

app.get('/', (req, res) => {
  const date = new Date()

  res.json({
    type: 'basic - homepage',
    route: '/',
    headers: req.headers,
    time: date.toLocaleString(),
  })
})

app.listen(port, () => console.log('Server is running'))
