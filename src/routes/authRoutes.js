const express = require('express');
const status = require('http-status');

const catchAsync = require('../utils/catchAsync');

const router = express.Router();

const User = require('../models/User');

// @route     GET api/v1/auth
// @desc      Get logged in user
// @access    Private
router.post(
  '/signup',
  catchAsync(async (req, res, next) => {
    const { role, ...user } = req.body;

    const newUser = await User.create(user);

    createAndSendToken(newUser, status.CREATED, res);
  })
);

// @route     POST api/v1/auth
// @desc      Auth user & get token
// @access    Public
router.post('/login', (req, res, next) => {
  res.send('Log in user');
});

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

module.exports = router;
