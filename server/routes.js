const userRoutes = require('./user/routes');
const actionsRoutes = require('./actions/routes');
const eventLogRoutes = require('./event_log/routes');
const eventCodesRoutes = require('./event_code/routes');
const adminRoutes = require('./admin/routes');

module.exports = (app) => {
  userRoutes(app);
  actionsRoutes(app);
  eventLogRoutes(app);
  eventCodesRoutes(app);
  adminRoutes(app);
};
