const { body } = require('express-validator')
const { Expo } = require('expo-server-sdk')

exports.expoPushToken = [
    body('token')
        .trim()
        .notEmpty()
        .withMessage('token is required')
        .custom((value) => {
            if (Expo.isExpoPushToken(value) === false) {
                throw new Error('invalid token')
            }
            return true
        })
]
