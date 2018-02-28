'use strict';

page('/', () => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initOneBook));
page('/books/new', app.bookView.initNewForm);

page();