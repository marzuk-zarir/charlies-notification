const { body } = require('express-validator')

exports.notify = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Name must be between 3 and 20 characters'),
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required')
        .isLength({ min: 8, max: 500 })
        .withMessage('Title must be between 8 and 500 characters')
]
