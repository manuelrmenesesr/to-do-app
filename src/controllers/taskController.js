const mysql = require('mysql')
const uuidv4 = require('uuid/v4')
const conn = require('../db/conn')

async function Create(req, res, next) {
    try {
        let sql = 'INSERT INTO tasks VALUES(?, ?, ?, ?, ?)'
        let query = mysql.format(sql, [uuidv4(), req.body.title, req.body.description, req.body.priority, false])
        await conn.query(query)
    } catch (err) {
        if (err.code === 'ECONNREFUSED')
            req.err = "Connection refused by DB server"
        else if (err.code === 'ER_DUP_ENTRY')
            req.err = "Duplicated tasks' title are not allowed"
        else {
            console.log(err.code)
            console.log(err)
            req.err = 'Internal server error'
        }
    } finally {
        next()
    }
}

async function Render(req, res) {
    let tasks = []
    try {
        let sql = "SELECT * FROM tasks ORDER BY priority DESC, title"
        tasks = await conn.query(sql)
    } catch (err) {
        if (err.code === 'ECONNREFUSED')
            req.err = 'Connection refused by DB server'
        else {
            console.log(err.code)
            console.log(err)
            req.err = 'Internal server error'
        }
    } finally {
        res.status(200).render('index', {
            'err': req.err,
            'tasks': tasks
        })
    }
}

module.exports = {
    Create,
    Render
}