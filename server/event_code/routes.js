const {
  retrieve,
} = require('./controllers');
const { setEventId, asyncMiddleware } = require('../lib/util');
const isLoggedIn = require('../lib/isLoggedIn');

module.exports = (app) => {
  app.get(
    '/api/v1/event_codes',
    setEventId('admin_event_codes_list'),
    isLoggedIn,
    asyncMiddleware(retrieve),
  );
};
