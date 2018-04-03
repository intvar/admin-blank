const user = require('./controllers');
const { setEventId, asyncMiddleware } = require('../lib/util');
const isLoggedIn = require('../lib/isLoggedIn');

module.exports = (app) => {
  app.get(
    '/api/v1/users',
    setEventId('admin_users_list'),
    isLoggedIn,
    asyncMiddleware(user.retrieve),
  );
  app.get(
    '/api/v1/users/:user_id',
    setEventId('admin_users_read'),
    isLoggedIn,
    asyncMiddleware(user.retrieveById),
  );
  app.put(
    '/api/v1/users/:user_id',
    setEventId('admin_users_update'),
    isLoggedIn,
    asyncMiddleware(user.update),
  );
  app.delete(
    '/api/v1/users/:user_id',
    setEventId('admin_users_delete'),
    isLoggedIn,
    asyncMiddleware(user.delete),
  );
};
