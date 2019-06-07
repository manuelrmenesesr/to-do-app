const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router()

router.route('/')
    .get(taskController.Render)
    .post(taskController.Create, taskController.Render)
router.all('/*', (req, res) => {
    res.status(404).send("404 Not Found")
})

module.exports = router