import express from 'express'
import cors from 'cors'

import router from './routes'
import TasksController from './controller'

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/', TasksController.alert)
app.use("/api/", router)

app.listen(port, () => {
  console.log("App is running on http://localhost:" + port)
})
