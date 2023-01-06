const { Expo } = require('expo-server-sdk')

exports.registerExpoPush = (req, res, next) => {
    req.expo = new Expo()
    next()
}
