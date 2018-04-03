const { createError } = require('../lib/util');

module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    throw createError('Need authenticate', 403, 'need_authenticate');
  }
  next();
};
