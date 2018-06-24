const express = require('express');
const chalk = require('chalk');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up mongoose connection
const mongoose = require('mongoose');

let db;
if (process.env.ENV === 'Test') {
  db = mongoose.connect('mongodb://localhost/bookAPI_test');
} else {
  db = mongoose.connect('mongodb://localhost/bookAPI');
}
mongoose.connect(db);
mongoose.Promise = global.Promise;
const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Book = require('./models/bookModel');
const bookRouter = require('./routes/bookRoutes')(Book);

app.use('/api/books', bookRouter);

app.get('/', (req, res) => {
  res.send('welcome to my API!');
});

app.listen(port, () => {
  console.log(chalk.green(`Server is up and running on port ${port}`));
});

module.exports = app;
