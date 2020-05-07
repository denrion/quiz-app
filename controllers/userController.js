const factory = require('./handlerFactory');
const User = require('../models/User');

/**
 * @route   GET  /api/v1/users
 * @desc    Get All Users
 * @access  Private
 */
exports.getAllUsers = factory.getAll(User);

/**
 * @route   POST  /api/v1/users
 * @desc    Create New User
 * @access  Private
 */
exports.createUser = factory.createOne(User);

/**
 * @route   GET  /api/v1/users/:userId
 * @desc    Get User
 * @access  Private
 */
exports.getUser = factory.getOne(User);

/**
 * @route   PUT  /api/v1/user/:userId
 * @desc    Update User
 * @access  Private
 */
exports.updateUser = factory.updateOne(User);

/**
 * @route   DELETE  /api/v1/users/:userId
 * @desc    Delete User
 * @access  Private
 */
exports.deleteUser = factory.deleteOne(User);
