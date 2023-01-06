const expressAsyncHandler = require('express-async-handler')
const redis = require('../../db')

/**
 * @Post /api/browser/subscribe
 * @description subscribe to notifications
 */
exports.postSubscribe = expressAsyncHandler(async (req, res, next) => {
    const subscribers = JSON.parse(await redis.get('web-subscribers')) || []

    if (subscribers.find((s) => s.endpoint === req.body.endpoint)) {
        return res.sendStatus(201)
    }

    if (subscribers.length === 5) {
        subscribers.shift()
    }

    subscribers.push(req.body)
    await redis.set('web-subscribers', JSON.stringify(subscribers))

    res.sendStatus(201)
})
