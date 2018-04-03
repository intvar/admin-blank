const EventLog = require('../../event_log/model');

const saveLog = (user_id, description, event_id, err) => {
  let debug_info;
  let is_error;
  let description_temp;
  if (err) {
    description_temp = err.message;
    debug_info = {
      message: err.message,
      stack: err.stack,
    };
    is_error = 1;
  } else {
    description_temp = description;
    is_error = 0;
  }
  return EventLog.create({
    user_id,
    is_error,
    event_id,
    description: description_temp,
    debug_info,
  });
};

exports.saveLogForgotPasswordEmail = (user_id, email, err) =>
  saveLog(user_id, `Send email forgot password ${email}`, 'send_email_forgot_password', err);

exports.saveLogNewAdminEmail = (user_id, email, err) =>
  saveLog(user_id, `Send email new admin ${email}`, 'send_email_new_admin', err);

