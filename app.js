const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('express-async-errors')

const textToSkillRouter = require('./controllers/textToSkills')
const jobsByKeyWords = require('./controllers/jobsByKeyWords')
const coursesByKeyWords = require('./controllers/coursesByKeyWords')

const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const path = require('path')

console.log('Connecting to', config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(express.static(path.join(__dirname, 'client/build')))
app.use(bodyParser.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/text-to-skills/', textToSkillRouter)
app.use('/api/jobs-by-keywords/', jobsByKeyWords)
app.use('/api/courses-by-keywords', coursesByKeyWords)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
