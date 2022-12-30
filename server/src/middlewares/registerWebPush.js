const webpush = require('web-push')

module.exports = (req, res, next) => {
    webpush.setVapidDetails(
        'mailto:marzukzarir@gmail.com',
        process.env.PUBLIC_VAPID_KEY,
        process.env.PRIVATE_VAPID_KEY
    )

    next()
}
