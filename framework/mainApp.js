const http = require('http');
const EventEmitter = require('events');                                  

module.exports = class mainApp {
    constructor() {
        this.event = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    _createServer() {
        return http.createServer((req,res) => {
            let body = '';
            req.on('data', (chunk) => {
                body+=chunk;
            })
            req.on('end', ()=> {
                if(body) {
                    req.body = JSON.parse(body);
                }
                this.middlewares.forEach((middleware) => {middleware(req,res)});
                const isEventReal = this.event.emit(this._getArgsRout(req.pathname, req.method),req,res)
                if(!isEventReal) {
                    res.end();
            }
            })
        })
    }

    addMiddleWare(middleware) {
        this.middlewares.push(middleware);
    }

    _getArgsRout(path, method) {
        return `[${path}]:[${method}]`;
    }

    addRout(router) {
        Object.keys(router.endpoints).forEach((path) => {
            const endpoint = router.endpoints[path];
            Object.keys(endpoint).forEach((method) => {
                this.event.on(this._getArgsRout(path, method), (req,res) => {
                    const handler = endpoint[method];
                    handler(req,res)
                })
            })
        })
    }



    _listen(PORT, callback) {
        this.server.listen(PORT, callback)
    }
}