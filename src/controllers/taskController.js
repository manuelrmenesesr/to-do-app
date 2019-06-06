function Render(req, res) {
    res.status(200).render('index', {
        'err': null,
        'tasks': []
    })
}

module.exports = {
    Render
}