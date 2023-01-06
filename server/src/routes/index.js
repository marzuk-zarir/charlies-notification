const apiRouter = require('express').Router()
const defaultRouter = require('./default')
const browserRouter = require('./browser')
const expoRouter = require('./expo')
const { registerWebPush } = require('../middlewares/browser')
const { registerExpoPush } = require('../middlewares/expo')

apiRouter.use(registerWebPush)
apiRouter.use(registerExpoPush)

apiRouter.use('/browser', browserRouter)
apiRouter.use('/expo', expoRouter)
apiRouter.use('/', defaultRouter)

module.exports = apiRouter
