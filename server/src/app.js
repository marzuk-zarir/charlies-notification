const express = require('express')
const cors = require('cors')
const apiRouter = require('./routes')
const { notFoundHandler, defaultErrorHandler } = require('./middlewares/errors')
const registerWebPush = require('./middlewares/registerWebPush')

const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.use(registerWebPush)

// routers
app.use('/api', apiRouter)

// error handlers
apiRouter.use(notFoundHandler)
apiRouter.use(defaultErrorHandler)

module.exports = app
