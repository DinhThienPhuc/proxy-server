const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 8000

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

app.get('/cache/:path', (req, res) => {
  res.json({
    message: 'Cache route',
    route: `/${req.params.path}`,
    data: {
      time: Date.now(),
    },
  })
})

app.get('/:path', (req, res) => {
  res.json({
    message: 'All route',
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
