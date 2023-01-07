const expressAsyncHandler = require('express-async-handler')
const redis = require('../../db')

/**
 * @Post /api/expo/subscribe
 * @description subscribe to expo push notifications
 */
exports.postSubscribe = expressAsyncHandler(async (req, res) => {
    const { token } = req.body
    const subscribers = JSON.parse(await redis.get('expo-subscribers')) || []

    if (subscribers.find((s) => s === token)) {
        return res.sendStatus(201)
    }

    if (subscribers.length === 5) {
        subscribers.shift()
    }

    subscribers.push(token)
    await redis.set('expo-subscribers', JSON.stringify(subscribers))

    console.log(await redis.get('expo-subscribers'))

    res.sendStatus(201)
})
