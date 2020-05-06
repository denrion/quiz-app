// Use only after isAuth
// Otherwise there won't be a user in the request object
exports.setFieldFromRequest = (field) => (req, res, next) => {
  if (!req.body[field]) req.body[field] = req.user.id;
  next();
};

exports.setSearchConditionsFromRequest = (field) => (req, res, next) => {
  req.conditions = { [field]: req.user.id };
  next();
};
