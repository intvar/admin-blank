const { publicKey, secretKey, from } = require('../../config').get('mailjet');

const mailjet = require('node-mailjet')
  .connect(publicKey, secretKey);

/**
 * @typedef {Object} MailjetSendOptions
 * @property {string} email - receiver email
 * @property {string} name - receiver name
 * @property {number} templateId - mailjet template id
 * @property {object} variables - template variables
 */

/**
 * @param {MailjetSendOptions} params
 */
exports.send = ({
  email,
  name,
  subject,
  templateId,
  variables,
}) => mailjet
  .post('send', { version: 'v3.1' })
  .request({
    Messages: [
      {
        From: from,
        To: [
          {
            Email: email,
            Name: name,
          },
        ],
        Subject: subject,
        Variables: variables,
        TemplateID: templateId,
        TemplateLanguage: true,
      },
    ],
  });


exports.saveLogForgotPasswordEmail = require('./saveEventLogEmail').saveLogForgotPasswordEmail;
exports.saveLogNewAdminEmail = require('./saveEventLogEmail').saveLogNewAdminEmail;
