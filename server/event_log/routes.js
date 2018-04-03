const {
  retrieve,
  retrieveDebugInfo,
} = require('./controllers');
const { setEventId, asyncMiddleware } = require('../lib/util');
const isLoggedIn = require('../lib/isLoggedIn');

module.exports = (app) => {
  app.get(
    '/api/v1/events',
    setEventId('admin_event_log_list'),
    isLoggedIn,
    asyncMiddleware(retrieve),
  );
  app.get(
    '/api/v1/events/:id/debug_info',
    setEventId('admin_event_log_debug_info'),
    isLoggedIn,
    asyncMiddleware(retrieveDebugInfo),
  );
};
