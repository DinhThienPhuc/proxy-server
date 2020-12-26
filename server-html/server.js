const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const port = 8001

app.set('trust proxy', true)

app.use(cors())
app.use(morgan('combined'))

app.get('/:path', (_, res) => {
  // res.sendFile(__dirname + '/index.html')
  res.json({
    data: 'HTML',
  })
})

app.listen(port, () => console.log('Server is running'))
