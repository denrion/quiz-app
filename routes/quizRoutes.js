const express = require('express');
const isAuth = require('../middleware/isAuth');
const restrictTo = require('../middleware/restrictTo');
const {
  createQuiz,
  getAllQuizzes,
  getQuiz,
  addQuestionsToQuiz,
  addParticipantsToQuiz,
} = require('../controllers/quizController');
const { setFieldFromRequest } = require('../middleware/setFieldFromRequest');

const router = express.Router();

router.use(isAuth);

router.route('/').get(getAllQuizzes);

router.use(isAuth, restrictTo('ADMIN', 'QUIZMASTER'));

router.route('/').post(setFieldFromRequest('quizmaster'), createQuiz);
router.route('/:id').get(getQuiz);
router.route('/:id').patch().delete();

router.route('/:quizId/questions').post(addQuestionsToQuiz);
router.route('/:quizId/users').post(addParticipantsToQuiz);

module.exports = router;
