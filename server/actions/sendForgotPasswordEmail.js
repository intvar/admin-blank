const { send, saveLogForgotPasswordEmail } = require('../lib/mailjet');
const templateId = require('../config').get('mailjet:templates:forgotPasswordAdmin');
const linkTemplate = require('../config').get('mailjet:links:adminAuth');
const { getUserName } = require('../lib/util');

module.exports = ({
  email,
  first_name,
  last_name,
  verify_pass_code,
  id,
}) => {
  const link = linkTemplate.replace('{{verify_pass_code}}', verify_pass_code);
  const name = getUserName(first_name, last_name);
  return send({
    email,
    name,
    templateId,
    variables: {
      link,
      name,
    },
  })
    .then(() => saveLogForgotPasswordEmail(id, email))
    .catch(err => saveLogForgotPasswordEmail(id, email, err));
};
