const factory = require('./handlerFactory');
const Quiz = require('../models/Quiz');
const catchAsync = require('../utils/catchAsync');
const status = require('http-status');

/**
 * @route   POST  /api/v1/quizzes/:quizId/questions
 * @desc    Add question to quiz
 * @access  Private
 */
exports.addTransactionToFinancialReport = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findByIdAndUpdate(
    req.params.quizId,
    {
      $push: { questions: req.body },
    },
    { new: true, runValidators: true }
  );

  res.status(status.CREATED).json({
    status: 'success',
    data: { quiz },
  });
});

/**
 * @route   GET  /api/v1/quizzes
 * @desc    Get All Quizzes
 * @access  Private
 */
exports.getAllQuizzes = factory.getAll(Quiz);

/**
 * @route   POST  /api/v1/quizzes
 * @desc    Create New Quiz
 * @access  Private
 */
exports.createQuiz = factory.createOne(Quiz);
