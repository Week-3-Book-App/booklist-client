'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/books/new', app.bookView.initNewForm);
page('/books/:id', ctx => app.Book.fetchOne(ctx, app.bookView.initOneBook));
page('/books/:id/update', (ctx, next) => app.Book.fetchOne(ctx, next), ctx => app.Book.initUpdateForm);

page();