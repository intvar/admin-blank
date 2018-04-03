const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Admin = require('../admin/model');
const { ADMIN_STATUS_ACTIVE } = require('../constants');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    Admin.findById(id)
      .then(user => done(null, user))
      .catch(done);
  });

  const options = {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
  };

  const cb = (req, email, password, done) =>
    Admin.find({ where: { email } })
      .then((user) => {
        if (
          !user || user.status !== ADMIN_STATUS_ACTIVE
          || !bcrypt.compareSync(password, user.password)
        ) {
          return done(null, false, {
            error: 'Incorrect password',
            code: 'incorrect_password',
          });
        }

        return done(null, user);
      })
      .catch(done);

  const strategy = new LocalStrategy(options, cb);

  passport.use(strategy);
  return passport;
};
