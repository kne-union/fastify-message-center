const fp = require('fastify-plugin');
const nodemailer = require('nodemailer');
const tpl = require('lodash/template');

module.exports = fp(async (fastify, options) => {
  /**
   * options
   * {
   *     host: "smtp.163.com",
   *     port: 465,
   *     auth: {
   *       username: "System"
   *       user: "uhey888@163.com",
   *       pass: "CUUYASPVSSHWMWCT",
   *     },
   *   }
   * */
  const transporter = nodemailer.createTransport(Object.assign({}, options));
  const sendEmail = async ({ to, subject, text, html }) => {
    const info = await transporter.sendMail({
      from: `"${options.auth.username || 'System'}"<${options.auth.user}>`, // sender address
      to,
      subject,
      text,
      html // html body
    });

    console.log('Message sent: %s', info);
    return info.response;
  };

  const sendMessage = async ({ messageType, type, to, props }) => {
    const template = options.templates[messageType];
    if (type === 'EMAIL' && template && template[type]) {
      const currentTemplate = template[type];
      const content = tpl(currentTemplate.content)(props);
      return await sendEmail({ subject: currentTemplate.subject, [currentTemplate.type]: content, to });
    }
  };

  Object.assign(fastify.messageCenter.services, { sendEmail, sendMessage });
});
