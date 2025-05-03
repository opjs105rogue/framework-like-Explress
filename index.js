const http = require('http');
const dotenv = require('dotenv');
const EventEmitter = require('events');
const Router = require('./framework/Router');
const mainApp = require('./framework/mainApp');
const routersForUsers = require('./src/routersForUsers');
const jsonParse = require('./framework/middlewareParseJson')

dotenv.config();

const event = new EventEmitter();
const PORT = process.env.PORT || 5000;

const app = new mainApp()

app.addMiddleWare(jsonParse);
app.addRout(routersForUsers);


app._listen(PORT, () => {
    console.log('Server is starting');
});