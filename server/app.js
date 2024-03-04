/**
 * Require statements
 */
const express = require('express');
const http = require('http');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();
/**
 * Routes
 */
const UserAPI = require('./routes/user-api');
const LoginAPI = require('./routes/login-api');

/**
 * App configurations
 */
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/react-crud')));
app.use('/', express.static(path.join(__dirname, '../dist/react-crud')));

/**
 * Ports
 */
const port = process.env.PORT || 3000; // server port

//mongo db connection with username and password to access database
const conn = process.env.MONGODB_URI;

/**
 * Database connection
 */
mongoose.connect(conn).then(() => {
  console.debug(`Connection to the database instance was successful`);
}).catch(err => {
  console.log(`MongoDB Error: ${err.message}`)
}); // end mongoose connection

/**
 * APIs
 */
app.use('/api/user-model', UserAPI);
app.use('/api/login-model', LoginAPI);


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
