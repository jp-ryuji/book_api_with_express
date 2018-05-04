'use strict';

const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  .post(function(req, res) {
    let book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  })
  .get(function(req, res) {
    let query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, function(err, books) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  });

bookRouter.route('/books/:bookId')
  .get(function(req, res) {
    Book.findById(req.params.bookId, function(err, books) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(books);
      }
    });
  });

app.use('/api', bookRouter);

app.get('/', function(req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function () {
  console.log(chalk.green(`Server is up and running on port ${port}`));
});
