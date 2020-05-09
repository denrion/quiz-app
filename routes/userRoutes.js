const express = require('express');
const isAuth = require('../middleware/isAuth');
const restrictTo = require('../middleware/restrictTo');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.use(isAuth, restrictTo('ADMIN', 'QUIZMASTER'));

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
