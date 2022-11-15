const createError = require('http-errors');
const { ValidationError } = require('yup');
const {
  Sequelize: { BaseError, ValidationError: ModelValidationError },
} = require('./../models');

module.exports.validationErrorhandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(422).send({
      errors: [
        {
          status: 422,
          title: err.errors[0],
        },
      ],
    });
  }
};
module.exports.dbErrorHanlder = (err, req, res, next) => {
  if (err instanceof ModelValidationError) {
    const errors = err.errors.map(e => ({ status: 422, title: e.message }));

    //{ status: 422, title: err.errors[0].message }
    return res.status(422).send({ errors });
  }
  if (err instanceof BaseError) {
    next(createError(500, 'Database Error'));
  }

  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return;
  }
  console.log('err', err);
  const errorStatus = err?.status ?? 500;
  res.status(errorStatus).send({
    errors: [
      {
        status: errorStatus,
        title: err?.message ?? 'Internal Server Error',
      },
    ],
  });
};
