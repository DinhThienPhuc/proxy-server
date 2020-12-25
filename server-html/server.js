const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 8001

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

app.get('/', (_, res) => {
  res.sendFile('./joke.jpg')
})

app.listen(port, () => console.log('Server is running'))
