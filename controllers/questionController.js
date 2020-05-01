const factory = require('./handlerFactory');
const Question = require('../models/Question');

/**
 * @route   POST  /api/v1/questions
 * @desc    Create new question
 * @access  Private
 */
exports.createQuestion = factory.createQuestion(Question);
