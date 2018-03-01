'use strict';

var app = app || {};

(function (module) {
  const bookView = {};

  bookView.initIndexPage = function () {
    $('.container').hide();
    $('#book-list').empty();
    $('.book-view').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('.detail').hide();
  }

  bookView.initNewForm = function () {
    $('.container').hide();
    $('.new-view').show();
    $('#new-form').on('submit', function (event) {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        image_url: event.target.image_url.value,
        isbn: event.target.isbn.value,
        description: event.target.description.value
      }
      module.Book.createBook(book);
    })
  }

  bookView.initOneBook = function () {
    $('.container').hide();
    $('#book-list').empty();
    $('.book-view').show();
    app.Book.all.map(book => $('#book-list').append(book.toHtml()));
    $('#delete').on('click', function(event) {
      event.preventDefault();
      console.log($(this).attr('data-id'));
      module.Book.destroy($(this).attr('data-id'));
    })
  }

  module.bookView = bookView;
})(app)