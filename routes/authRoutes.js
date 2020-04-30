const express = require('express');

const isAuth = require('../middleware/isAuth');
const { signup, login, getMe } = require('../controllers/authController');

const router = express.Router();

router.get('/me', isAuth, getMe);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
