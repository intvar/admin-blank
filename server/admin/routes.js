const isLoggedIn = require('../lib/isLoggedIn');
const {
  create,
  retrieve,
  retrieveById,
  update,
} = require('./controllers');
const { setEventId, asyncMiddleware } = require('../lib/util');

module.exports = (app) => {
  app.post(
    '/api/v1/admins',
    setEventId('admin_admin_create'),
    isLoggedIn,
    asyncMiddleware(create),
  );
  app.get(
    '/api/v1/admins',
    setEventId('admin_admin_list'),
    isLoggedIn,
    asyncMiddleware(retrieve),
  );
  app.get(
    '/api/v1/admins/:id',
    setEventId('admin_admin_read'),
    isLoggedIn,
    asyncMiddleware(retrieveById),
  );
  app.put(
    '/api/v1/admins/:id',
    setEventId('admin_admin_update'),
    isLoggedIn,
    asyncMiddleware(update),
  );
};
