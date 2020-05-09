const path = require('path');
const express = require('express');
const cors = require('cors');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const xss = require('xss-clean');

const globalErrorHandler = require('./controllers/errorController');
const NotImplementedError = require('./utils/errors/AppError');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const quizRoutes = require('./routes/quizRoutes');

const app = express(express.json({ extended: false }));

// 1) GLOBAL MIDDLEWARES

// SET security HTTP headers
// app.use(helmet());

// Body Parser, reading data from body into req.body
app.use(express.json({ limit: process.env.BODY_PARSER_SIZE_LIMIT }));

// Rate limiting - for stopping BRUTE FORCE attacks from same IP
// const limiter = rateLimit({
//   max: process.env.RATE_LIMIT_MAX_NUM_CONNECTIONS,
//   windowMs: process.env.RATE_LIMIT_KEEP_IN_MEMORY_LENGTH_MS,
//   message: process.env.RATE_LIMIT_MESSAGE,
// });

app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization agains XSS
// app.use(xss());

// Prevent http parameter polution
// specify parameters that are allowed to be repeated
// app.use(
//   hpp({
//     whitelist: [],
//   })
// );

// Compress API data
app.use(compression());

// CORS
app.use(cors());

// Logging
if (process.env.NODE_ENV === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// 2) ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/questions', questionRoutes);
app.use('/api/v1/quizzes', quizRoutes);

// Serve static assets in produciton
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.all('*', (req, res, next) => {
  next(
    new NotImplementedError(`Cannot find ${req.originalUrl} on this server!`)
  );
});

// // 3) ERROR HANDLING
app.use(globalErrorHandler);

module.exports = app;
