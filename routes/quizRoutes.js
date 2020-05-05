const express = require('express');
const isAuth = require('../middleware/isAuth');
const restrictTo = require('../middleware/restrictTo');
const { createQuiz, getAllQuizzes } = require('../controllers/quizController');
const setFieldFromRequest = require('../middleware/setFieldFromRequest');

const router = express.Router();

router.use(isAuth, restrictTo('ADMIN', 'QUIZ_MASTER'));

router
  .route('/')
  .get(getAllQuizzes)
  .post(setFieldFromRequest('quizmaster'), createQuiz);

// router.route('/:id').get().patch().delete();

module.exports = router;
