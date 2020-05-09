const colors = require('colors');
const status = require('http-status');
const BadRequestError = require('../utils/errors/BadRequestError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const sendErrorDev = (err, res) => {
  if (err.keyPattern && err.keyPattern.hasOwnProperty('username')) {
    err.message = `User with username ${err.keyValue['username']} already exists. Please use another value!`;
  }
  if (err.keyPattern && err.keyPattern.hasOwnProperty('displayName')) {
    err.message = `User with display name ${err.keyValue['displayName']} already exists. Please use another value!`;
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don`t leak the error detals
  } else {
    // 1) Log error: for DEVS
    // eslint-disable-next-line no-console
    console.error(colors.red('ERROR 💥 %s'), err);

    // 2) Send generic message: for CLIENT
    res.status(status.INTERNAL_SERVER_ERROR).json({
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || status.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, message: err.message };

    if (error.name === 'CastError') error = handleCastErrorDB(error);
    else if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    else if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    else if (error.name === 'JsonWebTokenError') error = handleJWTError();
    else if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};

// Handle specific error functions
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new BadRequestError(message);
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  let message = `Duplicate field value: ${value}. Please use another value!`;

  if (err.keyPattern.hasOwnProperty('username')) {
    message = `User with username ${err.keyValue['username']} already exists. Please use another value!`;
  } else if (err.keyPattern.hasOwnProperty('email')) {
    message = `User with email ${err.keyValue['email']} already exists. Please use another value!`;
  } else if (err.keyPattern && err.keyPattern.hasOwnProperty('displayName')) {
    err.message = `User with display name ${err.keyValue['displayName']} already exists. Please use another value!`;
  }

  return new BadRequestError(message);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((error) => error.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new BadRequestError(message);
};

const handleJWTError = () =>
  new UnauthorizedError('Invalid token. Please log in again.');

const handleJWTExpiredError = () =>
  new UnauthorizedError('JWT token expired. Please log in again.');

module.exports = globalErrorHandler;
