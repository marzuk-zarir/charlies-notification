// 404 for API routes
exports.notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
}

// 500 for API routes
exports.defaultErrorHandler = (error, req, res, next) => {
    res.status(error.status || 500)

    if (error.status === 404) {
        return res.send({ message: "Requested resource doesn't exist" })
    }

    res.send({
        message:
            process.env.NODE_ENV === 'production'
                ? 'Something went wrong. Please try again'
                : error.stack
    })
}
