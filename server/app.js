const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { saveEventLog } = require('./lib/util');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const passport = require('./lib/passport')();
const config = require('./config');
const { users } = require('./test/dataForTests');

const app = express();
const sessionOptions = config.get('sessionOptions');

if (process.env.NODE_ENV === 'production') {
  const redisOptions = config.get('redisOptions');
  const redisStore = new RedisStore(redisOptions);
  sessionOptions.store = redisStore;
  app.set('trust proxy', 1);
}

app.use(bodyParser.json({
  limit: (1024 * 1024) * 31,
}));
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === 'test') {
  app.use((req, res, next) => {
    /* eslint prefer-destructuring: 0 */
    /* eslint no-underscore-dangle: 0 */
    req.user = req.body.__user || users[0];
    next();
  });
}

routes(app);

/* eslint no-unused-vars:0 */
app.use((err, req, res, next) => {
  saveEventLog(req, true, { description: err.message, debug_info: err.debugInfo });
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    if (err.httpStatus && err.code) {
      return res.status(err.httpStatus).send({ error: err.message, code: err.code });
    }

    /* eslint no-console:0 */
    console.log(err);

    return res.status(500).send({ error: 'Internal server error (500)' });
  }
  console.log(err.stack);
  console.log(err);
  return res.status(err.httpStatus || 500).send({ error: err.message, code: err.code });
});

module.exports = app;
