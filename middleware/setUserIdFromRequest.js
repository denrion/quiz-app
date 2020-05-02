// Use only after isAuth
// Otherwise there won't be a user in the request object
module.exports = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
