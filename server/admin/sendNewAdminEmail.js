const { send, saveLogNewUserEmail } = require('../lib/mailjet');
const templateId = require('../config').get('mailjet:templates:newAdmin');
const recoveryPassLinks = require('../config').get('recoveryPassLinks');
const { getUserName } = require('../lib/util');

module.exports = ({
  email,
  first_name,
  last_name,
  verify_pass_code,
  id,
}) => {
  const link = recoveryPassLinks.linkOperator.replace('{{verify_pass_code}}', verify_pass_code);
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
    .then(() => saveLogNewUserEmail(id, email))
    .catch(err => saveLogNewUserEmail(id, email, err));
};
