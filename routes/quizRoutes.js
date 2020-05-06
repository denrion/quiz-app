const express = require('express');
const isAuth = require('../middleware/isAuth');
const restrictTo = require('../middleware/restrictTo');
const {
  createQuiz,
  getAllQuizzes,
  addTransactionToFinancialReport,
} = require('../controllers/quizController');
const { setFieldFromRequest } = require('../middleware/setFieldFromRequest');

const router = express.Router();

router.use(isAuth, restrictTo('ADMIN', 'QUIZ_MASTER'));

router
  .route('/')
  .get(getAllQuizzes)
  .post(setFieldFromRequest('quizmaster'), createQuiz);

// router.route('/:id').get().patch().delete();

router.route('/:quizId/questions').post(addTransactionToFinancialReport);

module.exports = router;
