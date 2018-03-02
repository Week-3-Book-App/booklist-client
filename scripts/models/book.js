'use strict';

var app = {};
var __API_URL__ = 'http://localhost:3000';
// var __API_URL__ = 'https://am-jf-booklist.herokuapp.com';

(function (module) {
  function errorCallback(err) {
    console.error(err);
    module.errorView.initErrorPage(err);
  }

  function Book(bookObject) {
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-template').text());
    return template(this);
  }

  Book.all = [];

  Book.loadAll = rows => {
    Book.all = rows.sort((a, b) => a.book_id - b.book_id).map(book => new Book(book));
  }

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  Book.createBook = book =>
    $.post(`${__API_URL__}/api/v1/books`, book)
      .then(() => page('/'))
      .catch(errorCallback);

  Book.fetchOne = (ctx, callback) =>
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallback);

  Book.update = (book, book_id) =>
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${book_id}`,
      method: 'PUT',
      data: book
    })
      .then(() => page('/'))
      .catch(errorCallback);

  Book.destroy = ctx =>
    $.ajax({
      url: `${__API_URL__}/api/v1/books/${ctx}`,
      method: 'DELETE'
    })
      .then(() => page('/'))
      .catch(errorCallback);

  module.Book = Book;
})(app)
