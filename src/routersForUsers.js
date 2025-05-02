const Router = require('../framework/router');

const router = new Router();

const users = [
    {id:1, name: 'Anton'},
    {id:2, name: 'Yuri'},
]

router.get('/users', (req,res)=> {
    res.writeHead(200, {
        'content-type':'application/json'
    })
    res.end(JSON.stringify(users))
})

router.post('/users', (req,res)=> {
    res.writeHead(200, {
        'content-type':'application/json'
    })
    res.end(JSON.stringify(users))
})

module.exports = router;