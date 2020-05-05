const factory = require('./handlerFactory');
const Quiz = require('../models/Quiz');

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
