'use strict';

var app = app || {};

(function (module) {
  const bookView = {};

  bookView.initIndexPage = function () {
    $('.container').hide();
    $('.task-view').show();
    app.Book.all.map(task => $('#task-list').append(book.toHtml()));
  }

  module.bookView = bookView;
})(app)

$(function () {
  app.Book.fetchAll(app.BookView.initIndexPage);
})