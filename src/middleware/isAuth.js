const jwt = require('jsonwebtoken');
const User = require('../models/User');
const catchAsync = require('../utils/catchAsync');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

const isAuth = catchAsync(async (req, res, next) => {
  const token = getJWTTokenFromHeader(req);

  if (!token)
    return next(
      new UnauthorizedError('Not authenticated. Please log in to get access')
    );

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const freshUser = await User.findById(decoded.id);

  if (!freshUser)
    return next(
      new UnauthorizedError(
        'The user, to whom this token belongs, no longer exists.'
      )
    );

  // Check if user changed password after the token was issued
  if (freshUser.isPasswordChangedAfter(decoded.iat))
    return next(
      new UnauthorizedError(
        'The password was recently changed! Please log in again.'
      )
    );

  // place fresh user on the request object
  req.user = freshUser;

  // GRANT ACCESS TO THE PROTECTED ROUTE
  next();
});

// Helper functions

const getJWTTokenFromHeader = (req) => {
  return req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ? req.headers.authorization.split(' ')[1]
    : undefined;
};

module.exports = isAuth;
