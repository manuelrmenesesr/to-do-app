const express = require('express')
const path = require('path')
const taskRoutes = require('./routes/taskRoutes')

const app = express()
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))
app.use(taskRoutes)

app.listen(3000, () => {
  console.log('Server on port 3000')
})