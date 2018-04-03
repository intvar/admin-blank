const {
  login,
  logout,
  forgotPassword,
  recoveryPassword,
  changePassword,
} = require('./controllers');
const { setEventId, asyncMiddleware } = require('../lib/util');
const isLoggedIn = require('../lib/isLoggedIn');

module.exports = (app) => {
  app.put(
    '/api/v1/actions/login',
    setEventId('login'),
    login,
  );
  app.put(
    '/api/v1/actions/logout',
    setEventId('logout'),
    isLoggedIn,
    logout,
  );
  app.put(
    '/api/v1/actions/forgot_password',
    setEventId('forgot_password'),
    asyncMiddleware(forgotPassword),
  );
  app.put(
    '/api/v1/actions/recovery_password',
    setEventId('recovery_password'),
    asyncMiddleware(recoveryPassword),
  );
  app.put(
    '/api/v1/actions/change_password',
    setEventId('change_password'),
    isLoggedIn,
    asyncMiddleware(changePassword),
  );
};
