require('dotenv').config();

// Connect to mongoDB
const dbConnection = require('./db');

dbConnection().then( () => require('./server') );

