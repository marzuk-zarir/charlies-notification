const webpush = require('web-push')

module.exports = (req, res, next) => {
    webpush.setVapidDetails(
        'mailto:algertc@gmail.com',
        'BFT89EZ1NEbxublJk2e4WV0O0nOEkKZfBan2YcdbPorn5dpDUtZMsIvZxjb5p4g7ih_byIbjfkejorppNWRb5Gs',
        '66sAWfiht4wmW-Me40CfJ9pENIQAlNXmktluAp-Uya4'
    )

    next()
}
