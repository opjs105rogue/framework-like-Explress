const http = require('http');
const EventEmitter = require('events');
const path = require('path');
const parseBody = require('./bodyParseJson');

module.exports = class mainApp {
    constructor() {
        this.event = new EventEmitter();
        this.server = this._createServer();
        this.middlewares = [];
    }

    _createServer() {
        return http.createServer(async (req, res) => {
            await parseBody(req, res); 
            const isEventReal = this.event.emit(this._getArgsRout(req.url, req.method), req, res);
            if (!isEventReal) {
                res.end('Event not created');
            }
        });
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
                    this.middlewares.forEach((middleware) => {middleware(req,res)});
                    handler(req,res)
                })
            })
        })
    }



    _listen(PORT, callback) {
        this.server.listen(PORT, callback)
    }
}