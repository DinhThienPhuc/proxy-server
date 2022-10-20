const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 8000

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

const mockExams = [
  {
    name: 'Exam 1',
    description: 'This is exam 1 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-83n2183n-183',
    score: '90/100',
  },
  {
    name: 'Exam 2',
    description: 'This is exam 2 mock data',
    type: 'multi-choice',
    status: 'tested',
    id: '10-2n3-19321-n0as8d12-183',
    score: '80/100',
  },
  {
    name: 'Exam 3',
    description: 'This is exam 3 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-83n2183n-183',
    score: '90/100',
  },
  {
    name: 'Exam 4',
    description: 'This is exam 4 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-sa0nd80-as98d-183',
    score: '90/100',
  },
  {
    name: 'Exam 5',
    description: 'This is exam 5 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-a2321312-183',
    score: '90/100',
  },
  {
    name: 'Exam 6',
    description: 'This is exam 6 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-bv3453szdg-183',
    score: '90/100',
  },
  {
    name: 'Exam 7',
    description: 'This is exam 7 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-ff43q5435z-183',
    score: '90/100',
  },
  {
    name: 'Exam 8',
    description: 'This is exam 8 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-v54y457d-183',
    score: '90/100',
  },
  {
    name: 'Exam 9',
    description: 'This is exam 9 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-b36dfxfd-183',
    score: '90/100',
  },
  {
    name: 'Exam 10',
    description: 'This is exam 10 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-btrs67346-183',
    score: '90/100',
  },
  {
    name: 'Exam 11',
    description: 'This is exam 11 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-nhxzer7362-183',
    score: '90/100',
  },
  {
    name: 'Exam 12',
    description: 'This is exam 12 mock data',
    type: 'single-choice',
    status: 'tested',
    id: '10-2n3-19321-ndxr63527c-183',
    score: '90/100',
  },
]

app.get('/exams/:id', (req, res) => {
  const detailExam = mockExams.find((exam) => exam.id === req.params.path)
  res.json(detailExam)
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
