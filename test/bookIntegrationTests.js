const should = require('should');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index.js');

const Book = mongoose.model('Book');
const agent = request.agent(app);

describe('Book Crud Tests:', () => {
  it('should allow a book to be posted and return a read and _id', done => {
    const bookPost = { title: 'new Book', author: 'Jon', genre: 'Fiction' };

    agent
      .post('/api/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        results.body.read.should.equal(false);
        results.body.should.have.property('_id');
        done();
      });
  });

  afterEach(done => {
    Book.remove().exec();
    done();
  });
});
