import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid';

import TasksInstance from '../model'

class TaskController {
  async list(req: Request, res: Response) {
    try {
      const limit = Number(req.query?.limit);
      const offset = Number(req.query?.offset) || 0;
      const tasks = await TasksInstance.findAll({ limit, offset, order: [['createdAt', 'DESC']] });

      res.json(tasks)
    } catch (error) {
      console.log('deu ruim => ', error)
      res.json({ msg: "Error on reading tasks", status: 500 })
    }
  }

  async create(req: Request, res: Response) {
    const id = uuidv4()
    try {
      const record = await TasksInstance.create({
        ...req.body, id
      })

      res.json({ record, msg: "Record successfully added" })
    } catch (error) {
      res.json({ msg: "Error on creating task", status: 500 })
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params
      const task = await TasksInstance.findOne({ where: { id } });

      res.json(task)
    } catch (error) {
      res.json({ msg: "Error on get task ", status: 500 })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params
      const task = await TasksInstance.findOne({ where: { id } });

      if (!task) {
        return res.json({ msg: "No task found for the provided id", status: 404 })
      }

      const { title, description, completed } = req.body

      const updatedTask = await task.update({
        title,
        description,
        completed: completed,
      })

      res.json({ updatedTask, msg: 'Task updated successfully' })
    } catch (error) {
      res.json({ msg: "Error reading task", status: 500 })
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params
      const task = await TasksInstance.destroy({ where: { id } });

      if (!task) {
        return res.json({ deleted: false, msg: "No task found for the provided id", status: 404 })
      }

      res.json({ deleted: true, msg: 'Task deleted successfully' })
    } catch (error) {
      res.json({
        error: true, msg: "Error on deleting task", status: 500
      })
    }
  }

  async alert(_: Request, res: Response) {
    res.json({
      create: {
        type: 'POST',
        url: '/api/tasks'
      },
      list: {
        type: 'GET',
        url: '/api/tasks?limit=10&offset=0'
      },
      show: {
        type: 'GET',
        url: '/api/tasks/id'
      },
      update: {
        type: 'PUT',
        url: '/api/tasks/id'
      },
      delete: {
        type: 'DELETE',
        url: '/api/tasks/id'
      },
    })
  }
}

export default new TaskController()
