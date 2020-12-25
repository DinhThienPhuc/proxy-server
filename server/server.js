const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 8000

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

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

app.get('/', (_, res) => {
  const date = new Date()

  res.json({
    type: 'basic - homepage',
    route: '/',
    headers: req.headers,
    time: date.toLocaleString(),
  })
})

app.listen(port, () => console.log('Server is running'))
