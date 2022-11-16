const express = require('express');
const { STATIC_PATH } = require('./constants');
const { errorHandlers } = require('./middleware');
const router = require('./router');

const app = express();

app.use(express.static(STATIC_PATH));

app.use(
  express.json({
    type: 'application/vnd.api+json',
  })
);

app.use('/api', router);

app.use(
  errorHandlers.validationErrorhandler,
  errorHandlers.dbErrorHanlder,
  errorHandlers.errorHandler
);

module.exports = app;
