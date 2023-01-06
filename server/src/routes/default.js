const defaultRouter = require('express').Router()
const { getNotifications, postNotify, getHealth } = require('../controllers/default')
const { validator } = require('../middlewares/common')
const { notify } = require('../validators/default')

defaultRouter.get('/notifications', getNotifications)
defaultRouter.post('/notify', validator(notify), postNotify)
defaultRouter.get('/health', getHealth)

module.exports = defaultRouter
