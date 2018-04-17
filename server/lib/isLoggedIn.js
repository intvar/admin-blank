const { createError } = require('../lib/util');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError('Need authenticate', 401, 'need_authenticate');
  }
  next();
};
