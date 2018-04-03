const { send, saveLogNewUserEmail } = require('../lib/mailjet');
const { templates } = require('../config').get('mailjet');
const recoveryPassLinks = require('../config').get('recoveryPassLinks');
const { getUserName } = require('../lib/util');

module.exports = ({ user }) => {
  const name = getUserName(user.first_name, user.last_name);
  const link = recoveryPassLinks.linkOperator
    .replace('{{verify_pass_code}}', user.verify_pass_code);
  const templateId = templates.newOperator;

  send({
    email: user.email,
    name,
    templateId,
    variables: {
      link,
      name,
    },
  })
    .then(() => saveLogNewUserEmail(user.id, user.email))
    .catch(err => saveLogNewUserEmail(user.id, user.email, err));
};
