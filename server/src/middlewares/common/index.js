const { validationResult } = require('express-validator')

exports.validator = (schemaMiddleWare) => {
    const validatorMiddleWare = (req, res, next) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg)

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() })
        }

        next()
    }

    return [schemaMiddleWare, validatorMiddleWare]
}

exports.notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
}

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
