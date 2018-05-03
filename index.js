'use strict';

const express = require('express');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 3000;

// Set up mongoose connection
const mongoose = require('mongoose');
const db = 'mongodb://localhost/bookAPI';
mongoose.connect(db);
mongoose.Promise = global.Promise;
var conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Book = require('./models/bookModel');

const bookRouter = express.Router();
bookRouter.route('/books')
  .get(function(req, res) {
    const responseJson = { hello: 'This is my API' };
    res.json(responseJson);
  })

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function () {
  console.log(chalk.green(`Server is up and running on port ${port}`));
});
