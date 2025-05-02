const http = require('http');
const dotenv = require('dotenv');
const EventEmitter = require('events');
const Router = require('./framework/router');


dotenv.config();

const event = new EventEmitter();
const PORT = process.env.PORT || 5000;

const router = new Router();

router.get('/user', (req,res)=> {
    res.end('YOU SEND REQUEST TO /USER')
})

router.get('/posts', (req,res)=> {
    res.end('YOU SEND REQUEST TO /POSTS')
})

const server = http.createServer((req,res) => {
    const isEventReal = event.emit(`[${req.url}]:[${req.method}]`,req,res)
    if(!isEventReal) {
        res.end();
    }
    // res.end(req.url);
})

server.listen(PORT, ()=> {
    console.log(`Server was start with port: ${PORT}`);
})