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

    return info.response;
  };

  const addMessage = async ({ status, messageType, type, channel, email, phone, content, subject }) => {
    const message = await models.message.create({
      email,
      phone,
      content,
      subject,
      status: status || 0
    });
    const record = await services.record.addRecord({
      messageType,
      type,
      channel
    });
    await record.update({ messageId: message.id });

    return Object.assign({}, message.get({ pain: true }), { id: message.id });
  };

  const sendMessage = async ({ messageType, type, to, channel, props }) => {
    const template = options.templates[messageType];
    if (type === 'EMAIL' && template && template[type]) {
      const currentTemplate = template[type];
      const content = tpl(currentTemplate.content)(props);
      const info = await sendEmail({ subject: currentTemplate.subject, [currentTemplate.type || 'html']: content, to });
      await services.message.addMessage({
        messageType,
        type,
        channel,
        subject: currentTemplate.subject,
        content,
        email: to
      });
      return info;
    }
  };

  const resendMessage = async ({ id }) => {
    const { messageType, channel, type } = await models.record.findOne({ where: { messageId: id } });
    const record = await services.record.addRecord({
      messageType,
      type,
      channel
    });
    await record.update({ messageId: id });
    return '已重新发送';
  };

  const getMessage = async filter => {
    const message = await models.message.findOne({
      include: [
        {
          model: models.record
        }
      ],
      where: filter
    });
    return message;
  };

  const getMessageList = async ({ filter, currentPage, perPage }) => {
    const { rows } = await models.message.findAndCountAll({
      where: filter,
      offset: perPage * (currentPage - 1),
      limit: perPage
    });
    return { pageData: rows, totalCount: rows.length };
  };

  services.message = {
    sendEmail,
    sendMessage,
    addMessage,
    resendMessage,
    getMessage,
    getMessageList
  };
});
