const status = require('http-status');
const InternalServerError = require('../utils/errors/InternalServerError');
const lowercaseFirstLetter = require('../utils/helpers/lowercaseFirstLetter');
const catchAsync = require('../utils/catchAsync');

exports.createQuestion = (Model) =>
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
