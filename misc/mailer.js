const nodemailer = require('nodemailer');
const config = require('../config/mailer');

const transport  = nodemailer.createTransport({
  service: 'Mailgun',
  auth: {
    user: config.MAILGUN_USER,
    pass: config.MAILGUN_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});
module.exports = {
  sendEmail(from, to, subject, html) {
    transport.sendMail({ from, to, subject, html });
  }
};
