const factory = require('./handlerFactory');
const Quiz = require('../models/Quiz');
const catchAsync = require('../utils/catchAsync');
const status = require('http-status');

/**
 * @route   POST  /api/v1/quizzes/:quizId/questions
 * @desc    Add question to quiz
 * @access  Private
 */
exports.addQuestionsToQuiz = catchAsync(async (req, res, next) => {
  const quiz = await Quiz.findById(
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
 * @route   POST  /api/v1/quizzes/:quizId/participants
 * @desc    Add participant to quiz
 * @access  Private
 */
exports.addParticipantsToQuiz = catchAsync(async (req, res, next) => {
  let quiz = await Quiz.findById(req.params.quizId);
  quiz.participants.push(req.body);

  quiz = await quiz.save();
  quiz = await quiz.populate('participants questions').execPopulate();

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
 * @route   GET  /api/v1/quizzes/:quizId
 * @desc    Get Quiz
 * @access  Private
 */
exports.getQuiz = factory.getOne(Quiz, {
  path: 'questions participants',
});

/**
 * @route   POST  /api/v1/quizzes
 * @desc    Create New Quiz
 * @access  Private
 */
exports.createQuiz = factory.createOne(Quiz);
