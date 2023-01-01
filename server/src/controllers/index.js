const expressAsyncHandler = require('express-async-handler')
const webpush = require('web-push')
const redis = require('../../db')

/**
 * @Post /api/subscribe
 * @description subscribe to notifications
 */
exports.postSubscribe = expressAsyncHandler(async (req, res, next) => {
    const subscribers = JSON.parse(await redis.get('subscribers')) || []

    if (subscribers.find((s) => s.endpoint === req.body.endpoint)) {
        return res.sendStatus(201)
    }

    if (subscribers.length === 5) {
        subscribers.shift()
    }

    subscribers.push(req.body)
    await redis.set('subscribers', JSON.stringify(subscribers))

    res.sendStatus(201)
})

/**
 * @Post /api/notify
 * @description send notification to subscribers
 */
exports.postNotify = expressAsyncHandler(async (req, res) => {
    const subscribers = JSON.parse(await redis.get('subscribers')) || []
    const notifications = JSON.parse(await redis.get('notifications')) || []
    const payload = {
        name: req.body.name,
        title: req.body.title,
        timestamp: new Date().toISOString()
    }

    if (notifications.length === 10) {
        notifications.pop()
    }

    notifications.unshift(payload)
    await redis.set('notifications', JSON.stringify(notifications))

    res.sendStatus(201)

    // send notification to subscribers
    const asyncNotifySubscribers = subscribers.map((subscriber) =>
        webpush.sendNotification(subscriber, JSON.stringify(payload), {
            timeout: 5000,
            TTL: 86400
        })
    )

    Promise.all(asyncNotifySubscribers).catch(async (error) => {
        if (error.statusCode === 410) {
            const index = subscribers.findIndex((s) => error.endpoint === s.endpoint)
            subscribers.splice(index, 1)
            await redis.set('subscribers', JSON.stringify(subscribers))
        }
    })
})

/**
 * @Get /api/notifications
 * @description get all notifications
 */
exports.getNotifications = expressAsyncHandler(async (req, res) => {
    const notifications = JSON.parse(await redis.get('notifications')) || []

    res.send(notifications)
})

/**
 * @Get /api/health
 * @description check server health
 */
exports.getHealth = expressAsyncHandler(async (req, res) => {
    res.send({
        status: 'ok',
        uptime: `${(process.uptime() / 60).toFixed(2)} minutes`,
        memory: `${(process.memoryUsage().rss / 1000000).toFixed(2)} MB`
    })
})
