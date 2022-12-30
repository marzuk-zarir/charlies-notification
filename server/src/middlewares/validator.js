const { validationResult } = require('express-validator')

module.exports = (schemaMiddleWare) => {
    const validatorMiddleWare = (req, res, next) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg)

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.mapped() })
        }

        next()
    }

    return [schemaMiddleWare, validatorMiddleWare]
}
