const factory = require('./handlerFactory');
const Question = require('../models/Question');

/**
 * @route   GET  /api/v1/questions
 * @desc    Get All Questions
 * @access  Private
 */
exports.getAllQuestions = factory.getAll(Question);

/**
 * @route   POST  /api/v1/questions
 * @desc    Create New Question
 * @access  Private
 */
exports.createQuestion = factory.createQuestion(Question);
