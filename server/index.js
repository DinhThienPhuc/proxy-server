const express = require('express')

const app = express()

app.listen(3000, () => console.log('Server is running'))
app.get('/', (_, res) => res.send('It works !!'))
