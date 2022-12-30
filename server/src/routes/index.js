const apiRouter = require('express').Router()
const { postSubscribe, postNotify, getNotifications, getHealth } = require('../controllers')
const validator = require('../middlewares/validator')
const notify = require('../schemas/notify')
const subscribe = require('../schemas/subscribe')

apiRouter.post('/subscribe', validator(subscribe), postSubscribe)
apiRouter.post('/notify', validator(notify), postNotify)
apiRouter.get('/notifications', getNotifications)
apiRouter.get('/health', getHealth)

module.exports = apiRouter
