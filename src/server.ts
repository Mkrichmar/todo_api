import express, { Request, Response } from 'express'
import cors from 'cors'
import tasksRouter from './routes/tasks'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' })
})


// Mount the tasks router at /tasks
app.use('/tasks', tasksRouter)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
