'use strict';

const bookController = function(Book) {
  const post = function(req, res) {
    let book = new Book(req.body);
    book.save();
    res.status(201);
    res.send(book);
  }

  const get = function(req, res) {
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
  }

  return {
    post: post,
    get: get
  }
}

module.exports = bookController;
