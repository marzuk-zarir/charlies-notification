const browserRouter = require('express').Router()
const { postSubscribe } = require('../controllers/browser')
const { validator } = require('../middlewares/common')
const { subscribe } = require('../validators/browser')

browserRouter.post('/subscribe', validator(subscribe), postSubscribe)

module.exports = browserRouter
