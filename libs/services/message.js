const fp = require('fastify-plugin');
const nodemailer = require('nodemailer');
const tpl = require('lodash/template');

module.exports = fp(async (fastify, options) => {
  const { models, services } = fastify.messageCenter;

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

    return info;
  };

  const addMessage = async ({ status, messageType, type, channel, email, phone, content, subject, messageId }) => {
    const message = await models.message.create({
      email,
      phone,
      content,
      subject,
      status: status || 0,
      messageId
    });
    const record = await services.addRecord({
      messageType,
      type,
      channel
    });
    await record.update({ belongToMessageId: message.id });
  };

  const sendMessage = async ({ messageType, type, to, channel, props }) => {
    const template = options.templates[messageType];
    if (type === 'EMAIL' && template && template[type]) {
      const currentTemplate = template[type];
      const content = tpl(currentTemplate.content)(props);
      const info = await sendEmail({ subject: currentTemplate.subject, [currentTemplate.type || 'html']: content, to });
      await services.addMessage({
        messageType,
        type,
        channel,
        subject: currentTemplate.subject,
        content,
        email: to,
        messageId: info.messageId
      });
      return info.response;
    }
  };

  Object.assign(fastify.messageCenter.services, { sendEmail, sendMessage, addMessage });
});
