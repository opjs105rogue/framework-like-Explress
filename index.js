const http = require('http');
const dotenv = require('dotenv');
const EventEmitter = require('events');
const Router = require('./framework/router');
const mainApp = require('./framework/mainApp');
const routersForUsers = require('./src/routersForUsers');


dotenv.config();

const event = new EventEmitter();
const PORT = process.env.PORT || 5000;

const app = new mainApp()

app.addRout(routersForUsers);


app._listen(PORT, () => {
    console.log('Server is starting');
});