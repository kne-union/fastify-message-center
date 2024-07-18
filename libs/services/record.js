const fp = require('fastify-plugin');

module.exports = fp(async fastify => {
  const { models, services } = fastify.messageCenter;

  const addRecord = async ({ messageType, type, channel, belongToMessageId }) => {
    return await models.record.create({
      messageType,
      type,
      channel,
      belongToMessageId
    });
  };

  Object.assign(fastify.messageCenter.services, { addRecord });
});
