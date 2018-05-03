'use strict';

const express = require('express');
const chalk = require('chalk');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function () {
  console.log(chalk.green(`Server is up and running on port ${port}`));
});
