const express = require('express');
const isAuth = require('../middleware/isAuth');
const restrictTo = require('../middleware/restrictTo');
const {
  createQuestion,
  getAllQuestions,
} = require('../controllers/questionController');
const { setFieldFromRequest } = require('../middleware/setFieldFromRequest');

const router = express.Router();

router.use(isAuth);

router
  .route('/')
  .get(restrictTo('ADMIN', 'QUIZMASTER'), getAllQuestions)
  .post(setFieldFromRequest('submittedBy'), createQuestion);

// router.route('/:id').get().patch().delete();

module.exports = router;
