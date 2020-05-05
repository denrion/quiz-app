// Use only after isAuth
// Otherwise there won't be a user in the request object
module.exports = (field) => (req, res, next) => {
  if (!req.body[field]) req.body[field] = req.user.id;
  next();
};
