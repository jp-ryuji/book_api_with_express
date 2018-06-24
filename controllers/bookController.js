const bookController = function(Book) {
  const post = function(req, res) {
    const book = new Book(req.body);
    if (!req.body.title) {
      res.status(400);
      res.send('Title is required');
    } else {
      book.save();
      res.status(201);
      res.send(book);
    }
  };

  const get = function(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }

    Book.find(query, (err, books) => {
      if (err) {
        res.status(500).send(err);
      } else {
        // let returnBooks = [];
        // books.forEach(function(element, _index, _array) {
        //   let newBook = element.toJSON();
        //   newBook.links = {};
        //   newBook.links.self = `http://${req.headers.host}/api/books/${newBook._id}`;
        //   returnBooks.push(newBook);
        // });
        // res.json(returnBooks);

        const returnBooks = books.map((element, _index, _array) => {
          const newBook = element.toJSON();
          newBook.links = {};
          newBook.links.self = `http://${req.headers.host}/api/books/${newBook._id}`;
          return newBook;
        });
        res.json(returnBooks);
      }
    });
  };

  return {
    post,
    get
  };
};

module.exports = bookController;
