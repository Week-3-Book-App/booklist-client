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
    $('#new-form')[0].reset();
    $('.new-view').show();
    $('#new-form').off('submit').on('submit', function (event) {
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

  bookView.initOneBook = function (ctx) {
    $('.container').hide();
    $('.one-book').empty();
    $('.one-book').show();
    let template = Handlebars.compile($('#one-book-template').text());
    $('.one-book').append(template(ctx.book));
    
    $('#update').on('click', function(event) {
      event.preventDefault();
      let ctx = $(this).attr('data-id');
      page(`/books/${ctx}/update`);
    })
    
    $('#delete').on('click', function(event) {
      event.preventDefault();
      console.log($(this).attr('data-id'));
      module.Book.destroy($(this).attr('data-id'));
    })
  }

  bookView.initUpdateForm = function (ctx) {
    $('.container').hide();
    $('#update-form')[0].reset();
    $('.update-view').show();
    console.log(ctx.book);
    $('#update-form input[name="title"]').val(ctx.book.title);
    $('#update-form input[name="author"]').val(ctx.book.author);
    $('#update-form input[name="image_url"]').val(ctx.book.image_url);
    $('#update-form input[name="isbn"]').val(ctx.book.isbn);
    $('#update-form textarea[name="description"]').val(ctx.book.description);

    $('#update-form').off('submit').on('submit', function (event) {
      event.preventDefault();

      let book = {
        title: event.target.title.value,
        author: event.target.author.value,
        image_url: event.target.image_url.value,
        isbn: event.target.isbn.value,
        description: event.target.description.value,
        book_id: ctx.book.book_id
      }
      console.log(book);
      module.Book.update(book, book.book_id);
    })
  }

  module.bookView = bookView;
})(app)