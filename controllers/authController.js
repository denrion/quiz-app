const status = require('http-status');

const BadRequestError = require('../utils/errors/BadRequestError');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/User');

/**
 * @desc      Get Current Logged In user
 * @route     GET /api/v1/auth/me
 * @access    Private
 */
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(status.OK).json({
    success: 'success',
    data: { user },
  });
});

/**
 * @desc      Signup user
 * @route     POST /api/v1/auth/signup
 * @access    Public
 */
exports.signup = catchAsync(async (req, res, next) => {
  const { role, ...user } = req.body;

  const newUser = await User.create(user);

  createAndSendToken(newUser, status.CREATED, res);
});

/**
 * @desc      Login user
 * @route     POST /api/v1/auth/login
 * @access    Public
 */
exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password)
    return next(new BadRequestError('Please provide email and password!'));

  const user = await User.findByUsername(username).select('+password');

  if (!user || !(await user.isCorrectPassword(password, user.password)))
    return next(new UnauthorizedError('Invalid credentials'));

  createAndSendToken(user, status.OK, res);
});

// Helper functions

const createAndSendToken = (user, statusCode, res) => {
  const token = user.signToken();

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000 // turn into milis
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.status(statusCode).cookie('jwt', token, cookieOptions).json({
    status: 'success',
    data: { token, user },
  });
};
