const express = require('express');
const router = express.Router();

// @route     GET api/v1/auth
// @desc      Get logged in user
// @access    Private
router.get('/', (req, res, next) => {
  res.send('Get logged in user');
});

// @route     POST api/v1/auth
// @desc      Auth user & get token
// @access    Public
router.post('/', (req, res, next) => {
  res.send('Log in user');
});

module.exports = router;
