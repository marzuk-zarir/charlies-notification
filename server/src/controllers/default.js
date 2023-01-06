const expressAsyncHandler = require('express-async-handler')
const webpush = require('web-push')
const redis = require('../../db')

/**
 * @Post /api/notify
 * @description send notification to subscribers
 */
exports.postNotify = expressAsyncHandler(async (req, res) => {
    const { expo } = req
    const webSubscribers = JSON.parse(await redis.get('web-subscribers')) || []
    const expoSubscribers = JSON.parse(await redis.get('expo-subscribers')) || []
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

    //* send notification to expo subscribers
    const expoChunks = expo.chunkPushNotifications(
        expoSubscribers.map((subscriber) => ({
            to: subscriber,
            sound: 'default',
            body: payload.title,
            data: { ...payload }
        }))
    )
    const expoTickets = []
    const expoReceiptIds = []

    // send expo chunks in parallel
    for (const expoChunk of expoChunks) {
        const expoChunkTickets = await expo.sendPushNotificationsAsync(expoChunk)
        console.log({ expoChunkTickets })
        expoTickets.push(...expoChunkTickets)
    }

    for (const expoTicket of expoTickets) {
        if (expoTicket.id) {
            expoReceiptIds.push(expoTicket.id)
        }
    }

    // get expo receipts in parallel
    const expoReceiptChunks = await expo.chunkPushNotificationReceiptIds(expoReceiptIds)

    console.log({ expoReceiptChunks })

    // remove invalid expo subscribers (device not registered)
    for (const expoReceiptChunk of expoReceiptChunks) {
        const expoReceipts = await expo.getPushNotificationReceiptsAsync(expoReceiptChunk)

        console.log({ expoReceipts })

        for (const expoReceipt of expoReceipts) {
            const { status, details } = expoReceipt

            if (status === 'ok') {
                continue
            }

            if (expoReceipt.status === 'error' && details.error === 'DeviceNotRegistered') {
                const index = expoSubscribers.findIndex((s) => expoReceipt.id === s)
                expoSubscribers.splice(index, 1)

                console.log({ expoSubscribers })

                await redis.set('expo-subscribers', JSON.stringify(expoSubscribers))
            }
        }
    }

    //* send notification to web subscribers
    const asyncNotifySubscribers = webSubscribers.map((subscriber) =>
        webpush.sendNotification(subscriber, JSON.stringify(payload), {
            timeout: 5000,
            TTL: 86400
        })
    )

    Promise.all(asyncNotifySubscribers).catch(async (error) => {
        if (error.statusCode === 410) {
            const index = webSubscribers.findIndex((s) => error.endpoint === s.endpoint)
            webSubscribers.splice(index, 1)
            await redis.set('web-subscribers', JSON.stringify(webSubscribers))
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
