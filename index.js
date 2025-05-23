const mongoose = require('mongoose');

const dotenv = require('dotenv');
const mainApp = require('./framework/mainApp');
const routersForUsers = require('./src/routersForUsers');
const jsonParse = require('./framework/middlewareParseJson');
const PARSE_URL = require('./framework/parseUrl');

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = new mainApp()

app.addMiddleWare(jsonParse);
app.addMiddleWare(PARSE_URL(`http://localhost:${PORT}`));
app.addRout(routersForUsers);

const start = async () => {
    await mongoose.connect('mongodb://localhost:27017');
    app._listen(PORT, () => {
        console.log('Server is starting');
    });
    try {

    } catch(err) {
        console.log(err);
    }
}

start();