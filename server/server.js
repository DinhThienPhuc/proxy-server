const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 8000

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

app.get('/basic', (req, res) => {
  console.log('basic: ', req.headers)
  res.json({
    message: 'Basic flow',
    route: '/basic',
    data: {
      time: Date.now(),
    },
  })
})

app.get('/redis-cache', (req, res) => {
  console.log('redis cache: ', req.headers)
  res.json({
    message: 'Redis Cache flow',
    route: '/redis-cache',
    data: {
      time: Date.now(),
    },
  })
})

app.get('/:path', (req, res) => {
  res.json({
    message: 'Mixin flow',
    route: `/${req.params.path}`,
    data: {
      time: Date.now(),
    },
  })
})

app.get('/', (_, res) => {
  res.json({
    message: 'Homepage',
    route: '/',
    data: {
      time: Date.now(),
    },
  })
})

app.listen(port, () => console.log('Server is running'))
