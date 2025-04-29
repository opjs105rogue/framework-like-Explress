const http = require('http');
const dotenv = require('dotenv');
const EventEmitter = require('events');

dotenv.config();

const event = new EventEmitter();

// const server = http.createServer((req,res)=> {
//     res.writeHead(200, {
//         'content-type': 'text/html charset=utf-8'
//     })
//     if(req.url === "/user") {
//         return res.end(JSON.stringify([{id:20, name: 'Pavel'}]))
//     }
// });

// const PORT = process.env.PORT || 5000

// server.listen(PORT, ()=> {
//     console.log(`Server is starting on port: ${PORT}`);
// })

class Router {
    constructor() {
        this.endpoints = {

        }
    }

    request(method = "GET", path, handler) {
        if(!this.endpoints[path]) {
            this.endpoints[path] = {};
        }
        const endpoint = this.endpoints[path];

        if(endpoint[method]) {
            throw new Error(`${method} по адресу ${path} уже существует`)
        }

        endpoint[method] = handler;

        event.on(`[${path}]:[${method}]`, (req,res) => {
            handler(req,res)
        })
    }

    get(path, handler) {
        this.request("GET", path, handler)
    }
    post(path, handler) {
        this.request("POST", path, handler)
    }
    put(path, handler) {
        this.request("PUT", path, handler)
    }
    delete(path, handler) {
        this.request("DELETE", path, handler)
    }
}

const router = new Router();
