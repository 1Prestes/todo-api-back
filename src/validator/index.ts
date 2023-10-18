const { body, query, param } = require('express-validator')

class TaskValidator {
  create() {
    return [
      body('title')
        .notEmpty()
        .withMessage("Title must be provided"),
      body('completed')
        .optional()
        .isBoolean()
        .withMessage("Value should be boolean")
    ]
  }
  list() {
    return [
      query('limit')
        .notEmpty()
        .withMessage("Limit must be provided")
        .isInt({ min: 1, max: 10 })
        .withMessage("Limit must be between 1 and 10"),
      query('offset')
        .optional()
        .isNumeric()
        .withMessage("Item limit must be a number")
    ]
  }
  delete() {
    return [
      param('id')
        .notEmpty()
        .withMessage("ID should not be empty")
        .isUUID(4)
        .withMessage("ID must be of type UUIDV4")
    ]
  }
  show() {
    return [
      param('id')
        .notEmpty()
        .withMessage("ID should not be empty")
        .isUUID(4)
        .withMessage("ID must be of type UUIDV4")
    ]
  }
  update() {
    return [
      param('id')
        .notEmpty()
        .withMessage("ID should not be empty")
        .isUUID(4)
        .withMessage("ID must be of type UUIDV4"),
      body('title')
        .notEmpty()
        .withMessage("Title must be provided"),
    ]
  }
}

export default TaskValidator
