const status = require('http-status');
const InternalServerError = require('../utils/errors/InternalServerError');
const lowercaseFirstLetter = require('../utils/helpers/lowercaseFirstLetter');
const setCorrectPluralEnding = require('../utils/helpers/setCorrectPluralEnding');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/APIFeatures');
const Quiz = require('../models/Quiz');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Model.find(req.conditions), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const documents = await features.query;

    const totalResults = await Model.countDocuments();

    res.status(status.OK).json({
      status: 'success',
      returnedResults: documents.length,
      totalResults,
      pagination: features.createPaginationLinks(totalResults),
      data: {
        [setCorrectPluralEnding(
          lowercaseFirstLetter(Model.modelName)
        )]: documents,
      },
    });
  });

exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    const conditions = req.conditions || { _id: req.params.id };

    const query = Model.findOne(conditions);

    if (populateOptions) query.populate(populateOptions);

    const document = await query;

    if (!document) return next(new NotFoundError('No document found'));

    res.status(status.OK).json({
      status: 'success',
      data: { [lowercaseFirstLetter(Model.modelName)]: document },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    if (!document)
      return next(
        new InternalServerError(
          'Error occured while creating a document. Please, try again.'
        )
      );

    res.status(status.CREATED).json({
      status: 'success',
      data: { [lowercaseFirstLetter(Model.modelName)]: document },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document)
      return next(new NotFoundError('No document found with that ID'));

    res.status(status.OK).json({
      status: 'success',
      data: { [lowercaseFirstLetter(Model.modelName)]: document },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document)
      return next(new NotFoundError('No document found with that ID'));

    res.status(status.NO_CONTENT).json({ status: 'success', data: null });
  });
