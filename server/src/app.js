const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes')
const { notFoundHandler, defaultErrorHandler } = require('./middlewares/common')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())

// router
app.use('/api', apiRouter)

// error handlers
app.use(notFoundHandler)
app.use(defaultErrorHandler)

module.exports = app
