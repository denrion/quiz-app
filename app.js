const path = require('path');
const express = require('express');
const cors = require('cors');

const globalErrorHandler = require('./controllers/errorController');
const NotImplementedError = require('./utils/errors/AppError');

const authRoutes = require('./routes/authRoutes');

const app = express(express.json({ extended: false }));

// Serve static assets in produciton
app.use(express.static('client/build'));

// 1) GLOBAL MIDDLEWARES

// Body Parser, reading data from body into req.body
app.use(express.json({ limit: process.env.BODY_PARSER_SIZE_LIMIT }));

// CORS
app.use(cors());

// Logging
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// 2) ROUTES
app.use('/api/v1/auth', authRoutes);

app.all('*', (req, res, next) => {
  next(
    new NotImplementedError(`Cannot find ${req.originalUrl} on this server!`)
  );
});

// // 3) ERROR HANDLING
app.use(globalErrorHandler);

module.exports = app;
