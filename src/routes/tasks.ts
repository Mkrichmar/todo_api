import express from 'express';
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
  
const router = express.Router()

// GET /tasks - Fetch all tasks
router.get('/', async (req, res, next) => {
  try {
    // Retrieve tasks from your database.
    const tasks = await prisma.task.findMany()
    return res.status(200).json(tasks)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Failed to fetch tasks.' })
  }
})

// POST /tasks - Create a new task
router.post('/', async (req, res, next) => {
  try {
    const { title, color } = req.body

    // Validate input and insert into database.
    if (!title || !color) {
        return res.status(400).json({ error: 'Title and color are required.'})
    }
    const newTask = await prisma.task.create({
        data: {
          title,
          color
        }
      })
    return res.status(201).json(newTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create task.' })
  }
})

// GET /tasks/:id - Update an existing task
router.get('/:id', async (req, res) => {
    try {
      const taskId = parseInt(req.params.id, 10)
      if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID.' })
      }
      const task = await prisma.task.findUnique({ where: { id: taskId } })
      if (!task) {
        return res.status(404).json({ error: 'Task not found.' })
      }
      res.status(200).json(task)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Failed to fetch task.' })
    }
  })
  

// PUT /tasks/:id - Update an existing task
router.put('/:id', async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10)
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID.' })
      }
    const { title, color, completed } = req.body

    // Validate at least one field to update
    if (title === undefined && color === undefined && completed === undefined) {
        return res.status(400).json({ error: 'No fields to update.' })
      }

    // Check if the task exists
    const existingTask = await prisma.task.findUnique({ where: { id: taskId } })
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found.' })
    }
    // Mocking updated task for demonstration:
    const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data: {
          ...(title !== undefined && { title }),
          ...(color !== undefined && { color }),
          ...(completed !== undefined && { completed })
        }
      })
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update task.' })
  }
})

// DELETE /tasks/:id - Delete a task
router.delete('/:id', async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.id, 10)
    if (isNaN(taskId)) {
        return res.status(400).json({ error: 'Invalid task ID.' })
      }

    // Check if the task exists
    const existingTask = await prisma.task.findUnique({ where: { id: taskId } })
    if (!existingTask) {
      return res.status(404).json({ error: 'Task not found.' })
    }

    // Delete task from the database using taskId.
    await prisma.task.delete({ where: { id: taskId } })

    res.status(204).send() // No content indicates a successful deletion.
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete task.' })
  }
})

export default router
