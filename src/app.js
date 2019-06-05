const express = require('express')
const taskRoutes = require('./routes/taskRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(taskRoutes)

app.listen(3000, () => {
  console.log('Server on port 3000')
})