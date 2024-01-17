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

/**
 * App configurations
 */
let app = express();
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({'extended': true}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../dist/bcrs')));
app.use('/', express.static(path.join(__dirname, '../dist/bcrs')));

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


/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`)
}); // end http create server function
