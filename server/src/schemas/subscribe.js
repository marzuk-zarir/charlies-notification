const { body } = require('express-validator')

module.exports = [
    body('endpoint')
        .isURL({
            protocols: ['https'],
            require_protocol: true,
            host_whitelist: [
                'android.googleapis.com',
                'fcm.googleapis.com',
                'updates.push.services.mozilla.com',
                'updates-autopush.stage.mozaws.net',
                'updates-autopush.dev.mozaws.net',
                /.*.notify.windows.com/,
                /.*.push.apple.com/
            ]
        })
        .withMessage('Invalid endpoint'),
    body('keys.p256dh').isString().withMessage('Invalid p256dh'),
    body('keys.auth').isString().withMessage('Invalid auth')
]
