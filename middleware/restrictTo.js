const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports = (...roles) => (req, res, next) => {
  return !roles.includes(req.user.role)
    ? next(
        new ForbiddenError('You do not have permission to perform this action')
      )
    : next();
};
