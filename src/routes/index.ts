import express from 'express'

import TaskValidator from '../validator'
import Middleware from '../middleware';
import TaskController from '../controller'

const router = express.Router()
const taskValidator = new TaskValidator()

router.post('/tasks', taskValidator.create(), Middleware.handleValidationErrors, TaskController.create)
router.get('/tasks', taskValidator.list(), Middleware.handleValidationErrors, TaskController.list)
router.get('/tasks/:id', taskValidator.show(), Middleware.handleValidationErrors, TaskController.show)
router.put('/tasks/:id', taskValidator.update(), Middleware.handleValidationErrors, TaskController.update)
router.delete('/tasks/:id', taskValidator.delete(), Middleware.handleValidationErrors, TaskController.destroy)

export default router
