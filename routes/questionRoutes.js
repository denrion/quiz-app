const express = require('express');
const isAuth = require('../middleware/isAuth');
const restrictTo = require('../middleware/restrictTo');
const {
  createQuestion,
  getAllQuestions,
} = require('../controllers/questionController');
const setUserIdFromRequest = require('../middleware/setUserIdFromRequest');

const router = express.Router();

router.use(isAuth);

router
  .route('/')
  .get(restrictTo('ADMIN'), getAllQuestions)
  .post(setUserIdFromRequest, createQuestion);

// router.route('/:id').get().patch().delete();

module.exports = router;
