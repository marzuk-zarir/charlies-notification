const { postSubscribe } = require('../controllers/expo')
const { validator } = require('../middlewares/common')
const { expoPushToken } = require('../validators/expo')

const expoRouter = require('express').Router()

expoRouter.post('/subscribe', validator(expoPushToken), postSubscribe)

module.exports = expoRouter
